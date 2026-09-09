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
                s.HasIndex(x => x.Id);

                s.HasIndex(u=>u.Email)
                    .IsUnique();
                s.Property(u => u.Email)
                     .HasMaxLength(50)
                    .IsRequired(true);

                s.Property(u => u.Name)
                    .IsRequired(true)
                    .HasMaxLength(50);

                s.HasOne(u => u.Role)
                    .WithMany(x => x.ApplicationUsers)
                    .HasForeignKey(x => x.RoleId)
                    .OnDelete(DeleteBehavior.Restrict);
                    

                s.Property(u => u.Description)
                    .HasMaxLength(100);

                s.Property(u => u.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(100);

                s.Property(u => u.CreatedAt)
                  .HasDefaultValueSql("GETDATE()") 
                  .IsRequired();

                s.Property(u => u.UpdatedAt)
                    .IsRequired(true);
            });
            #endregion

            #region--Messages table
            modelBuilder.Entity<Message>( m=>
            {
                m.HasIndex(m => m.UserId);
                m.Property(m => m.UserId)
                    .IsRequired(true);

                m.Property(m => m.Content)
                    .IsRequired(true);

                m.HasOne(m => m.User)
                    .WithMany(u => u.Messages)
                    .HasForeignKey(m => m.UserId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            #endregion

        }

    }
}
