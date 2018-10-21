using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data.Repos
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;

        public DatingRepository(DataContext context)
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

        public async Task<Photo> GetPhoto(int photoId)
        {
            return await _context.Photos.FirstOrDefaultAsync(photo => photo.Id == photoId);
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.Include(u => u.Photos).FirstOrDefaultAsync(u => u.Id == userId);
            return user;
        }

        public async Task<Photo> GetUserMainPhoto(int userId)
        {
            return await _context.Photos.FirstOrDefaultAsync(photo => photo.UserId == userId && photo.IsMain);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u => u.Photos).OrderByDescending(u => u.LastActive).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Liker)
            {
                var userLikers = await GetUserLikes(userParams.UserId, true);
                users = users.Where(u => userLikers.Contains(u.Id));
            }
            if (userParams.Likee)
            {
                var userLikees = await GetUserLikes(userParams.UserId, false);
                users = users.Where(u => userLikees.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                DateTime minDateOfBirth = DateTime.Now.AddYears(-userParams.MaxAge - 1);
                DateTime maxDateOfBirth = DateTime.Now.AddYears(-userParams.MinAge - 1);
                users = users.Where(u => u.DateOfBirth >= minDateOfBirth && u.DateOfBirth <= maxDateOfBirth);
            }
            if (!String.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.CreationDate);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        private async Task<IEnumerable<int>> GetUserLikes(int userId, bool likers)
        {
            var currentUser = await _context.Users
            .Include(u => u.Likees)
            .Include(u => u.Likers)
            .FirstOrDefaultAsync(u => u.Id == userId);

            if (likers)
            {
                return currentUser.Likers.Select(u => u.LikerId);
            }
            else
            {
                return currentUser.Likees.Select(u => u.LikeeId);
            }
        }
        public async Task<Like> Like(int userId, int recipientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(like => like.LikerId == userId && like.LikeeId == recipientId);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}