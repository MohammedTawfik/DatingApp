namespace System
{
    public static class DateTimeExtension
    {
        public static int CalculateAge(this DateTime dateParamter)
        {
            int age = DateTime.Now.Year - dateParamter.Year;
            if (dateParamter.AddYears(age) > DateTime.Today)
                age--;

            return age;    
        }
    }
}