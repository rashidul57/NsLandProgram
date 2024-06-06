using DocMgmtApi.Controllers;
using DocMgmtApi.Data;
using DocMgmtApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace AppUnitTest
{
    public class DocumentControllerTest
    {
        DocumentsController _docController;
        CustomersController _custController;
        DocMgmtContext _docMgmtContext;

        public DocumentControllerTest()
        {
            var config = InitConfiguration();
            var connectionstring = config["ConnectionStrings:DbConnection"];
            var optionsBuilder = new DbContextOptionsBuilder<DocMgmtContext>();
            optionsBuilder.UseSqlServer(connectionstring);

            _docMgmtContext = new DocMgmtContext(optionsBuilder.Options);
            _docController = new DocumentsController(_docMgmtContext);

            _custController = new CustomersController(_docMgmtContext);
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
        public async void AddDocument()
        {
            var result = await _custController.GetCustomers();
            var customers = result.Value.ToArray();
            if (customers.Count() > 0)
            {
                var customer = customers.First();
                var document = new Document
                {
                    Name = "Sample Document",
                    Data = new byte[] { 104, 101, 108, 108, 111 },
                    Type = "Test Type",
                    CustomerId = customer.Id,

                };

                var result2 = await _docController.AddDocument(document);
                Assert.IsType<Document>(result2.Value);
            }

        }

        [Fact]
        public async void GetDocuments()
        {
            var result = await _docController.GetDocuments();
            Assert.IsType<Document[]>(result.Value.ToArray());
        }

        [Fact]
        public async void UpdateDocument()
        {
            var result = await _docController.GetDocuments();
            if (result.Value.Count() > 0)
            {
                var toUpdateDocument = result.Value.ToArray().Last();
                toUpdateDocument.Type = "changed type";
                var result2 = await _docController.UpdateDocument(toUpdateDocument.Id, toUpdateDocument);
                Assert.Equal(result2.Value.Type, toUpdateDocument.Type);
            }
        }

        [Fact]
        public async void DeleteDocument()
        {
            var result = await _docController.GetDocuments();
            if (result.Value.Count() > 0)
            {
                var toDeleteDocument = result.Value.ToArray().Last();
                IActionResult result2 = await _docController.DeleteDocument(toDeleteDocument.Id);
                var res = result2 as ObjectResult;
                //Api returns NoContent, so its null
                Assert.Null(res);
            }
        }


    }
}