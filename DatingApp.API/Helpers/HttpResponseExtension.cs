namespace Microsoft.AspNetCore.Http
{
    public static class HttpResponseExtension
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error",message);
            response.Headers.Add("Access-Control-Expose-Header","Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*");
        }
    }
}