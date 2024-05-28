import React from "react";
import {useState,useEffect} from "react";
import { Button } from "react-bootstrap";
import GridView from "./GridView";
import { setgid } from "process";
import '../stylings/GridView.css';

function GridViewButton(){

    const [showGridView,setShowGridView] = useState(false)

    return(
        <div className='row' style={{alignContent:'center'}}>
            <div className = 'col' style={{alignContent:'center'}} >
                <Button onClick = {() => (setShowGridView(true))}>Compare Results </Button>           
            </div>
            <div className = 'col'>
                {
                    (showGridView)?
                        <div id = 'gridView' style={{marginTop:'5px'}}>
                                <GridView closeFunction={setShowGridView} />
                        </div>
                    :
                        null
                }
            </div>
        </div>
    )
}

export default GridViewButton;