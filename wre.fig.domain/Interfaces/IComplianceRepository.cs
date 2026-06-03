using Wre.Fig.Domain.Models;

namespace Wre.Fig.Domain.Interfaces;

public interface IComplianceRepository
{
    Task<List<ComplianceRowDto>> GetAsync(int year, int month);
}
