using System;
using System.ComponentModel.DataAnnotations;

namespace meetPeople.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }        
        [Required]
        [StringLength(8, MinimumLength= 4,ErrorMessage="You must specify password between 4 and 8 charactars")]
        public string Password { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}