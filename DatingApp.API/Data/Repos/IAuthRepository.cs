using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data.Repos
{
    public interface IAuthRepository
    {
         Task<User> RegisterUser(User user , string password);

         Task<User> Login(string username , string password);

         Task<bool> IsUserExists(string username);
    }
}