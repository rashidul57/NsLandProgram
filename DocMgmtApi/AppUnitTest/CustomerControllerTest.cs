using DocMgmtApi.Controllers;
using DocMgmtApi.Data;
using DocMgmtApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AppUnitTest
{
    public class CustomerControllerTest
    {
        CustomersController CustomersController;
        DocMgmtContext _docMgmtContext;

        public CustomerControllerTest()
        {
            var config = InitConfiguration();
            var connectionstring = config["ConnectionStrings:DbConnection"];
            var optionsBuilder = new DbContextOptionsBuilder<DocMgmtContext>();
            optionsBuilder.UseSqlServer(connectionstring);

            _docMgmtContext = new DocMgmtContext(optionsBuilder.Options);
            CustomersController = new CustomersController(_docMgmtContext);
        }

        public static IConfiguration InitConfiguration()
        {
            var config = new ConfigurationBuilder()
               .AddJsonFile("appsettings.development.json")
                .AddEnvironmentVariables()
                .Build();
            return config;
        }


        [Fact]
        public async void AddCustomer()
        {
            var customer = new Customer
            {
                FirstName = "abc",
                LastName = "xyz",
                Email = "xyz@xyz.com",
                Address = "34 wall street",
                City = "New York",
                State = "NY",
                PostalCode = "5kx 4kd",
                Country = "USA",
                Phone = "343454445",
                Gender = "Male",
            };
            var result = await CustomersController.AddCustomer(customer);
            Assert.IsType<Customer>(result.Value);
        }

        [Fact]
        public async void GetCustomers()
        {
            var result = await CustomersController.GetCustomers();
            Assert.IsType<Customer[]>(result.Value.ToArray());
        }

        [Fact]
        public async void UpdateCustomer()
        {
            var result = await CustomersController.GetCustomers();
            var toUpdateCustomer = result.Value.Last();
            if (toUpdateCustomer != null)
            {
                toUpdateCustomer.FirstName = toUpdateCustomer.FirstName + 1;
                var result2 = await CustomersController.UpdateCustomer(toUpdateCustomer.Id, toUpdateCustomer);
                Assert.Equal(result2.Value.FirstName, toUpdateCustomer.FirstName);
            }
        }

        [Fact]
        public async void DeleteCustomer()
        {
            var result = await CustomersController.GetCustomers();
            var toDeleteCustomer = result.Value.Last();
            if (toDeleteCustomer != null)
            {
                IActionResult result2 = await CustomersController.DeleteCustomer(toDeleteCustomer.Id);
                var res = result2 as ObjectResult;
                //Api returns NoContent
                Assert.Null(res);
            }
        }


    }
}