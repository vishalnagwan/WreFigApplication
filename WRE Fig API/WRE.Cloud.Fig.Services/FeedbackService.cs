using WRE.Cloud.Fig.Domain.Models;
using WRE.Cloud.Fig.Domain.Interfaces;

namespace WRE.Cloud.Fig.Services;

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
