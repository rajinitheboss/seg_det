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
                <p className="dropdown-item" onClick = {() => props.changeFunction('CA-Net')}>CA-NET(only for skin cells)</p>
                <p className = 'dropdown-item' onClick = {() => props.changeFunction('celldetection')}> Cell Detection </p>
                <p className = 'dropdown-item' onClick = {() => props.changeFunction('UNET')}> UNET </p>
            </div>
        </div>
    )
}


export default DropDownSegmenter;