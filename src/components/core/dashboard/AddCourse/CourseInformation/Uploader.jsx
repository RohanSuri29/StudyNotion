import { useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import ReactPlayer from "react-player";

function Uploader({name , label , register , setValue , errors , editData=null , viewData= null , video=false}) {

    const [previewSource , setPreviewSource] = useState(viewData ? viewData : editData ? editData : "");
    const [selectedFile , setSelectedFile] = useState(null);

    const {getRootProps , getInputProps , isDragActive} = useDropzone({accept: !video ? {"image/*": [".jpeg" , ".jpg" , ".png"]} : {"video/*" : [".mp4"]} , onDrop})
    
    const inputRef = useRef(null);

    function handleClick() {
        inputRef.current.click()
    }

    function onDrop(acceptedFiles) {

        const file = acceptedFiles[0]

        if(file) {
            setSelectedFile(file);
            previewFile(file)
        }
    }

    function previewFile(file) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {setPreviewSource(reader.result)}
    }

    useEffect(() => {
        register(name , {required:true})
    },[register])

    useEffect(() => {
        setValue(name , selectedFile)
    },[selectedFile , setValue])

    return (

        <div className="flex flex-col space-y-2">
            
            <label htmlFor={name}>
                <p className="text-sm text-richblack-5" >{label}{!viewData && <sup className="text-pink-200">*</sup>}</p>
            </label>

            <div className={`flex min-h-[130px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500 ${isDragActive ? "bg-richblack-600" : "bg-richblack-700"}`}>
                {
                    previewSource ? (
                        
                        <div className="flex w-full flex-col p-6">
                            {
                                !video ? 
                                (<img src={previewSource} alt="preview" className="h-full w-full rounded-md object-cover" />):
                                (<div className="relative overflow-hidden"><ReactPlayer url={previewSource} controls /></div>)
                            }
                            {!viewData && <button onClick={() => {setPreviewSource(""); setSelectedFile(null); setValue(name , null)}} className="mt-3 text-richblack-400 underline">Cancel</button>}
                        </div>

                    ) : (

                        <div {...getRootProps()} className="flex w-full flex-col items-center p-6">

                            <input {...getInputProps()} id={name} name={name} ref={inputRef} />

                            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
                                <FiUploadCloud className="text-2xl text-yellow-50" type="button" onClick={handleClick}/>
                            </div>

                            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
                                Drag and drop {!video ? "an image" : "a video"} or click to <span className="font-semibold text-yellow-50">Browse</span> a file
                            </p>

                            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-richblack-200">

                                <li>Aspect ratio 16:9</li>
                                <li>Recommended size 1024x576</li>
                            </ul>
                        </div>
                    )
                }
            </div>
            {
                errors[name] && (
                    <span className="ml-2 text-xs tracking-wide text-pink-200">Please upload thumbnail for your course</span>
                )
            }
        </div>
    )
}

export default Uploader