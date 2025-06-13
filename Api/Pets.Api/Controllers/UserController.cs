using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Pets.Api.Controllers;

[ApiController]
[Route("/")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(UserManager<ApplicationUser> userManager) {
        _userManager = userManager;
    }

    [HttpGet("/me")]
    public async Task<UserDTO?> GetCurrentUser()
    {
        string? email = User.FindFirstValue(ClaimTypes.Email);
        if (email == null) return null;
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null) return null;
        UserDTO userDTO = new()
        {
            UserName = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName
        };
        return userDTO;
    }

    [HttpPost("/logout")]
    public async Task<IResult> Logout(SignInManager<ApplicationUser> signInManager, [FromBody] object empty)
    {
        if (empty != null)
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }
        return Results.Unauthorized();
    }
}