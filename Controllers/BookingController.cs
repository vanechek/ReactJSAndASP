using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactJSAndASP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication;

namespace ReactJSAndASP.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class BookingController : Controller
	{
		private readonly ILogger<BookingController> logger;
		private DataBaseManager db;
		public BookingController(ILogger<BookingController> logger, DataBaseManager db)
		{
			this.db = db;
			this.logger = logger;
		}

		/// <summary>
		/// Получает все аккаунты.
		/// </summary>
		/// <returns>Список аккаунтов</returns>
		[HttpGet("GetBookingList")]
		public IEnumerable<Booking> GetBookingList()
		{
			Response.StatusCode = 200;
			logger.LogInformation("Call api GetAccounClients");
			return null;
		}
		[HttpGet("GetAllOrdersAccountClient/{id}")]
		public object GetAllOrdersAccountClient(Guid id)
		{
			var booking = db.Booking.Where(bk => bk.AccountClientId == id)
										.GroupBy(bk => bk.NumberTable)
										.Select(g => new
										{
											g.Key,
											Count = g.Count()
										})
										.ToList();


			return booking;
		}

		[HttpGet("GetFastFoodsOfOrder/{id}&{number}")]
		public object GetFastFoodsOfOrder(Guid id, int number)
		{
			return db.Booking.Join(db.FastFood,
				b => b.FastFoodId,
				f => f.Id,
				(b, f) => new
				{
					FastFoodId = f.Id,
					NameFastFood = f.NameFastFood,
					Price = f.Price,
					accountClientId = b.AccountClientId,
					numberTable = b.NumberTable
				}).Where(bk => bk.numberTable == number && bk.accountClientId == id).ToList();
		}
		/// <summary>
		/// Получает все аккаунты.
		/// </summary>
		/// <returns>Список аккаунтов</returns>
		[HttpGet("GetBookingOfAccountClient/{id}")]
		public object GetBookingOfAccountClient(Guid id)
		{
			Response.StatusCode = 200;
			logger.LogInformation("Call api GetAccounClients");
			var booking = (from b in db.Booking
						   join a in db.AccountClient
						   on b.AccountClientId equals a.Id
						   join f in db.FastFood
						   on b.FastFoodId equals f.Id
						   join p in db.PaymentOfBooking
						   on b.AccountClientId equals p.AccountClientId
						   
						   select new
						   {
							   Address = a.Address,
							   FIO = a.Fio,
							   PhoneNumber = a.PhoneNumber,
							   NumberTable = b.NumberTable,
							   BookingTime = b.BookingTime,
							   FastFoodId = f.Id,
							   CookingTime = f.CookingTime,
							   NameFastFood = f.NameFastFood,
							   Price = f.Price,
							   TotalOrders = p.TotalOrders,
							   PaymentOfBookingId = p.Id,
							   PaidUp = p.PaidUp,
							   AccountClientId = a.Id
						   }).ToList().Where(a => a.AccountClientId == id);
			return booking;
		}
	}
}
