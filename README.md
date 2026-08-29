# TeamChat

A real-time team chat application built with React and ASP.NET Core.

TeamChat is a hands-on full-stack learning project focused on building RESTful APIs, integrating a React frontend with an ASP.NET Core backend, working with SQL Server, and implementing real-time communication using SignalR.

## Tech Stack

### Frontend

- React
- JavaScript
- Vite
- Axios

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- SignalR

### Database

- SQL Server

### Development Tools

- Visual Studio
- Visual Studio Code
- Git
- GitHub
- Swagger / OpenAPI

## Project Goals

The main goal of TeamChat is to practice building a complete full-stack application while learning:

- RESTful API development
- React frontend development
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Database migrations
- Real-time communication with SignalR
- Real-time notifications
- Authentication and authorization
- Client-server communication
- Git and GitHub workflows

## Features

### Current Features

- [ ] Project setup
- [ ] Basic React frontend
- [ ] ASP.NET Core Web API
- [ ] Database configuration

### Planned Features

- [ ] Send messages
- [ ] View messages
- [ ] Store messages in SQL Server
- [ ] Edit messages
- [ ] Delete messages
- [ ] Real-time messaging with SignalR
- [ ] User authentication
- [ ] User authorization
- [ ] Chat rooms
- [ ] Real-time notifications
- [ ] Unread message counter
- [ ] Online/offline user status
- [ ] Message timestamps
- [ ] Message history
- [ ] Reconnection handling

## Project Structure

```text
team-chat/
│
├── .gitignore
├── README.md
├── team-chat.slnx
│
├── team-chat.Server/
│   ├── Controllers/
│   ├── Data/
│   ├── Hubs/
│   ├── Models/
│   ├── Properties/
│   ├── Program.cs
│   ├── appsettings.json
│   └── team-chat.Server.csproj
│
└── team-chat.client/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    ├── vite.config.js
    └── team-chat.client.esproj