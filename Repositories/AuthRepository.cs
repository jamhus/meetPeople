using System;
using System.Threading.Tasks;
using meetPeople.Data;
using meetPeople.Interfaces;
using meetPeople.Models;
using Microsoft.EntityFrameworkCore;

namespace meetPeople.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=> x.Username == username);

            if (user == null) return null;

            if(!VerifyPasswordHash(password, user.PasoowrdHash, user.PasoowrdSalt)) return null;

            return user;
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

        public async Task<bool> UserExists(string username)
        {
           return await _context.Users.AnyAsync (x=> x.Username == username);
        }


         /***** Methods *****/

         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

         private bool VerifyPasswordHash(string password, byte[] pasoowrdHash, byte[] pasoowrdSalt)
            
            {using(var hmac = new System.Security.Cryptography.HMACSHA512(pasoowrdSalt)){
               
               var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

               for( int i = 0; i< computedHash.Length; i++) {
                   if (computedHash[i] != pasoowrdHash[i]) return false;
               }

            }
            return true; 
        }

    }
}

