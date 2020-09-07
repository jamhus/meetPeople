using System;
using System.Threading.Tasks;
using meetPeople.Data;
using meetPeople.Interfaces;
using meetPeople.Models;

namespace meetPeople.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public Task<User> Login(string username, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<User> Register(User user, string password)
        {
             byte[] passwordHash, passwordSalt;
            
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            
            user.PasoowrdHash = passwordHash;
            user.PasoowrdSalt = passwordSalt;
            
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            
            return user;

        }

        public Task<bool> UserExists(string username)
        {
            throw new NotImplementedException();
        }


         /***** Methods *****/

         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }


        }
    }
}

