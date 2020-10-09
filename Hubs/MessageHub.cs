using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using meetPeople.Dtos;
using meetPeople.Models;
using Microsoft.AspNetCore.SignalR;

namespace meetPeople.Hubs
{
    public class LogedInUser {
        public string ConnectionId { get; set; }
        public int UserId { get; set; }
    }
    
    public class MessageHub : Hub
    {
        public static List<LogedInUser> Users = new List<LogedInUser>(); 
        public Task SendMessageToUser(string connectionId , object message) {
            return Clients.Client(connectionId).SendAsync("SendMessageToUser",message);
        }

        public void SendUserList(string dicsonnectedId ="") {
            if(dicsonnectedId==""){
              Clients.All.SendAsync("SendUserList",Users);
            }
            Clients.AllExcept(dicsonnectedId).SendAsync("SendUserList",Users);
        }
        public Task SayImLogedIn(int userId) {
            var user = Users.Where(x=>x.UserId == userId).FirstOrDefault();
            if (user != null) {
                Users.Remove(user);
            }
            Users.Add(new LogedInUser {
                UserId = userId,
                ConnectionId = Context.ConnectionId
            });
            SendUserList("");
            return Task.CompletedTask;
        }
        public Task SayImLogedOut(string connectionId) {
            var user = Users.Where(x=>x.ConnectionId == connectionId).FirstOrDefault();
            Users.Remove(user);
            SendUserList(connectionId);
            return Task.CompletedTask;
        }
        public override async Task OnConnectedAsync(){
            await Clients.All.SendAsync("UserConnected",Context.ConnectionId);
            SendUserList("");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception ex){
            
            var Index = Users.FindIndex(x=>x.ConnectionId == Context.ConnectionId);
            
            if (Index!=-1) {
                Users.RemoveAt(Index);
            }
            
            SendUserList("");

            await Clients.All.SendAsync("UserDisConnected",Context.ConnectionId);

            await base.OnDisconnectedAsync(ex);
        }
        
    }
}