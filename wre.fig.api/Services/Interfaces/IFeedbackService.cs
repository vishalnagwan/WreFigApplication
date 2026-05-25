using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Services.Interfaces;

public interface IFeedbackService
{
    Task AddAsync(CreateFeedbackDto dto, string userId, string userName);
    Task<List<FeedbackItemDto>> GetByPageAsync(string page);
    Task<List<FeedbackItemDto>> GetAllAsync();
    Task<bool> ToggleImplementedAsync(int id);
}
