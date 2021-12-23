using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ReactJSAndASP.Helpers;
using ReactJSAndASP.Models;
using Microsoft.Extensions.Logging;

namespace WebApplication.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class UsersController : Controller
	{
		private readonly ILogger<UsersController> logger;
		private DataBaseManager db;
		public UsersController(ILogger<UsersController> logger, DataBaseManager db)
		{
			this.db = db;
			this.logger = logger;
		}
		[HttpPost("Authorization")]
		public IActionResult Authorization([FromBody] Users user)
		{
			var findedUser = db.Users.FirstOrDefault(paramsUsers => paramsUsers.Login == user.Login && paramsUsers.Password == user.Password);
			if (findedUser == null)
			{
				return NotFound();
			}
			var expiresDate = DateTime.UtcNow.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME));

			var jwt = new JwtSecurityToken(
				issuer: AuthOptions.ISSUER,
					audience: AuthOptions.AUDIENCE,
					notBefore: DateTime.UtcNow,
					expires: expiresDate,
					signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
			var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

			var response = new
			{
				access_token = encodedJwt,
				username = findedUser.Login,
				userId = findedUser.Id,
				expiresDate = expiresDate
			};
			return Json(response);
		}
	}
}
