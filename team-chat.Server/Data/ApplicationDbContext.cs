using Microsoft.EntityFrameworkCore;
using team_chat.Server.Model;

namespace team_chat.Server.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options)
        {
            
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            #region--ApplicationUser table
            modelBuilder.Entity<ApplicationUser>(s =>
            {
                s.HasIndex(x => x.Id)
                    .IsUnique();

                s.HasIndex(u=>u.Email)
                    .IsUnique();
                s.Property(u => u.Email)
                    .IsRequired();

                s.Property(u => u.Description)
                    .HasMaxLength(100);

                s.Property(u => u.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(30);

                s.Property(u => u.CreatedAt)
                  .HasDefaultValueSql("CURRENT_DATE") 
                  .IsRequired();

                s.Property(u => u.UpdatedAt)
                    .IsRequired();
            });
            #endregion

        }

    }
}
