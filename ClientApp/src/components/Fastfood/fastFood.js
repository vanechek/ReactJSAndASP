import React, { useState } from "react"
import BaseClass from "../Helpers/BaseClass";
import "./fastFood.css"

const FastFood = ({ className, select, fastFood, price, cookingTime, id, isOnlyContent}) => {

    const [isClicked, setClicked] = useState(false); 
    
    let newClassName = className;
    if (isClicked && !isOnlyContent) {
        newClassName = "selected " + className
    }
    return (
        <div className={newClassName} onClick={() => {
            if(!isClicked && !isOnlyContent){
                setClicked(true);
                select(id)
            }
        }
        }>
            <ul>
                <li>Название: {fastFood}</li>
                <li>Цена: {price}р</li>
                <li>Время готовки: {cookingTime}</li>
            </ul>
        </div>
    );
}

export default FastFood