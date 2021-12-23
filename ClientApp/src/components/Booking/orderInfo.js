import React, { useState } from "react";
import Booking from "./Booking";

const OrderInfo = (props) => {
    const [description, setDescritpion] = useState(null);
    const [isOpened, setIsOpened] = useState(false);
    return (
        <div className={`orderInfo ${props.keyOrder}`}>
            <span>Номер заказа {props.keyOrder} <br />
                Количство заказанной еды  {props.count}</span>
            <details onClick={() => {
                if (!isOpened) {
                    const response = fetch(`api/booking/GetFastFoodsOfOrder/${props.accountClientId}&${props.keyOrder}`, {
                        method: 'GET',
                    })
                    response.then(response => response.json())
                        .then(result => {
                            setIsOpened(true);
                            setDescritpion((result))
                        })
                }else{
                    setIsOpened(true);
                }
            }}>
                <h5>{
                    description ?
                        <Booking bookings={description} /> : null
                }
                </h5>
            </details>
        </div>
    )
}

export default OrderInfo