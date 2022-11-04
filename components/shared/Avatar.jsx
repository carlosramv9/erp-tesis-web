import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import NoAvatar from '../../public/img/no-avatar.png'

const Avatar = ({ getImage, param, status, width, height, alt }) => {

    const [image, setImage] = useState(null)
    useEffect(() => {
        if (status) {
            getImage(param)
                .then(response => {
                    const objectUrl = URL.createObjectURL(response);
                    setImage(objectUrl);
                })
                .catch(response => setImage(null))
        }
        // eslint-disable-next-line 
    }, [param])

    return (
        <div className='avatar' style={{ width: `${width}`, height: `${height}` }}>
            <Image alt={alt} src={image ? image : NoAvatar} layout="intrinsic" width={width} height={height} />
        </div>
    )
}

export default Avatar