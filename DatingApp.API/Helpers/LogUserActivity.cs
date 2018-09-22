using System;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data.Repos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace DatingApp.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            int userId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var repo = resultContext.HttpContext.RequestServices.GetService<IDatingRepository>();
            User currentUser = await repo.GetUser(userId);
            currentUser.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}