// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
using System;
using System.Collections.Generic;

#nullable disable

namespace ReactJSAndASP.Models
{
    public partial class FastFood
    {
        public FastFood()
        {
            Booking = new HashSet<Booking>();
        }

        public Guid Id { get; set; }
        public string NameFastFood { get; set; }
        public decimal Price { get; set; }
        public int CookingTime { get; set; }

        public virtual ICollection<Booking> Booking { get; set; }
    }
}