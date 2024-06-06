How to use
--------------------------------

Prerequisite:
- Sql Server: I have used MS Sql Server database to store data. So make sure you have installed sql server or have access in any remote server.
- MS Visual Studio 2022: As per the requirement, I have used Visual 2022 with Entity framework 8 for the development.

Folder structure:
This repository contains two folders as follows:
- DocMgmtApi: contains all backend code.
- DocMgmtUi: contains all frontend code.

For development, I have chosen microservices architecture, so the backend and frontend codes running completely independently and they have separate
solution files so that they can be run from visual studio itself.

DocMgmtApi (Backend)
----------
This folder contains two projects under one solution.
- DocMgmtApi: Web api project containing all apis.
- AppUnitTest: Project for unit tests of the web apis.

Steps to run backend (development mode):
- Please open the solution by using the file DocMgmtApi/DocMgmtApi.sln
- Please change the database connection string in appsettings.Development.json file.
- Now it needs to run the database migration scripts to make the database up to date.
For more information (https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-powershell)
Please open Package manager console and run the following command:
$ Update-Database
The output log should end with the text 'Done'.

- Run the web-api application in IIS express by clicking the green triangle at the top.
- It should open the swagger UI in the default browser and should show list of available APIs.
- To run the unit tests, we need to stop web-api. Then click "Test -> Run All Test" from the menu.
It should show the results.


DocMgmtUi(Frontend)
-------------------
- This is again a standalone application, so we need to open the application using the solution file(DocMgmtUi/DocMgmtUi.sln)
- Then simply run the application using the green triangle at the top toolbar and it should open the application in the default
  browser with blank dashboard, an empty table, and + customer button.


-------------------
Production Deployment:
To ease the deployment in production, I have added Dockerfile in both frontend and backend projects.
So, we can use those to build image and run the application in the container.



