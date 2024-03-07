import React,{useState,useEffect} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";
import '../stylings/Segmenter.css';
import AlertMessageBox from "./AlertMessageBox";

function Detector(){

    const [detector,setdetector] = useState('Model');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [finalUrl,setFinalUrl] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [alertMessage,setAlertMessage] = useState<string> ('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            const filePreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(filePreviewUrl);
          }
    };

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage("");
        },5000)
    },[alertMessage])

    const handleUpload = async () => {
        if (!file) {
            setAlertMessage('Please select a file first!');
            return;
        }

        if(detector === '' || detector === 'Model'){
            setAlertMessage('Select a Model to run the image ');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); 
        formData.append('model',detector);

        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/upload_detect', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });
            setIsLoading(false);
            console.log('File uploaded successfully', response);
            const blob = new Blob([response.data], { type: 'image/png' })
            const responseImageUrl = URL.createObjectURL(blob);
            setFinalUrl(responseImageUrl)

        } catch (error) {
            setIsLoading(false)
            setAlertMessage('Error in uploading the image ')
            if (axios.isAxiosError(error)) {
                console.error('Error uploading file', error.message);
            } else {
                console.error('An unexpected error occurred', error);
            }
        }
    };

    return(
        <div className="full-width-container">
            <div className = 'row'>
                <div className = 'col-2'>
                </div>
                <div className = 'col-8'>
                    <div className="btn-group">
                        <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {detector}
                        </button>
                        <div className="dropdown-menu" >
                            <p className="dropdown-item" onClick={()=> setdetector('Yolov8')}> Yolov8 </p>
                            <p className="dropdown-item" onClick={() => setdetector('Free Solo')}>Free Solo</p>
                            <p className="dropdown-item" onClick = {() => setdetector('DETR')}>DETR</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row" style={{alignItems: 'center'}}>
                {(previewUrl)?
                    <div className="image-container">
                        <img src={previewUrl} alt="Uploaded" className="resizable-image" />
                    </div>
                :
                    <div className="col">
                        <h3> Select a Image for Detection </h3>
                    </div>
                }
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
            <div className="row">
                <div className = 'col-4'></div>
                <div className = 'col-4'>
                    <Button onClick={handleUpload} > Detect </Button>
                </div>
                <div className = 'col-4'></div>
            </div>
            <div className="row">
                <div className="col">
                    {
                        (finalUrl)?
                            <div className="image-container">
                                <img src={finalUrl} alt="Uploaded" className="resizable-image" />
                            </div>
                        : null
                    }
                </div>
            </div>
            <div className = 'row'>
                <div className = 'col'>
                    {(alertMessage !== '')?
                        <AlertMessageBox message={alertMessage} />
                        : null
                    }
                </div>
            </div>
            {
                isLoading?
                <Loader/>
                : null
            }
        </div>
    )
}

export default Detector;