using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using meetPeople.Dtos;
using meetPeople.Helpers;
using meetPeople.Interfaces;
using meetPeople.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace meetPeople.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/users/{userId}/photos")]
    public class PhotosController : ControllerBase
    {
        private Cloudinary _cloudinary;
        private readonly IMapper _mapper;
        private readonly IMeetPeopleRepository _repo;
        private readonly IOptions<CloudinarySettings> _options;
        public PhotosController(IMeetPeopleRepository repo, IMapper mapper, IOptions<CloudinarySettings> options)
        {
            _options = options;
            _mapper = mapper;
            _repo = repo;

            Account acc =  new Account(
                 _options.Value.CloudName,
                 _options.Value.ApiKey,
                 _options.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}",Name="GetPhoto")]

        public async Task<IActionResult> GetPhoto (int id) {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photo);
        }

        [HttpPost]
        public async Task<IActionResult> UploadPhoto (int userId, PhotoForCreationDto photoForCreation) {
                
            if(userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetUser(userId);

            var file = photoForCreation.File;

            var uploadresult = new ImageUploadResult ();

            if (file.Length >0) {
                using(var stream= file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation =   new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadresult = _cloudinary.Upload(uploadParams);
                }
            }
            photoForCreation.Url = uploadresult.Url.ToString();
            photoForCreation.PublicId = uploadresult.PublicId;
            var photo = _mapper.Map<Photo>(photoForCreation);

            if(!userFromRepo.Photos.Any(x=>x.IsMain))
            {
                 photo.IsMain = true;
            }

            userFromRepo.Photos.Add(photo);


            if(await _repo.SaveAll())
            {
                var photoToReturn =  _mapper.Map<PhotoForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto",new {userId = userId, id = photo.Id},photoToReturn);
            }

            return BadRequest("Upload failed");
        }
        
    }
}