using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IFeedbackRepository
{
    Task AddAsync(CreateFeedbackDto dto, string userId, string userName);
    Task<List<FeedbackItemDto>> GetByPageAsync(string page);
    Task<List<FeedbackItemDto>> GetAllAsync();
    Task<bool> ToggleImplementedAsync(int id);
}
