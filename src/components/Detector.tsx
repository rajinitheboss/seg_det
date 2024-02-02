import React,{useState} from "react";
import {Button} from "react-bootstrap";

function Detector(){

    const [segmeter,setdetector] = useState('Model');

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
                    <Button> Detect </Button>
                </div>
                <div className = 'col-4'></div>
            </div>
        </div>
    )
}

export default Detector;