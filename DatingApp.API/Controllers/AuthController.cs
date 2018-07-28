using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data.Repos;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public AuthController(IAuthRepository repo,IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegister)
        {
            userForRegister.Username=userForRegister.Username.ToLower();
            if(await _repo.IsUserExists(userForRegister.Username))
                return BadRequest("This user is already exists");

            var createdUser = _repo.RegisterUser(new Models.User(){Username=userForRegister.Username},userForRegister.Password);

            return StatusCode((int)HttpStatusCode.Created);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {  
            var userFromRepo = await _repo.Login(userForLoginDto.Username,userForLoginDto.Password);
            if(userFromRepo == null)
                return Unauthorized();
            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier , userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)
            };

            var key= new SymmetricSecurityKey(System.Text.Encoding
                    .UTF8.GetBytes(_config.GetSection("AppSettings:Token").Value));
            
            var credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor(){
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new {
                token=tokenHandler.WriteToken(token)
            });
        }
    }
}