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
	[Route("api/{controller}")]
	public class ProductsController : Controller
	{
		private DataBaseManager db;
		private ILogger<Products> logger;

		public ProductsController(DataBaseManager dataBaseManager, ILogger<Products> logger)
		{
			this.logger = logger;
			this.db = dataBaseManager;
		}
		[HttpGet("GetProducts")]
		public IEnumerable<Products> GetProducts()
		{
			return db.Products.ToList();
		}
	}
}
