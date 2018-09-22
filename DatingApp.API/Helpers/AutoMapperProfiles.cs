using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using System;
using System.Linq;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForDetailedDto>()
            .ForMember(dest=> dest.Age ,opt=>{
                opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());
            })
            .ForMember(dest=>dest.PhotoUrl,opt=>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
            });
            CreateMap<User,UserForListDto>()
            .ForMember(dest=> dest.Age ,opt=>{
                opt.ResolveUsing(src=>src.DateOfBirth.CalculateAge());
            })
            .ForMember(dest=>dest.PhotoUrl,opt=>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
            });
            CreateMap<UserForUpdateDto,User>();
            CreateMap<UserForRegisterDto,User>();
            CreateMap<Photo,PhotoForDetailedDto>();
            CreateMap<PhotoForUploadDto,Photo>();
            CreateMap<Photo,PhotoForReturnDto>();
        }
    }
}