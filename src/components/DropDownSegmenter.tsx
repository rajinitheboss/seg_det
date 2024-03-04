import React from "react";

interface DropDownSegmenterProps{
    dropDownMessage:string,
    changeFunction: (t:string) => void;
}


function DropDownSegmenter(props:DropDownSegmenterProps) {
    return(
        <div className="btn-group">
            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.dropDownMessage}
            </button>
            <div className="dropdown-menu" >
                <p className="dropdown-item" onClick={()=> props.changeFunction('SAM')}> SAM </p>
                <p className="dropdown-item" onClick={() => props.changeFunction('M_RCNN')}>M_RCNN</p>
                <p className="dropdown-item" onClick = {() => props.changeFunction('detector3')}>Detector 3</p>
            </div>
        </div>
    )
}


export default DropDownSegmenter;