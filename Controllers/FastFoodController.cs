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
	public class FastFoodController : Controller
	{
		private readonly ILogger<FastFoodController> logger;
		private DataBaseManager db;
		public FastFoodController(ILogger<FastFoodController> logger, DataBaseManager db)
		{
			this.db = db;
			this.logger = logger;
		}
		[HttpGet("GetAllFoods")]
		public IEnumerable<FastFood> GetAllFoods()
		{
			return db.FastFood.ToList();
		}
		[HttpPost("AddFastFoodInBooking")]
		public string AddFastFoodInBooking([FromBody] Dictionary<string, List<string>> parameters)
		{
			var item = parameters.ToString();
			var fastFoods = new List<string>();
			var accountClientId = new List<string>();
			parameters.TryGetValue("fastFoods", out fastFoods);
			parameters.TryGetValue("accountClientId", out accountClientId);
			var bookingTime = DateTime.Now;
			var numberOrder = new Random().Next(100, 999);
			foreach (var fastFood in fastFoods)
			{
				db.Booking.Add(new Booking
				{
					AccountClientId = Guid.Parse(accountClientId.FirstOrDefault()),
					BookingTime = bookingTime,
					FastFoodId = Guid.Parse(fastFood),
					NumberTable = numberOrder
				});
				db.SaveChanges();
			}
			return "";
		}

		[HttpPost("AddFastFood")]
		public IActionResult AddFastFood([FromBody] FastFood fastFood)
		{
			if (fastFood == null)
			{
				return NotFound();
			}
			fastFood.Id = Guid.NewGuid();
			db.FastFood.Add(fastFood);
			db.SaveChanges();
			return Ok();
		}
	}
}
