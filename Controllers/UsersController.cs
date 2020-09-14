using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using meetPeople.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using meetPeople.Models;

namespace meetPeople.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IMeetPeopleRepository _repo;
        public UsersController(IMeetPeopleRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
            
            var users= await _repo.GetUsers();
            
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _repo.GetUser(id);
            return Ok(user);
        }
    }
}