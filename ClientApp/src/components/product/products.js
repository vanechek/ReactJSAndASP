import React, { useState } from "react";
import TemplateProduct from "./templateProduct";

const Products = () => {

    const [products, setProducts] = useState(null);

    function GetProducts() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "api/products/GetProducts");
        xhr.onload = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                setProducts(JSON.parse(xhr.responseText));
            }
        }.bind(this);
        xhr.send();
    }

    GetProducts();

    return (
        <React.Fragment>
            {
                products !== null ?
                    products.map(function (product, index) {
                        return <TemplateProduct title={product.name} key={index} price={product.price} url={product.url} />
                    }) : null
            }
        </React.Fragment>
    )
}
export default Products