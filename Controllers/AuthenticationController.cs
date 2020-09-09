using System.Threading.Tasks;
using meetPeople.Interfaces;
using meetPeople.Models;
using Microsoft.AspNetCore.Mvc;

namespace meetPeople.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        public AuthenticationController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("Register")]

        public async Task<IActionResult> Register(string username, string password) 
        {
            //validation phase yet to build

            username = username.ToLower();

            if(await _authRepo.UserExists(username)){
                return BadRequest("username already exists");
            }

            var user = new User 
            {
                Username = username
            };

            var createdUser = await _authRepo.Register(user, password);
            
            return StatusCode(201); //temporary solution
        }
    }
}