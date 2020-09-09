using System.Threading.Tasks;
using meetPeople.Dtos;
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

        [HttpPost("register")]

        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto) 
        {
            //validation phase yet to build

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if(await _authRepo.UserExists(userForRegisterDto.Username)){
                return BadRequest("username already exists");
            }

            var user = new User 
            {
                Username = userForRegisterDto.Username
            };

            var createdUser = await _authRepo.Register(user, userForRegisterDto.Password);
            
            return StatusCode(201); //temporary solution
        }
    }
}