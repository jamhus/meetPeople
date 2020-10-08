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
using Microsoft.AspNetCore.SignalR;
using meetPeople.Hubs;

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
        private readonly IHubContext<MessageHub> _hub;
        public MessagesController(IMeetPeopleRepository repo, IMapper mapper, IHubContext<MessageHub> hub)
        {
            _hub = hub;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("{id}", Name = "GetMessage")]
        public async Task<IActionResult> GetMessage(int userId, int id)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
            {
                return NotFound();
            }
            return Ok(messageFromRepo);
        }
        [HttpGet]

        public async Task<IActionResult> GetMessagesForUser(int userId, [FromQuery] MessageParams messageParams)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            messageParams.UserId = userId;
            var messagesFromRepo = await _repo.GetMessagesForUser(messageParams);
            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            Response.AddPagination(messagesFromRepo.CurrentPage, messagesFromRepo.PageSize, messagesFromRepo.TotalCount, messagesFromRepo.TotalPages);

            return Ok(messages);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMessage(int userId, MessageForCreationDto messageForCreationDto)
        {

            var sender = await _repo.GetUser(userId);

            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            messageForCreationDto.SenderId = userId;
            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
            {
                return BadRequest("User not found");
            }

            var message = _mapper.Map<Message>(messageForCreationDto);

            _repo.Add<Message>(message);


            if (await _repo.SaveAll())
            {
                var messageToReturn = _mapper.Map<MessageToReturnDto>(message);
                if (messageForCreationDto.ConnectionId !=""){
                    await _hub.Clients.Client(messageForCreationDto.ConnectionId).SendAsync("SendMessageToUser",messageToReturn);
                }
                return CreatedAtRoute("GetMessage",
                new { userId, id = message.Id }, messageToReturn);
            }

            throw new Exception("Error while creating message");
        }

        [HttpGet("threads/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messagesFromRepo = await _repo.GetMessageThread(userId, recipientId);

            foreach (var message in messagesFromRepo)
            {
                if (message.IsRead != true)
                {
                    message.IsRead = true;
                    message.DateRead = DateTime.Now;
                    await _repo.SaveAll();
                }
            }

            var messagesThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messagesThread);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {

            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo.SenderId == userId)
            {
                messageFromRepo.SenderDeleted = true;
            }

            if (messageFromRepo.RecipientId == userId)
            {
                messageFromRepo.RecipientDeleted = true;
            }

            if (messageFromRepo.SenderDeleted && messageFromRepo.RecipientDeleted)
            {
                _repo.Delete(messageFromRepo);
            }

            if (await _repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception("Error while deleting message");

        }

    }

}