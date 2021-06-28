
import React, { useEffect } from 'react'
import Loading from 'assets/images/loading.gif'
export default function RenderMedia(props?: any) {
    const imgRef = React.useRef(null)
    const { data, isLazy = false, srcSet, isHideButton, videoRef } = props
    switch (data?.type) {
        case "video": {
            return (
                <video
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    playsInline
                    controls
                    muted
                    ref={videoRef}
                    className={isLazy ? "lazy" : ""}
                    src={`${data?.contentUrl}`}
                    data-srcset={srcSet}
                    data-src={`${data?.contentUrl}#t=0.1`}
                    loop
                />
            )
        }
        default: return (
            <img
                src={isLazy ? Loading : data?.contentUrl}
                className={isLazy ? "avatar lazy" : "avatar"}
                alt=""
                srcSet={isLazy ? "" : srcSet}
                data-srcset={srcSet}
                data-src={data?.contentUrl}
            />
        )
    }
}