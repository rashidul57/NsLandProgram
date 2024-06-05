namespace DocMgmtApi.Models
{
    public class Document
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public byte[] Data { get; set; }

        public DateTime DateCreated { get; set; } = DateTime.Now;
        public Guid CustomerId { get; set; } // Required foreign key property
    }
}
