using WRE.Cloud.Fig.Domain.Models;

namespace WRE.Cloud.Fig.Domain.Interfaces;

public interface IComplianceRepository
{
    Task<List<ComplianceRowDto>> GetAsync(int year, int month);
}
