using Wre.Fig.Api.DTOs;

namespace Wre.Fig.Api.Repository.Interfaces;

public interface IComplianceRepository
{
    Task<List<ComplianceRowDto>> GetAsync(int year, int month);
}
