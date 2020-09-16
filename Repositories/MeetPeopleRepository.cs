using System.Collections.Generic;
using System.Threading.Tasks;
using meetPeople.Data;
using meetPeople.Interfaces;
using meetPeople.Models;
using Microsoft.EntityFrameworkCore;

namespace meetPeople.Repositories
{
    public class MeetPeopleRepository : IMeetPeopleRepository

    {
        private readonly DataContext _context;

        public MeetPeopleRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p=> p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.Include(p=> p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}