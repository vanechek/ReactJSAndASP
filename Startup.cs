using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using WebApplication;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ReactJSAndASP.Helpers;

namespace ReactJSAndASP
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<DataBaseManager>(options =>
			{
				options.UseSqlServer("Server=DESKTOP-3JTI5MG;Database=Restaurant;Trusted_Connection=True;");
				options.UseLazyLoadingProxies();
			});
			services.AddControllersWithViews()
				.AddNewtonsoftJson(options =>
				options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
			);
			// In production, the React files will be served from this directory
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/build";
			});
			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
					.AddJwtBearer(options =>
						{
							options.RequireHttpsMetadata = false;
							options.TokenValidationParameters = new TokenValidationParameters
							{
								// укзывает, будет ли валидироваться издатель при валидации токена
								ValidateIssuer = true,
								// строка, представляющая издателя
								ValidIssuer = AuthOptions.ISSUER,

								// будет ли валидироваться потребитель токена
								ValidateAudience = true,
								// установка потребителя токена
								ValidAudience = AuthOptions.AUDIENCE,
								// будет ли валидироваться время существования
								ValidateLifetime = true,

								// установка ключа безопасности
								IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
								// Авалидация ключа безопасности
								ValidateIssuerSigningKey = true,
							};
					});
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseRouting();

			app.UseAuthentication();
			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllerRoute(
					name: "default",
					pattern: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";

				if (env.IsDevelopment())
				{
					spa.UseReactDevelopmentServer(npmScript: "start");
				}
			});
		}
	}
}
