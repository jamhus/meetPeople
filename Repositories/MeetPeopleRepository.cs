using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using meetPeople.Data;
using meetPeople.Helpers;
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

        public async Task<Like> GetLike(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(l=> l.LikerId == userId && l.LikeeId == recipientId); 
        }

        public async Task<Photo> GetMainPhoto(int id)
        {
            return await _context.Photos.Where(x=>x.UserId == id && x.IsMain == true).FirstOrDefaultAsync();
        }

        public async Task<Photo> GetPhoto(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(x=>x.Id == id);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.Users.Include(p=> p.Photos).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users =  _context.Users.Include(p=> p.Photos).OrderByDescending(user=> user.LastActive).AsQueryable();

            users = users.Where(user => user.Id != userParams.UserId);

            if(userParams.Gender != "both") {
                users = users.Where(user => user.Gender == userParams.Gender);
            }

            if(userParams.Likers) {
                var userLikers = await GetUserLikes(userParams.UserId,userParams.Likers);
                users = users.Where(u=> userLikers.Contains(u.Id));
            }

            if(userParams.Likees) {
                var userLikees = await GetUserLikes(userParams.UserId,userParams.Likers);
                users = users.Where(u=> userLikees.Contains(u.Id));
            }

            if(userParams.MinAge != 18 || userParams.MaxAge != 99){
                var minDateOfBirth = DateTime.Today.AddYears(-userParams.MaxAge-1);
                var maxDateOfBirth = DateTime.Today.AddYears(-userParams.MinAge);

                users = users.Where(user=> user.DateOfBirth >= minDateOfBirth && user.DateOfBirth <=maxDateOfBirth);
            }

            if(!string.IsNullOrEmpty(userParams.OrderBy)){
                switch(userParams.OrderBy)
                {
                    case "created" :
                        users = users.OrderByDescending(user=>user.Created);
                        break;
                    default:
                        users = users.OrderByDescending(user => user.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users,userParams.PageNumber,userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers) {
            var user = await _context.Users.Include(u=> u.Likers).Include(u => u.Likees).FirstOrDefaultAsync(u=>u.Id == id);
            if(likers){
                return user.Likers.Where(u=>u.LikeeId == id).Select(i=>i.LikerId);
            }
            else {
                return user.Likees.Where(u=>u.LikerId == id).Select(i=>i.LikeeId);
            }
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id ==id);
        }

        public Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
            .Include(u=>u.Sender).ThenInclude(u=>u.Photos)
            .Include(u=>u.Recipient).ThenInclude(u=>u.Photos)
            .AsQueryable();

            switch(messageParams.MessageContainer){
                case "Inbox":
                    messages = messages.Where(u=>u.RecipientId==messageParams.UserId && u.RecipientDeleted == false);
                break;
                case "Outbox":
                    messages = messages.Where(u=>u.SenderId==messageParams.UserId && u.SenderDeleted == false);
                break;
                default:
                    messages = messages.Where(u=>u.RecipientId == messageParams.UserId && u.IsRead == false && u.RecipientDeleted == false);
                break;
            }

            messages = messages.OrderByDescending(d=> d.DateSent);
            return PagedList<Message>.CreateAsync(messages,messageParams.PageNumber,messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
            .Include(u=>u.Sender).ThenInclude(u=>u.Photos)
            .Include(u=>u.Recipient).ThenInclude(u=>u.Photos)
            .Where(u=> u.RecipientId == userId && u.RecipientDeleted == false
            && u.SenderId == recipientId 
            || u.RecipientId == recipientId  && u.SenderId == userId && u.SenderDeleted == false).OrderByDescending(u=>u.DateSent).ToListAsync();

            return messages;
        }
    }
} 