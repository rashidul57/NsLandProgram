
// https://www.c-sharpcorner.com/article/crud-operations-using-asp-net-core-web-api-and-reactjs/
//b1754c14-d296-4b0f-a09a-030017f4461f
$ Add-Migration InitializeDb
$ Remove-Migration
$ Update-Database MyInitialMigration [Revert]
$ Update-Database
$ Get-Migration

Server=localhost\\sqlexpress;database=DocumentMgmt;Integrated Security=True;MultipleActiveResultSets=True;TrustServerCertificate=True;


Server=host.docker.internal\\SQLEXPRESS;Initial Catalog=DocumentMgmt;User Id=rashid;password=123;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true;MultipleActiveResultSets=true;

https://medium.com/@varunkukade999/javascript-data-encoding-and-decoding-techniques-buffers-byte-arrays-dataview-binary-219d55b535a2


Sql-Injection:
- Since c# is fully typed language and we are using .net core 8, everything is object but no raw query.
- In LINQ all queries are parameter driven, so no string interpolation and no chances to tresspass.
- Framework construct blocks melicious data by type checking. For example: Guid

XSS:
- Added a middleware that sanitizes the inputs in the server
- Avoided script injection by innerHTML, instead we made parameter based tags dynamically for example in DocumentViewer.
- use textContent instead of innerHTML


CSP(Content Security Policy):
https://medium.com/@dayanandthombare/avoiding-cross-site-scripting-xss-attacks-in-c-and-net-core-f2682c547af9
Added in program.cs