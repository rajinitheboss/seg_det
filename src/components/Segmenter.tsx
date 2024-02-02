
import {useState} from "react";
import {Button} from 'react-bootstrap';


function Segmenter(){

    const [segmeter,setSegmenter] = useState('Model');

    const [file, setFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    //     e.preventDefault();

    //     let reader = new FileReader();
    //     let selectedFile = e.target.files[0];

    //     reader.onloadend = () => {
    //         setFile(selectedFile);
    //         setImagePreviewUrl(reader.result);
    //     }

    //     if (selectedFile) {
    //         reader.readAsDataURL(selectedFile);
    //     }
    // }

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
                            <p className="dropdown-item" onClick={()=> setSegmenter('segmenter1')}>segmenter 1</p>
                            <p className="dropdown-item" onClick={() => setSegmenter('segmenter2')}>segmenter 2</p>
                            <p className="dropdown-item" onClick = {() => setSegmenter('segmenter3')}>segmenter 3</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row">
                <input type="file" onChange={handleImageChange} />
            </div> */}
            <div className="row">
                <img src="https://ultralytics.com/images/bus.jpg" alt = '' width='500px' height='500px'></img>
            </div>
            <div className = 'row'>
                <div className='col-4'>

                </div>
                <div className='col-4'>
                    <div className="mb-3">
                        <label className="form-label">choose the photo you want to run the model</label>
                        <input className="form-control" type="file" id="formFile" accept="image/*" />
                    </div>
                </div>

                <div className = 'col-4'></div>
            </div>
            <div className="row">
                <div className = 'col-4'></div>
                <div className = 'col-4'>
                    <Button> Segment </Button>
                </div>
                <div className = 'col-4'></div>
            </div>
        </div>
    )
}

export default Segmenter;