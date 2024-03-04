import React,{useState,useEffect} from "react";
import AlertMessageBox from "./AlertMessageBox";
import DropDownSegmenter from "./DropDownSegmenter";
import { Button } from "react-bootstrap";
import axiosInstance from "../config/AxiosConfig";
import '../stylings/GridView.css'
import { IoMdClose } from "react-icons/io";

interface gridViewProps{
    closeFunction: (t:boolean) => void;
}

function GridView(props:gridViewProps){

    const [segmenter1,setSegmenter1] = useState('');
    const [segmenter2,setSegmenter2] = useState('');
    const [segmenter3,setSegmenter3] = useState('')
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [alertMessage,setAlertMessage] = useState<string>('');
    const [finalUrl1,setFinalUrl1] = useState<string | null >('');
    const [finalUrl2,setFinalUrl2] = useState<string | null >('');
    const [finalUrl3,setFinalUrl3] = useState<string | null >('');
    const [isLoading,setIsLoading] = useState<boolean> (false);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            const filePreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(filePreviewUrl);
        }
    };

    function handleClick(){
        if (!file) {
            setAlertMessage('Please select a file first!');
            return;
        }

        try{
            const formData = new FormData();
            formData.append('file', file ); 
            formData.append('model1', segmenter1);
            formData.append('model2' , segmenter2);
            formData.append('model3', segmenter3);
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axiosInstance.post('/upload_multiple_segment',formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                    responseType: 'blob',
                })
                console.log('File uploaded successfully', response);
                setIsLoading(false);
            } 
            fetchData();
        }
        catch(e:any){
            console.log(e);
            setAlertMessage('Unable to process the request');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage("");
        },5000)
    },[alertMessage])

    return(
        <div className = 'full-width-container'>
            <div>
                <button className="close-btn" onClick={() => {props.closeFunction(false)}}><IoMdClose /></button>
            </div>
            <div className = 'row'>
                <div className="row">
                    {(previewUrl)?
                        <div className="image-container">
                            <img src={previewUrl} alt="Uploaded" className="resizable-image" />
                        </div>
                    :
                        <>
                            <div className = 'row'>
                                <div className="col">
                                    <h3> Select a Image for Segmentation </h3>
                                </div>
                            </div>
                            <div className = 'row'>
                                <div className='col-4'>
            
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3">
                                        <label className="form-label">choose the photo you want to run the model</label>
                                        <input className="form-control" type="file" id="formFile" accept="image/*" onChange={handleFileChange}/>
                                    </div>
                                </div>
            
                                <div className = 'col-4'></div>
                            </div>
                        </>
                    }
                </div>
                <div className = 'row'>
                    <div className = 'col-4'>
                        <DropDownSegmenter changeFunction={setSegmenter1} dropDownMessage={segmenter1} />
                    </div>
                    <div className = 'col-4'>
                        <DropDownSegmenter changeFunction = {setSegmenter2} dropDownMessage={segmenter2} />
                    </div>
                    <div className = 'col-4'>
                        <DropDownSegmenter changeFunction = {setSegmenter3} dropDownMessage = {segmenter3} />
                    </div>
                </div>
                <div className = 'row'>
                    <Button onClick={handleClick}> Run </Button>
                </div>
                <div className = 'row'>
                    <div className = 'col'>
                        {(alertMessage !== '')?
                            <AlertMessageBox message={alertMessage} />
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GridView;