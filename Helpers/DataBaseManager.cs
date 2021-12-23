using Microsoft.EntityFrameworkCore;
using ReactJSAndASP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication
{
	public class DataBaseManager: DbContext
	{
		public DbSet<AccountClient> AccountClient { get; set; }
		public DbSet<Users> Users { get; set; }
		public DbSet<Booking> Booking { get; set; }
		public DbSet<FastFood> FastFood { get; set; }
		public DbSet<Products> Products { get; set; }
		public DbSet<PaymentOfBooking> PaymentOfBooking { get; set; }
		public DataBaseManager(DbContextOptions<DataBaseManager> options)
			:base(options)
		{
			Database.EnsureCreated();
		}
	}
}
