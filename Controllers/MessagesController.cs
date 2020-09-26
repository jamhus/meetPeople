using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using meetPeople.Models;
using Microsoft.AspNetCore.Authorization;
using meetPeople.Helpers;
using AutoMapper;
using System.Security.Claims;
using meetPeople.Interfaces;
using meetPeople.Dtos;

namespace meetPeople.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly IMeetPeopleRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(IMeetPeopleRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}",Name="GetMessage")]
        public async Task<IActionResult> GetMessage(int userId,int id){

            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(id);

            if(messageFromRepo==null){
                return NotFound();
            }
            return Ok(messageFromRepo);
        }
        [HttpGet]

        public async Task<IActionResult> GetMessagesForUser(int userId,[FromQuery]MessageParams messageParams){
            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }
            messageParams.UserId = userId;
            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);
            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage,messagesFromRepo.PageSize,messagesFromRepo.TotalCount,messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId,MessageForCreationDto messageForCreationDto){
            
            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }
            
            messageForCreationDto.SenderId= userId;
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if(recipient ==null){
                return BadRequest("User not found");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add<Message>(message);

            var messageToReturn = _mapper.Map<MessageForCreationDto>(message);
            
            if(await _repo.SaveAll()){
                return CreatedAtRoute("GetMessage",
                new {userId,id = message.Id},messageToReturn);
            }

            throw new Exception("Error while creating message");
        }

        
    }
}