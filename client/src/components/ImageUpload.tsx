import {useState} from "react";
import {TbPhotoPlus} from "react-icons/tb";

declare global {
    var cloudinary: any
}

type Props = {
    onChange: (e: string) => void
}

const ImageUpload = ({onChange}: Props) => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState("")

    const uploadWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "dby8qzoac",
            uploadPreset: "react_unsigned",
            maxFiles: 1,
            resourceType: "image",
            clientAllowedFormats: ["img", "png", "jpg", "bmp"],
            maxFileSize: 5500000,
            folder: "SocialMedia",
        },
        (error: any, result: any) => {
            if (!error && result && result.event === "success") {
                setUploadedImageUrl(result.info.secure_url)
                onChange(result.info.secure_url)
            }
        }
    );

    return (
        <div
            onClick={() => uploadWidget.open()}
            className="
                relative
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed border-2 border-primary-main
                p-5
                flex flex-col
                justify-center items-center
                gap-4
                text-neutral-main
            "
        >
            {
                uploadedImageUrl
                ?
                <div className="flex justify-center items-center w-[100px] h-[100px] rounded-full">
                    <img
                        src={uploadedImageUrl}
                        className="object-cover w-full h-full rounded-full"
                        alt="uploadedImage"
                    />
                </div>
                :
                <>
                    <TbPhotoPlus size={40}/>
                    <div className="text-base font-light">
                        Click to upload your image
                    </div>

                </>
            }
        </div>
    )
};

export default ImageUpload;