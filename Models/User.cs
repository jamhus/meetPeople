namespace meetPeople.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }

        public byte[] PasoowrdHash { get; set; }
        public byte[] PasoowrdSalt{ get; set; }
    }
}