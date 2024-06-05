using DocMgmtApi.Data;
using DocMgmtApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocMgmtApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : Controller
    {
        private readonly DocMgmtContext _docMgmtContext;
        public CustomersController(DocMgmtContext docMgmtContext)
        {
            _docMgmtContext = docMgmtContext;
        }

        //POST : api/customers
        [HttpPost]
        public async Task<ActionResult<Customer>> AddCustomer(Customer customer)
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }

            _docMgmtContext.Customers.Add(customer);

            await _docMgmtContext.SaveChangesAsync();

            return customer;
        }

        //GET : api/customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }
            return await _docMgmtContext.Customers.ToListAsync();
        }

        //GET : api/customers/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomers(Guid id)
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }

            var customer = await _docMgmtContext.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Customer>> UpdateCustomer(Guid id, Customer customer)
        {
            if (customer.Id != id)
            {
                return BadRequest();
            }

            _docMgmtContext.Entry(customer).State = EntityState.Modified;

            await _docMgmtContext.SaveChangesAsync();

            var updatedCustomer = _docMgmtContext.Customers.FirstOrDefaultAsync(x => x.Id == id);

            return customer;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await _docMgmtContext.Customers.FindAsync(id);

            if (customer == null) return NotFound();

            _docMgmtContext.Customers.Remove(customer);

            await _docMgmtContext.SaveChangesAsync();

            return NoContent();

        }
    }
}
