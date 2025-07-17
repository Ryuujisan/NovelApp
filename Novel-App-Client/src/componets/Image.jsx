import { Image as IKImage} from '@imagekit/react';
export function Image({src, alt, width, height, className}) {
    const IK_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_ENDPOIT;
    console.log("endpoiy " + IK_URL_ENDPOINT);
    return (
        <>
            <IKImage urlEndpoint={IK_URL_ENDPOINT}
                     src={src}
                     width={width}
                     height={height}
                     alt={alt}
                     className={className}
            />
        </>
    )
}