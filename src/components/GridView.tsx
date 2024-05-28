import React,{useState,useEffect} from "react";
import AlertMessageBox from "./AlertMessageBox";
import DropDownGridView from "./DropDownGridView";
import { Button } from "react-bootstrap";
import axiosInstance from "../config/AxiosConfig";
import '../stylings/GridView.css'
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";
import '../stylings/GridView.css';

interface gridViewProps{
    closeFunction: (t:boolean) => void;
}

function GridView(props:gridViewProps){

    const [model1,setModel1] = useState('Model1');
    const [model2,setModel2] = useState('Model2');
    const [model3,setModel3] = useState('Model3')
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
            if(model1 === 'Model1'){
                console.log("soemthing");
                if(model2 === 'Model2'){
                    if(model3 === 'Model3'){
                        setAlertMessage('Please select atleast one model');
                        return ;
                    }
                }
            }
            const formData = new FormData();
            formData.append('file', file ); 
            formData.append('model1', model1);
            formData.append('model2' , model2);
            formData.append('model3', model3);
            setIsLoading(true);
            const fetchData = async () => {
                const response = await axiosInstance.post('/multiple_model',formData,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                })
                console.log('File uploaded successfully', response);
                const image_data = response.data
                if(image_data.hasOwnProperty('model1')){
                    const imageUrl= `data:image/jpeg;base64,${image_data['model1']}`
                    setFinalUrl1(imageUrl);
                }
                if(image_data.hasOwnProperty('model2')){
                    const imageUrl= `data:image/jpeg;base64,${image_data['model2']}`
                    setFinalUrl2(imageUrl);
                }
                if(image_data.hasOwnProperty('model3')){
                    const imageUrl= `data:image/jpeg;base64,${image_data['model3']}`
                    setFinalUrl3(imageUrl);
                }

                setIsLoading(false);
            } 
            fetchData();
        }
        catch(e:any){
            console.log(e);
            setIsLoading(false);
            setAlertMessage('Unable to process the request');
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertMessage("");
        },5000)
    },[alertMessage])

    return(
        <div className = 'container'>
            {/* <div className = 'row'> */}
                <button className="close-btn" onClick={() => {props.closeFunction(false)}}><IoMdClose /></button>
            {/* </div> */}
            <div className = 'row'>
                <div className="row">
                    {(previewUrl)?
                        <div className="image-container">
                            <img src={previewUrl} alt="Uploaded" className="resizable-image" />
                        </div>
                    :
                    null
                    }
                </div>
                <div className = 'row'>
                        <>
                            <div className = 'row'>
                                <div className="col">
                                    <h3> Select a Image </h3>
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
                </div>
                <div className = 'row'>
                    <div className = 'col-4'>
                        <DropDownGridView changeFunction={setModel1} dropDownMessage={model1} />
                    </div>
                    <div className = 'col-4'>
                        <DropDownGridView changeFunction = {setModel2} dropDownMessage={model2} />
                    </div>
                    <div className = 'col-4'>
                        <DropDownGridView changeFunction = {setModel3} dropDownMessage = {model3} />
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-4'>
                        {
                            (finalUrl1)?
                                <div className="image-container">
                                    <img src={finalUrl1} alt="Image" className="grid-result" />
                                </div>
                            : null
                        }
                    </div>
                    <div className = 'col-4'>
                        {
                            (finalUrl2)?
                                <div className="image-container">
                                    <img src={finalUrl2} alt="Image" className="grid-result" />
                                </div>
                            : null
                        }
                    </div>
                    <div className = 'col-4'>
                        {
                            (finalUrl3)?
                                <div className="image-container">
                                    <img src={finalUrl3} alt="Image" className="grid-result" />
                                </div>
                            : null
                        }
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col-5'></div>
                    <div className = 'col-2' style={{marginTop:'2vh'}}>
                        <Button onClick={handleClick}> Run </Button>
                    </div>
                    <div className = 'col-5'></div>
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
                {
                    (isLoading)?
                        <Loader/>
                    : null
                }
        </div>
    )
}


export default GridView;