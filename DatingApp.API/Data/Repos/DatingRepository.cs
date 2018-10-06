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
            return await _context.Photos.FirstOrDefaultAsync(photo=>photo.Id == photoId);
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await _context.Users.Include(u=>u.Photos).FirstOrDefaultAsync(u=>u.Id==userId);
            return user;
        }

        public async Task<Photo> GetUserMainPhoto(int userId)
        {
            return await _context.Photos.FirstOrDefaultAsync(photo => photo.UserId == userId && photo.IsMain);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.Include(u=>u.Photos).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);
            if(userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                DateTime minDateOfBirth = DateTime.Now.AddYears(-userParams.MaxAge - 1);
                DateTime maxDateOfBirth = DateTime.Now.AddYears(-userParams.MinAge - 1);
                users = users.Where(u => u.DateOfBirth >= minDateOfBirth && u.DateOfBirth <= maxDateOfBirth);
            }
            return await PagedList<User>.CreateAsync(users, userParams.PageNumber , userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}