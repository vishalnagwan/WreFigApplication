using Wre.Fig.Api.DTOs;
using Wre.Fig.Api.Repository.Interfaces;
using Wre.Fig.Api.Services.Interfaces;

namespace Wre.Fig.Api.Services;

public class FeedbackService(IFeedbackRepository repo) : IFeedbackService
{
    public Task AddAsync(CreateFeedbackDto dto, string userId, string userName)
        => repo.AddAsync(dto, userId, userName);

    public Task<List<FeedbackItemDto>> GetByPageAsync(string page)
        => repo.GetByPageAsync(page);

    public Task<List<FeedbackItemDto>> GetAllAsync()
        => repo.GetAllAsync();

    public Task<bool> ToggleImplementedAsync(int id)
        => repo.ToggleImplementedAsync(id);
}
