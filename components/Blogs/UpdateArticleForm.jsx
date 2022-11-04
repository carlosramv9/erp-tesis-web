import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { convertFromHTML, createFromHTML, convertToEditor } from 'draft-js'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html'

const Editor = dynamic(
    () => import('react-draft-wysiwyg').then(mod => mod.Editor),
    { ssr: false }
)

const UpdateArticleForm = ({ content, setContent, setTitle, title, setDescription, description, setImage, setImagePreview }) => {


    const [editorState, setEditorState] = useState(() =>
        EditorState.createWithContent(stateFromHTML(content))
    )


    const [mockImage, setMockImage] = useState('')
    useEffect(() => {
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        // eslint-disable-next-line 
    }, [content, editorState]);


    useEffect(() => {
        let fileReader, isCancel = false;
        if (mockImage) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                    setImagePreview(result)
                }
            }
            fileReader.readAsDataURL(mockImage);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
        // eslint-disable-next-line 
    }, [mockImage]);

    return (
        <div className='d-flex card shadow'>
            <div className='d-flex justify-content-start flex-column'>
                <label className='form-label'>Titulo</label>
                <input type="text" className="form-control" name='title' defaultValue={title} onChange={event => setTitle(event.target.value)} />
            </div>
            <div className='d-flex justify-content-start flex-column my-3'>
                <label className='form-label'>Descripcion</label>
                <textarea defaultValue={description} className="form-control" rows="3" onChange={event => setDescription(event.target.value)} />
            </div>
            <div className='d-flex flex-column mb-3'>
                <label className='form-label'>Imagen de Portada</label>
                <input name='file' type='file' className='form-control' onChange={event => { setMockImage(event.target.files[0]); setImage(event.target.files[0]) }} />
            </div>
            <div className='d-flex justify-content-start flex-column'>
                <label className='form-label'>Contenido del Articulo</label>
            </div>
            <div className='d-flex justify-content-center align-items-center'>
                <Editor
                    wrapperClassName="rich-text-wrapper"
                    editorClassName="rich-text-editor"
                    toolbarClassName="rich-text-tool-bar"
                    style={{ borderRadius: '20px', }}
                    editorState={editorState}
                    onEditorStateChange={(value) => setEditorState(value)}
                />
            </div>
        </div >
    )
}

export default UpdateArticleForm