using meetPeople.Models;
using Microsoft.EntityFrameworkCore;

namespace meetPeople.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) { }
        public DbSet<Value> Values { get; set; }
    }
}