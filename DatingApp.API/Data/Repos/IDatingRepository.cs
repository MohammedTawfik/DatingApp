using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helpers;
using DatingApp.API.Models;

namespace DatingApp.API.Data.Repos
{
    public interface IDatingRepository
    {
         void Add<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class;
         Task<bool> SaveAll();
         Task<User> GetUser(int userId);
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<Photo> GetPhoto(int photoId);
        Task<Photo> GetUserMainPhoto(int userId);
        Task<Like> Like(int userId , int recipientId);
    }
}