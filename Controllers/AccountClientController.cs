using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReactJSAndASP.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace WebApplication.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountClientController : Controller
	{
		private readonly ILogger<AccountClientController> logger;
		private DataBaseManager db;
		public AccountClientController(ILogger<AccountClientController> logger, DataBaseManager db)
		{
			this.db = db;
			this.logger = logger;
		}
		/// <summary>
		/// Получает все аккаунты.
		/// </summary>
		/// <returns>Список аккаунтов</returns>
		[HttpGet("GetAccounClients")]
		public IEnumerable<AccountClient> GetAccounClients()
		{
			Response.StatusCode = 200;
			logger.LogInformation("Call api GetAccounClients");
			return db.AccountClient.ToList();
		}

		[HttpPost("GetAccounClientsWithParams")]
		public IEnumerable<AccountClient> GetAccounClientsWithParams([FromBody]Dictionary<string, string> valuePairs)
		{
			var accs = new List<AccountClient>();
			var value = valuePairs.Values.FirstOrDefault();		
			switch (valuePairs.Keys.FirstOrDefault())
			{
				case "ФИО":
					accs =  db.AccountClient.Where(acc => acc.Fio.Contains(value)).ToList();
					break;
				case "Номер телефона":
					accs = db.AccountClient.Where(acc => acc.PhoneNumber.ToString().Contains(value)).ToList();
					break;
				case "Адрес":
					accs = db.AccountClient.Where(acc => acc.Address.Contains(value)).ToList();
					break;
				default:
					break;
			}
			return accs;

		}
		/// <summary>
		/// Поиск аккаунта
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		[HttpGet("GetAccounClient/{id}")]
		public AccountClient GetAccounClient( Guid id)
		{
			logger.LogInformation("Call api GetAccounClient");
			if (Guid.Empty == id)
			{
				Response.StatusCode = 404;
				return null;
			}
			else
			{
				try
				{
					Response.StatusCode = 200;
					return db.AccountClient.FirstOrDefault(account => account.Id == id);
				}catch(Exception ex)
				{
					Response.StatusCode = 404;
				}
				return null;
			}
		}
		[HttpDelete("DeleteAccounClients/{id}")]
		public IActionResult DeleteAccounClients(string id)
		{
			logger.LogInformation("Call api DeleteAccounClients");
			var parsedId = Guid.Empty;
			if (Guid.Empty.ToString() == id || string.IsNullOrWhiteSpace(id))
			{
				return NotFound("Аккаунт клиента не найден по Id" + id);
			}
			else
			{
				if (Guid.TryParse(id, out parsedId))
				{
					try
					{
						var client = db.AccountClient.FirstOrDefault(account => account.Id == parsedId);
						db.AccountClient.Remove(client);
						db.SaveChanges();
						return Ok("Удалено");
					}
					catch (Exception ex)
					{		
						return NotFound(ex.InnerException +
								ex.StackTrace);
					}
				}
				else
				{
					return NotFound("Аккаунт клиента не найден по Id" + id);
				}
			}

		}
		[HttpPost("AddAccounClient")]
		public IActionResult AddAccounClient([FromBody] AccountClient accountClient)
		{
			if (accountClient == null)
			{
				return NotFound();
			}
			accountClient.Id = Guid.NewGuid();
			db.AccountClient.Add(accountClient);
			db.SaveChanges();
			return Ok();
		}

		[HttpPost("ChangeValuesAccounClient")]
		public IActionResult ChangeValuesAccounClient([FromBody] AccountClient accountClient)
		{
			if (accountClient == null)
			{
				return NotFound();
			}
			db.AccountClient.Update(accountClient);
			db.SaveChanges();
			return Ok();
		}
	}
}
