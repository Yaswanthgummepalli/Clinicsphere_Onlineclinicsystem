# 🏥 Online Clinic System

A Full Stack Web Application developed using **React.js**, **Spring Boot**, and **MySQL** to simplify clinic management. The system enables patients to book appointments, and administrators to manage appointments efficiently and manage the overall clinic operations through a secure and user-friendly interface.

---

## 🚀 Features

### 👤 Patient
- User Registration & Login
- View Available Doctors
- Book Appointments
- View Appointment History

### 👨‍⚕️ Admin
- Secure Login
- View Assigned Appointments
- Approve/Reject Appointments
- Manage Patient Consultations
- Manage Doctors
- Manage Patients
- View All Appointments
- Monitor System Activities

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

### Backend
- Spring Boot
- Spring Data JPA
- REST APIs

### Database
- MySQL

### Tools & Technologies
- Maven
- Git
- GitHub
- Postman
- VS Code
- Spring Tool Suite (STS)

---

## 📂 Project Structure

```
OnlineClinicSystem
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── src
│   ├── pom.xml
│   └── application.properties
│
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, ensure the following software is installed:

- Java 17 or above
- Node.js (Latest LTS Version)
- Maven
- MySQL Server
- Git

---

## 🗄️ Database Setup

### Step 1: Install MySQL

Install MySQL Server and MySQL Workbench (or any MySQL client).

### Step 2: Create a Database

Run the following SQL command:

```sql
CREATE DATABASE ocs;
```

Replace `ocs` with your database name if it is different.

### Step 3: Configure Environment Variables

Set the following environment variables before running the backend:

```text
DB_URL=jdbc:mysql://localhost:3306/online_clinic
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

### Step 4: Start the Backend

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Since the project uses:

```properties
spring.jpa.hibernate.ddl-auto=update
```

Hibernate will automatically create the required tables when the application starts.

---

## 📥 Installation

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repository-name.git
```

### Backend Setup

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev

If you found this project helpful, please consider giving it a ⭐ on GitHub.
