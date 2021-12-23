import React from "react"
import PaymentOfBookin from '../paymentOfBooking/paymentOfBooking.js'
import BaseClass from "../Helpers/BaseClass.js"

const BookingInPaymentMap = props => {
    return (
        <React.Fragment>
            <PaymentOfBookin payement={props.bookingInPaymentMap.payment} />
        </React.Fragment>
    );
}

export default BaseClass(BookingInPaymentMap, 'bookingInPaymentMap')