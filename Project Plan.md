# Project Plan for 

Along with a **project structure** using **Nx Monorepo**.

### **Project Plan**

#### **Project Overview**
This project is a robust user management system with RAG capabilities, where users can upload PDFs and query them using advanced document search and question-answering techniques. The system incorporates modern security features, role-based access control (RBAC), and pagination.

#### **Objective**
- Develop a user management system with authentication and role-based authorization (Admin, Employee, Supervisor).
- Implement PDF upload and querying using RAG techniques (combining embeddings and document search).
- Implement token-based authentication (JWT) with token rotation, cookies management, and error handling.

---

### **Timeline**

#### **Phase 1: Project Initialization (1 week)**
- **Setup Nx Monorepo** with NestJS.
- **Docker Compose Setup** for PostgreSQL, Redis, and Meilisearch.
- Install **SonarCloud** for CI/CD and code quality.
- Initialize **GitHub repository** and project structure.

**Tasks:**
- Set up Nx workspace with NestJS backend and modules.
- Set up Docker containers for PostgreSQL, Redis, and Meilisearch.
- Integrate SonarCloud for code quality and analysis.

#### **Phase 2: Authentication & User Management (2 weeks)**
- Implement **JWT Authentication**.
- Create the **User** and **Role** models.
- Implement **role-based access control (RBAC)** for Admin, Employee, Supervisor.
- Implement **password reset** functionality and ensure a new user must change their password on first login.
- Implement **Refresh Token rotation** with Redis.

**Tasks:**
- Design User and Role entities with relationships.
- Implement authentication module and JWT strategies.
- Implement password reset functionality with email.
- Role-based authorization for routes and services.

#### **Phase 3: PDF Upload and Querying (3 weeks)**
- Set up **Meilisearch** and **pgvector** for document search.
- Implement **PDF upload** functionality (with file validation).
- Implement **RAG technique** for question answering based on PDF content.
- Build and integrate API for querying PDFs.

**Tasks:**
- Set up Meilisearch for fast document searching.
- Implement PDF parsing and embedding storage in PostgreSQL using pgvector.
- Integrate OpenAI API or custom LLM for question answering.
- Build PDF querying API that utilizes RAG techniques.

#### **Phase 4: Security & Error Handling (2 weeks)**
- Implement **CORS** and **Helmet** for security.
- Use **express-sanitizer** for input sanitization.
- Implement **custom decorators** for centralized error handling.
- Implement **Cookie management** for secure cookie storage.

**Tasks:**
- Set up middleware for CORS and Helmet.
- Use express-sanitizer for input sanitization.
- Implement a custom decorator to handle errors and log them.
- Create a CookieService for secure cookie management.

#### **Phase 5: Code Quality & Testing (2 weeks)**
- Write **unit and integration tests**.
- Set up **SonarCloud** for continuous integration and code quality.
- Write detailed documentation in the **README.md** file.
- Implement **pagination** for listing users, PDFs, and query results.

**Tasks:**
- Write tests for all major services and controllers.
- Configure SonarCloud to check for code quality and security vulnerabilities.
- Implement pagination for long lists (e.g., users, documents).
- Finalize documentation.

#### **Phase 6: Finalization and Deployment (2 weeks)**
- Prepare **production configuration** (Docker, environment variables).
- Set up **CI/CD pipeline** using GitHub Actions.
- Deploy application using **Docker** containers.
- Final round of testing, bug fixes, and code optimizations.

**Tasks:**
- Configure Docker for production environment.
- Set up GitHub Actions for automated deployment.
- Deploy the application on a cloud platform (e.g., AWS, Azure).
- Final testing and bug fixing.

---

### **Project Structure in Nx Monorepo**

In an **Nx Monorepo**, we'll organize the project by **features** (modules) to ensure maintainability, scalability, and easy testing. Here's how the project structure could look:

```
rag-user-management/
│
├── apps/                            # The applications folder
│   ├── backend/                     # The main NestJS API app
│   │   ├── src/
│   │   │   ├── auth/                # Authentication module (login, logout, refresh)
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── users/               # User module (CRUD, roles)
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── user.entity.ts
│   │   │   │   └── role.entity.ts
│   │   │   ├── pdf/                 # PDF upload and querying
│   │   │   │   ├── pdf.controller.ts
│   │   │   │   ├── pdf.service.ts
│   │   │   │   ├── pdf.entity.ts
│   │   │   │   └── pdf-query.service.ts
│   │   │   ├── common/              # Common utilities (error handling, security, pagination)
│   │   │   │   ├── cookie.service.ts
│   │   │   │   ├── error.decorator.ts
│   │   │   │   └── pagination.pipe.ts
│   │   │   ├── database/            # Database (PostgreSQL) configuration
│   │   │   │   └── database.module.ts
│   │   │   └── app.module.ts         # Main application module
│   │   └── main.ts                  # Application entry point
│   │
│   └── frontend/                    # Optional: Angular app for the frontend (not implemented here)
│
├── libs/                            # Shared libraries
│   ├── auth/                        # Shared authentication services
│   ├── pdf/                         # Shared PDF utilities and processing logic
│   └── common/                      # Shared utilities (e.g., logging, validation, etc.)
│
├── docker/                          # Docker configurations
│   ├── Dockerfile                   # Dockerfile for production app
│   ├── docker-compose.yml           # Docker Compose for DB, Redis, Meilisearch
│   └── .env                         # Environment variables for Docker
│
├── tools/                           # Custom Nx tools, if necessary
│
├── nx.json                          # Nx workspace configuration
├── angular.json                     # Angular project configuration (if frontend exists)
├── package.json                     # Main dependencies
└── tsconfig.json                    # TypeScript configuration
```

### **Detailed Explanation:**

- **Apps Folder:**
  - **backend**: The main application folder for your NestJS API. It contains the business logic divided by modules (`auth`, `users`, `pdf`, `common`).
  - **frontend**: Placeholder for an optional Angular frontend if you decide to add one later.

- **Libs Folder:**
  - **auth**: Shared services for JWT authentication, role-based access control, and JWT strategies.
  - **pdf**: Shared utilities for handling PDF parsing, embedding, and search functionality.
  - **common**: A place to store common services, such as error handling, pagination logic, and cookie management.

- **Docker Folder:**
  - The Docker setup for both development and production environments. It includes a `docker-compose.yml` for local development with **PostgreSQL**, **Redis**, and **Meilisearch** services.

- **Tools Folder:**
  - Custom tools or schematics for Nx that can help automate repetitive tasks, if needed.

- **Other Configuration Files:**
  - **nx.json**: Configuration for Nx workspace.
  - **package.json**: Centralized place for managing dependencies.
  - **tsconfig.json**: TypeScript configuration to work across the monorepo.

---

This plan ensures a scalable, maintainable, and modular project structure with well-defined phases to guide development. The **Nx Monorepo** structure supports clean separation of concerns and easy integration of new features like the frontend or additional services. It also helps to streamline testing, build, and deployment processes.

