﻿using MediatR;

namespace ArgonFetch.Application.Queries
{
    public class ProxyResourceQuery : IRequest<string>
    {
        public string Url { get; set; }

        public ProxyResourceQuery(string url)
        {
            Url = url;
        }
    }

    public class ProxyResourceQueryHandler : IRequestHandler<ProxyResourceQuery, string>
    {
        private readonly HttpClient _httpClient;

        public ProxyResourceQueryHandler(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> Handle(ProxyResourceQuery request, CancellationToken cancellationToken)
        {
            try
            {
                var response = await _httpClient.GetAsync(request.Url, cancellationToken);
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsStringAsync(cancellationToken);
            }
            catch (HttpRequestException ex)
            {
                throw new ApplicationException($"Failed to fetch resource from {request.Url}", ex);
            }
        }
    }
}
