import React, { useContext } from "react";
import "./mainShop.css"
import Products from "../components/product/products.js";
import { AlertContext } from "../components/alert/AlertContext";
const MainShop = () => {
    return (
        <div className="shop_main">
            <div className="shop_content">
                <div className="header_product">
                    <ul>
                        <li><label>Смартфоны</label></li>
                        <li><label>Телевизоры</label></li>
                        <li><label>Игровые ноутбуки</label></li>
                        <li><label>Стиральные машинки</label></li>
                    </ul>
                </div>

                <div className="products_main">
                    <Products />
                </div>
            </div>
        </div>
    )
}
export default MainShop