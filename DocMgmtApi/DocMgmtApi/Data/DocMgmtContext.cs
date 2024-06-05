using DocMgmtApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DocMgmtApi.Data
{
    public class DocMgmtContext : DbContext
    {
        public DocMgmtContext(DbContextOptions<DocMgmtContext> options) : base(options)
        {
        }

        public DbSet<Models.Customer> Customers { get; set; } = null!;
        public DbSet<Models.Document> Documents { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
               .HasMany(e => e.Documents)
               .WithOne()
               .HasForeignKey(e => e.CustomerId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Models.Document>()
               .HasOne<Customer>()
               .WithMany(e => e.Documents)
               .HasForeignKey(e => e.CustomerId)
               .IsRequired();
        }
    }
}
