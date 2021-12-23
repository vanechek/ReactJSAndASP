import React, { useContext } from "react";
import { AlertContext } from "./AlertContext";
import "./Alert.css"

export const Alert = () => {
    const { alert, hide } = useContext(AlertContext);
    
    function autoHide(){
            alert.second += 1000;
            if(alert.second >= 3000){
                clearTimeout(timeId);
                alert.second = 0;
                hide();
            }
        var timeId = setTimeout(() => autoHide(), 1000)
    }

    if (!alert) return null
    alert.second = 0;
    return (
        <div className={`alert alert-${alert.type || 'secondary'} alert-dismissible`} role="alert">
            {alert.text}
            {autoHide()};
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={hide}>
                <span aria-hidden="true">&times;</span>
            </button>
            {alert.second}
        </div>
    )
}