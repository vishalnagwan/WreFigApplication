namespace WRE.Cloud.Fig.Domain;

/// <summary>
/// Strongly-typed configuration binding for appsettings.json sections.
/// Register via: services.Configure&lt;FigSettings&gt;(configuration.GetSection("App"));
/// </summary>
public class FigSettings
{
    public string Title     { get; set; } = string.Empty;
    public string FullTitle { get; set; } = string.Empty;
}

public class JwtSettings
{
    public string Key         { get; set; } = string.Empty;
    public string Issuer      { get; set; } = string.Empty;
    public string Audience    { get; set; } = string.Empty;
    public int    ExpiryHours { get; set; } = 8;
}

public class PagingSettings
{
    public int DefaultPageSize { get; set; } = 10;
}

public class NotificationSettings
{
    public double ComplianceThresholdPct { get; set; } = 75.0;
    public int    DailyCheckHourUtc      { get; set; } = 8;
}
