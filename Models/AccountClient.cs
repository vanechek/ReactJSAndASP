﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace ReactJSAndASP.Models
{
    public partial class AccountClient
    {
        public AccountClient()
        {
            Booking = new HashSet<Booking>();
            PaymentOfBooking = new HashSet<PaymentOfBooking>();
        }

        public Guid Id { get; set; }
        public string Fio { get; set; }
        public int? PhoneNumber { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
        public virtual ICollection<PaymentOfBooking> PaymentOfBooking { get; set; }
    }
}