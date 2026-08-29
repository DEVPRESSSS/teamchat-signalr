\# TeamChat



A real-time team chat application built with \*\*React\*\* and \*\*ASP.NET Core\*\*. This project is primarily designed as a hands-on learning project for building modern full-stack applications and implementing real-time communication with SignalR.



\## 🚀 Tech Stack



\### Frontend



\* React

\* JavaScript

\* Vite

\* Axios



\### Backend



\* ASP.NET Core Web API

\* Entity Framework Core

\* SignalR



\### Database



\* SQL Server



\## 🎯 Project Goals



The goal of TeamChat is to practice building a full-stack application while learning:



\* RESTful APIs

\* React frontend development

\* ASP.NET Core Web API

\* Entity Framework Core

\* SQL Server

\* Real-time communication with SignalR

\* Real-time notifications

\* Authentication and authorization

\* Git and GitHub workflow



\## ✨ Planned Features



\* \[ ] View messages

\* \[ ] Send messages

\* \[ ] Store messages in SQL Server

\* \[ ] Real-time messaging with SignalR

\* \[ ] User authentication

\* \[ ] Chat rooms

\* \[ ] Real-time notifications

\* \[ ] Unread message count

\* \[ ] Online/offline user status

\* \[ ] Message timestamps

\* \[ ] Message deletion



\## 📁 Project Structure



```text

team-chat/

│

├── team-chat.Server/

│   ├── Controllers/

│   ├── Hubs/

│   ├── Models/

│   ├── Data/

│   └── Program.cs

│

├── team-chat.client/

│   ├── src/

│   ├── public/

│   └── package.json

│

├── .gitignore

└── team-chat.slnx

```



\## 🔄 Application Flow



The basic messaging flow will be:



```text

React

&#x20; │

&#x20; │ HTTP Request

&#x20; ▼

ASP.NET Core Web API

&#x20; │

&#x20; ▼

Entity Framework Core

&#x20; │

&#x20; ▼

SQL Server

```



For real-time messaging:



```text

User A

&#x20; │

&#x20; │ Send Message

&#x20; ▼

SignalR Hub

&#x20; │

&#x20; ├──────────► User B

&#x20; ├──────────► User C

&#x20; └──────────► User D

```



\## 🛠️ Getting Started



\### Clone the repository



```bash

git clone https://github.com/YOUR\_USERNAME/team-chat.git

cd team-chat

```



\### Run the backend



```bash

cd team-chat.Server

dotnet restore

dotnet run

```



\### Run the frontend



Open another terminal:



```bash

cd team-chat.client

npm install

npm run dev

```



The React development server will provide the frontend URL in the terminal.



\## 📌 Development Roadmap



\### Phase 1 — Basic Chat



\* Create message model

\* Configure database

\* Create message API

\* Build React chat interface

\* Connect React to ASP.NET Core



\### Phase 2 — Real-Time Chat



\* Create SignalR Hub

\* Connect React to SignalR

\* Broadcast new messages

\* Handle connection and reconnection



\### Phase 3 — Authentication



\* User registration/login

\* JWT authentication

\* Protected API endpoints



\### Phase 4 — Notifications



\* Real-time notifications

\* Unread message count

\* Mark notifications as read



\### Phase 5 — User Presence



\* Online/offline status

\* Active users

\* Connection management



\## 📚 Purpose



TeamChat is a personal learning project focused on understanding how \*\*React, ASP.NET Core, SQL Server, and SignalR\*\* work together to build a real-time full-stack application.



The project will be developed incrementally, starting with basic CRUD functionality and gradually introducing real-time communication and authentication.



