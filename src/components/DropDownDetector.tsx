import React from "react";

interface DropDownSegmenterProps{
    dropDownMessage:string,
    changeFunction: (t:string) => void;
}


function DropDownDetector(props:DropDownSegmenterProps) {
    return(
        <div className="btn-group">
            <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {props.dropDownMessage}
            </button>
            <div className="dropdown-menu" >
                <p className="dropdown-item" onClick={()=> props.changeFunction('Yolov8')}> Yolov8 </p>
                <p className="dropdown-item" onClick={() => props.changeFunction('Free Solo')}> Free Solo </p>
                <p className="dropdown-item" onClick = {() => props.changeFunction('DETR')}> DETR </p>
                <p className="dropdown-item" onClick = {() => props.changeFunction('SAHI')}> SAHI </p>
                <p className = 'dropdown-item' onClick = {() => props.changeFunction('EfficientDet')}> EfficientDet </p>
                <p className = 'dropdown-item' onClick = {() => props.changeFunction('RetinaNet')}> RetinaNet </p>
                <p className = 'dropdown-item' onClick = {() => props.changeFunction('YOLOv8_FT')}> YOLOv8_FT </p>
            </div>
        </div>
    )
}


export default DropDownDetector;