// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace ReactJSAndASP.Models
{
    public partial class BookingInPaymentMap
    {
        public Guid BookingInPaymentMapId { get; set; }
        public Guid BookingId { get; set; }
        public Guid? PaymentId { get; set; }

        public virtual Booking Booking { get; set; }
        public virtual PaymentOfBooking Payment { get; set; }
    }
}