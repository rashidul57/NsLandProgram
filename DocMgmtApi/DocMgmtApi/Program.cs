using DocMgmtApi.Data;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using XSSMiddleware;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllers();

string policy = "docsmgmtapi";

builder.Services.AddCors(p => p.AddPolicy(policy, corsBuilder =>
{
    string clientAppOrigin = builder.Configuration.GetValue<string>("ClientAppOrigin");
    corsBuilder.WithOrigins(clientAppOrigin).AllowAnyMethod().AllowAnyHeader();
}));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DocMgmtContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnection")));

var app = builder.Build();
app.UseCors(policy);

app.Use(async (context, next) =>
{
    // increase upload size
    context.Features.Get<IHttpMaxRequestBodySizeFeature>().MaxRequestBodySize = 100_000_000;

    // Content Security Policy (CSP)
    string cdnSource = builder.Configuration.GetValue<string>("CdnSource");
    context.Response.Headers.Add("Content-Security-Policy", $"default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' {cdnSource}");
    await next();
});


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.PreventXssAttacks();

app.Run();



