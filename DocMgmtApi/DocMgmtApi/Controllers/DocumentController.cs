using DocMgmtApi.Data;
using DocMgmtApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DocMgmtApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : Controller
    {
        private readonly DocMgmtContext _docMgmtContext;
        public DocumentsController(DocMgmtContext docMgmtContext)
        {
            _docMgmtContext = docMgmtContext;
        }

        //POST : api/documents
        [HttpPost]
        public async Task<ActionResult<Document>> AddDocument([FromForm] Document document)
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }

            _docMgmtContext.Documents.Add(document);

            await _docMgmtContext.SaveChangesAsync();

            return document;
        }

        //GET : api/documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }
            return await _docMgmtContext.Documents.ToListAsync();
        }


        //GET : api/documents/CustomerDocuments/:customerId
        [HttpGet]
        [Route("CustomerDocuments/{customerId}")]
        public async Task<ActionResult<IEnumerable<Document>>> CustomerDocuments(Guid customerId)
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }
            return await _docMgmtContext.Documents.ToListAsync();
        }

        //GET : api/documents/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocuments(Guid id)
        {
            if (_docMgmtContext == null)
            {
                return NotFound();
            }

            var document = await _docMgmtContext.Documents.FindAsync(id);
            if (document == null)
            {
                return NotFound();
            }
            return document;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Document>> UpdateDocument(Guid id, Document document)
        {
            if (document.Id != id)
            {
                return BadRequest();
            }

            _docMgmtContext.Entry(document).State = EntityState.Modified;

            await _docMgmtContext.SaveChangesAsync();

            var updatedDocument = _docMgmtContext.Documents.FirstOrDefaultAsync(x => x.Id == id);

            return document;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDocument(Guid id)
        {
            var document = await _docMgmtContext.Documents.FindAsync(id);

            if (document == null) return NotFound();

            _docMgmtContext.Documents.Remove(document);

            await _docMgmtContext.SaveChangesAsync();

            return NoContent();

        }
    }
}
