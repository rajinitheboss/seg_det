import React,{useState} from "react";
import {Button} from "react-bootstrap";
import axios from "axios";

function Detector(){

    const [segmeter,setdetector] = useState('Model');
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [finalUrl,setFinalUrl] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            const filePreviewUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(filePreviewUrl);
          }
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // The 'file' corresponds to the key expected on the backend

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });
            console.log('File uploaded successfully', response);
            const blob = new Blob([response.data], { type: 'image/png' })
            const responseImageUrl = URL.createObjectURL(blob);
            setFinalUrl(responseImageUrl)

        } catch (error) {
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
                            {segmeter}
                        </button>
                        <div className="dropdown-menu" >
                            <p className="dropdown-item" onClick={()=> setdetector('detector1')}> Detector 1</p>
                            <p className="dropdown-item" onClick={() => setdetector('detector2')}>Detector 2</p>
                            <p className="dropdown-item" onClick = {() => setdetector('detector3')}>Detector 3</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                {(previewUrl)?
                 <img src={previewUrl} alt="Preview" style={{ width: '100%', marginTop: '20px' }} />
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
                        <img src = {finalUrl} alt = 'image_after_detection' style={{ width: '100%', marginTop: '20px' }} />
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Detector;