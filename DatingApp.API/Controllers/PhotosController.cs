using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using DatingApp.API.Data.Repos;
using DatingApp.API.Dtos;
using DatingApp.API.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using CloudinaryDotNet.Actions;
using DatingApp.API.Models;
using System.Linq;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("/api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IDatingRepository _datingRepo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinarySettings;
        private Cloudinary _cloudinary;

        public PhotosController(IDatingRepository datingRepo,
        IMapper mapper, IOptions<CloudinarySettings> cloudinarySettings)
        {
            _datingRepo = datingRepo;
            _mapper = mapper;
            _cloudinarySettings = cloudinarySettings;

            Account cloudinaryAccount = new Account(_cloudinarySettings.Value.CloudName,
            _cloudinarySettings.Value.ApiKey, _cloudinarySettings.Value.ApiSecret);

            _cloudinary = new Cloudinary(cloudinaryAccount);
        }

        [HttpGet("{photoId}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int photoId)
        {
            var photoFromRepo = await _datingRepo.GetPhoto(photoId);
            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhotoForUser(int userId, [FromForm]PhotoForUploadDto photo)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _datingRepo.GetUser(userId);
            var file = photo.PhotoFile;
            UploadResult uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500)
                                                           .Height(500)
                                                           .Crop("fill")
                                                           .Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }

            }
            photo.Url = uploadResult.Uri.ToString();
            photo.PublicId = uploadResult.PublicId;

            var dbPhoto = _mapper.Map<Photo>(photo);

            if (!userFromRepo.Photos.Any(p => p.IsMain))
                dbPhoto.IsMain = true;

            userFromRepo.Photos.Add(dbPhoto);
            if (await _datingRepo.SaveAll())
            {
                var photoToReturn = _mapper.Map<PhotoForReturnDto>(dbPhoto);
                return CreatedAtRoute("GetPhoto",new {photoId = dbPhoto.Id},photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }
    }

}