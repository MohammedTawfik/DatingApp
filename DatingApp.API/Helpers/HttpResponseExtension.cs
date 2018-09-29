using DatingApp.API.Helpers;
using Newtonsoft.Json;

namespace Microsoft.AspNetCore.Http
{
    public static class HttpResponseExtension
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Header", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPaginationHeader(this HttpResponse response,
         int totalPages, int totalCount, int pageSize, int currentPage)
        {
            PaginationHeader header = new PaginationHeader(currentPage, pageSize, totalCount, totalPages);
            string jsonHeader = JsonConvert.SerializeObject(header);
            response.Headers.Add("Pagination", jsonHeader);
            response.Headers.Add("Access-Control-Expose-Header", "Application-Error");
        }
    }
}