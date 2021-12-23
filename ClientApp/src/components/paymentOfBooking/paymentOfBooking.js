import React from "react"
const PaymentOfBookin = props => {
    if (!props.payement) {
        return null;
    }
    var className = props.payement.id + 'fastFood';
    return (
        <div className={className}>
            <h3>Оплата</h3>
            <ul>
                <li>Здоровая: {props.payement.paidUp ? "да" : "нет"} </li>
                <li>Общая стоимость: {props.payement.totalOrders}</li>
            </ul>
        </div>
    );
}

export default PaymentOfBookin