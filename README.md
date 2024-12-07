Here is an updated version of your project documentation that includes versioning in the API endpoints:

---

# **Cortex Access: A RAG-Powered User Management System**

A robust, production-ready **NestJS** application designed to demonstrate advanced backend development techniques. This project incorporates **role-based access control (RBAC)**, **PDF uploading with Retrieval-Augmented Generation (RAG)** for querying documents, **JWT authentication**, **refresh token rotation**, and a modern software stack to ensure scalability and security.

## **Table of Contents**
- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Code Quality and Security](#code-quality-and-security)
- [Architecture](#architecture)
- [Future Improvements](#future-improvements)

---

## **About the Project**

The project is a **user management and document query system** designed for organizations where users (Admins, Employees, Supervisors) can:
- **Authenticate** (login, logout, refresh token).
- Manage roles and users with **Admin-only access controls**.
- Upload PDF documents and **ask questions** about their content using RAG techniques.
- Securely handle tokens, cookies, and sensitive data while adhering to best practices.

This project demonstrates skills in building **scalable applications**, working with **microservices-ready Nx monorepos**, and leveraging **modern tools** like **Meilisearch**, **pgvector**, and **Redis**.

---

## **Features**

### **User Management**
- Role-based access control (**Admin**, **Employee**, **Supervisor**).
- **JWT authentication** with refresh token rotation stored in **Redis**.
- **Password reset** and first-login mandatory password change.

### **PDF Upload & RAG**
- Upload PDFs and retrieve answers to questions based on the document content.
- Fast search powered by **Meilisearch** and embedding storage in **pgvector**-enabled PostgreSQL.

### **Security**
- Input sanitization with **express-sanitizer**.
- **CORS** and **Helmet** for secure HTTP headers.
- Cookie management with a custom **CookieService**.

### **Error Handling**
- Centralized error handling using a custom decorator for clean and maintainable code.

### **Scalability**
- Nx Monorepo architecture for modular development.
- Docker Compose for running **PostgreSQL** and **Redis** containers.

### **Pagination**
- Built-in pagination support for listing users, documents, and query results.

### **Code Quality**
- Continuous integration with **SonarCloud** for code quality and coverage.

---

## **Tech Stack**

| **Category**     | **Technology**                                                                                  |
|-------------------|-----------------------------------------------------------------------------------------------|
| **Backend**       | [NestJS](https://nestjs.com), [Nx](https://nx.dev), [pgvector](https://github.com/pgvector/pgvector) |
| **Database**      | PostgreSQL with pgvector for vector search                                                   |
| **Search Engine** | Meilisearch                                                                                  |
| **Token Store**   | Redis                                                                                        |
| **Authentication**| JWT, Role-based Access Control (RBAC)                                                        |
| **Containerization**| Docker, Docker Compose                                                                     |
| **Security**      | Helmet, CORS, express-sanitizer                                                              |
| **Code Quality**  | SonarCloud                                                                                   |
| **Utilities**     | PDF parsing, LangChain, OpenAI                                                              |

---

## **Setup Instructions**

### **Prerequisites**
1. **Docker** and **Docker Compose** installed.
2. **Node.js** (>= 18) and **npm** (>= 8).
3. PostgreSQL, Redis, and Meilisearch configured via Docker Compose.

### **Clone the Repository**
```bash
git clone https://github.com/yourusername/rag-user-management.git
cd rag-user-management
```

### **Setup Docker Containers**
Create a `docker-compose.yml` file to spin up PostgreSQL, Redis, and Meilisearch:
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    container_name: postgres
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: rag_app
    ports:
      - "5432:5432"
  redis:
    image: redis:7
    container_name: redis
    ports:
      - "6379:6379"
  meilisearch:
    image: getmeili/meilisearch:latest
    container_name: meilisearch
    environment:
      MEILI_MASTER_KEY: 'masterKey'
    ports:
      - "7700:7700"
```

Start the containers:
```bash
docker-compose up -d
```

### **Install Dependencies**
Install the project dependencies:
```bash
npm install
```

### **Run the Application**
Start the backend:
```bash
nx serve backend
```

### **Environment Variables**
Create a `.env` file in the `apps/backend` folder:
```
DATABASE_URL=postgres://user:password@localhost:5432/rag_app
REDIS_URL=redis://localhost:6379
MEILISEARCH_URL=http://localhost:7700
MEILISEARCH_API_KEY=masterKey
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

---

## **API Endpoints**

### **Auth Module**
- `POST /api/v1/auth/login`: Authenticate users.
- `POST /api/v1/auth/refresh`: Rotate refresh tokens.
- `POST /api/v1/auth/reset-password`: Reset user password.

### **User Module**
- `POST /api/v1/users`: Admin-only. Create a new user.
- `PATCH /api/v1/users/:id`: Admin-only. Update user information.

### **PDF Module**
- `POST /api/v1/pdf/upload`: Upload a PDF file.
- `POST /api/v1/pdf/query/:pdfId`: Query a specific PDF using RAG.

---

## **Code Quality and Security**

- **SonarCloud Integration**: Continuous quality and coverage checks.
- **Sanitization**: Prevent SQL injection and XSS attacks with express-sanitizer.
- **Helmet**: Protect HTTP headers.
- **Custom CookieService**: Manages cookies securely.

---

## **Architecture**

- **Monorepo**: Nx workspace for modular, scalable development.
- **Modularized Features**: Separate modules for Auth, User, and PDF services.
- **Custom Decorators**: Centralized error handling using decorators.

---

## **Future Improvements**
1. Add a frontend using **Angular**.
2. Enable multi-language support for document queries.
3. Integrate an admin dashboard for user and document management.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## **Contact**

Feel free to reach out if you have any questions or suggestions!

- **Email**: thejordach@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](https://pe.linkedin.com/in/jordachmakaya)
- **Portfolio**: [Your Portfolio](https://yourportfolio.com)

---

**Show some ❤️ by starring this repository if you find it useful!** 😊

--- 

