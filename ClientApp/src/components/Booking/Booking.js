import React from "react"
import FastFood from "../Fastfood/fastFood";
import BookingInPaymentMap from "../BookingInPaymentMap/bookingInPaymentMap.js";
import './Booking.css'
import BaseClass from '../Helpers/BaseClass.js'

const Booking = props => {

    return (
        <React.Fragment>
            <div className="table-information">
                {
                    props.bookings.length != 0 ?
                        props.bookings.map(function name(booking, index) {
                            return (
                                <React.Fragment>
                                    <FastFood
                                        className={`fastFoodContent ${index}`}
                                        fastFood={booking.nameFastFood}
                                        price={booking.price}
                                        cookingTime={booking.cookingTime}
                                        key={index}
                                        isOnlyContent={true} />
                                </React.Fragment>
                            )
                        }) : null
                }
                <h3>
                    Общая стоимость:
                    {props.bookings[0].totalOrders}<br />
                    Номер заказа:
                    {props.bookings[0].numberTable}
                </h3>
            </div>
        </React.Fragment>
    );
}

export default BaseClass(Booking, 'booking')