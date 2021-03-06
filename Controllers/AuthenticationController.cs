using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using meetPeople.Dtos;
using meetPeople.Hubs;
using meetPeople.Interfaces;
using meetPeople.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace meetPeople.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IConfiguration _config;
        private readonly IHubContext<MessageHub> _hubContext;
        public AuthenticationController(IAuthRepository authRepo, IConfiguration config, IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;
            _config = config;
            _authRepo = authRepo;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _authRepo.UserExists(userForRegisterDto.Username))
            {
                throw new Exception("Username is used");
            }

            var user = new User
            {
                Username = userForRegisterDto.Username,
                Created = DateTime.Now,
                City = userForRegisterDto.City,
                KnownAs = userForRegisterDto.Username,
                Country = userForRegisterDto.Country,
                Gender = userForRegisterDto.Gender,
                DateOfBirth = userForRegisterDto.DateOfBirth
            };

            var createdUser = await _authRepo.Register(user, userForRegisterDto.Password);

            return StatusCode(201); 

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _authRepo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null) return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name , userFromRepo.Username.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));

            // use the key as part of the signing credentials increpted
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // token descriptor that hold the claims and other values that can be provided in the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token), userId = userFromRepo.Id });

        }

        [AllowAnonymous]
        [HttpGet("logout/{connectionId}")]
        public async Task<IActionResult> Logout(string connectionId)
        {
            await _hubContext.Clients.All.SendAsync("UserOffline",connectionId);
            return Ok();

        }
    }
}