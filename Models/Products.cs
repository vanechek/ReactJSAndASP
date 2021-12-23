using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactJSAndASP.Models
{
	public class Products
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
		public decimal Price { get; set; }
		public string Color { get; set; }
		public string Descritpion { get; set; }
		public string Specifications { get; set; }
		public string Url { get; set; }
	}
}
