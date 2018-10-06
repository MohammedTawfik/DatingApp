using DatingApp.API.Helpers;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Microsoft.AspNetCore.Http
{
    public static class HttpResponseExtension
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static void AddPaginationHeader(this HttpResponse response,
         int totalPages, int totalCount, int pageSize, int currentPage)
        {
            PaginationHeader header = new PaginationHeader(currentPage, pageSize, totalCount, totalPages);
            var camelCaseFormatter = new JsonSerializerSettings();
            camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            string jsonHeader = JsonConvert.SerializeObject(header,camelCaseFormatter);
            response.Headers.Add("Pagination", jsonHeader);
            response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}