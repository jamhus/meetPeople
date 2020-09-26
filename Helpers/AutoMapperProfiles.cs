using System.Linq;
using AutoMapper;
using meetPeople.Dtos;
using meetPeople.Models;

namespace meetPeople.Helpers
{
    public class AutoMapperProfiles :Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt=>
                     opt.MapFrom(src=>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest=>dest.Age,opt=>
                    opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));

            CreateMap<User,UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt=>
                     opt.MapFrom(src=>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest=>dest.Age,opt=>
                    opt.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            
            CreateMap<UserforUpdateDto,User>();
            
            CreateMap<Photo,PhotoForDetailedDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<Photo,PhotoForReturnDto>();
            

            CreateMap<MessageForCreationDto,Message>();
            CreateMap<Message,MessageForCreationDto>();
            CreateMap<Message,MessageToReturnDto>()
              .ForMember(dest => dest.SenderPhotoUrl, opt=> opt.MapFrom(src=>src.Sender.Photos.FirstOrDefault(x=>x.IsMain).Url))
              .ForMember(dest => dest.RecipientPhotoUrl, opt=> opt.MapFrom(src=>src.Recipient.Photos.FirstOrDefault(x=>x.IsMain).Url));

        }
    }
}