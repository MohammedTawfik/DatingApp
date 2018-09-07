using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Dtos
{
    public class PhotoForUploadDto
    {
        public string Url { get; set; }

        public IFormFile PhotoFile { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }

        public PhotoForUploadDto()
        {
            DateAdded=DateTime.Now;
        }
    }
}