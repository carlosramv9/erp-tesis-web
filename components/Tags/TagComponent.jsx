const TagComponent = ({tags, settags}) => {

    const deleteHandler = (e) => {
        const _tags = []
        const item = e.target.getAttribute('data-item')
        tags?.map((x, idx) => {
          if(parseInt(item) !== idx) _tags.push(x)     
        })
        settags(_tags)
      }

    return (
        <div>
            <div className='tag mt-3'>
                {tags?.map((e, i) => (
                    <div className='tag_text mx-1' key={i}>
                        <span className='tagSpan'>{e.name}<i className="bi bi-x cross-tag ms-1" data-item={i} onClick={deleteHandler}></i></span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TagComponent