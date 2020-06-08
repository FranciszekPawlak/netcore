using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Per
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
            .HasData(
                new Value { Id = 1, Name = "Value 111" },
                new Value { Id = 2, Name = "Value 222" },
                new Value { Id = 3, Name = "Value 333" },
                new Value { Id = 4, Name = "Value 444" }
            );
        }
    }
}
