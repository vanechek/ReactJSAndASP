import React from "react";
import "./templateProduct.css"

const TemplateProduct = (props) => {
    return(
        <div className="prduct_border">
            <div className="product_image" style={{backgroundImage:`url(${props.url})`}}>
            </div>
            <div className="product_title">
                <label>{props.title}</label>
            </div>
            <div className="product_price">
                <label>{props.price}</label>
            </div>
            <button className="product_button">Купить</button>
        </div>
    )
}

export default TemplateProduct