namespace DocMgmtApi.Models
{
    public class Customer
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
    }
}



