namespace WRE.Cloud.Fig.Domain.Models;

public class LoginRequestDto
{
    public string Email    { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class LoginResponseDto
{
    public string   Token     { get; set; } = string.Empty;
    public string   UserId    { get; set; } = string.Empty;
    public string   FullName  { get; set; } = string.Empty;
    public string   Email     { get; set; } = string.Empty;
    public string   Role      { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}

// MSAL: Angular sends this after getting an Azure access token
public class MicrosoftLoginRequestDto
{
    public string AccessToken { get; set; } = string.Empty;
}