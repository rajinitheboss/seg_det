import React from "react";
import '../stylings/AlertMessage.css'

interface AlertMessageProps {
    message: string
}

function AlertMessageBox(alertMessage:AlertMessageProps){

    return(
        <div className = 'alert-box'>
            {alertMessage.message}
        </div>
    )

}

export default AlertMessageBox;