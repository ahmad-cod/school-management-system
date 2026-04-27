# School Management System

A modern, full-stack school management platform built with FastAPI and Next.js. Designed to streamline administrative tasks, manage student records, track grades, and handle school fees efficiently.

---

## 📋 Problem Statement

Schools often struggle with:

- **Fragmented data management** across multiple systems
- **Manual record keeping** prone to errors
- **Inefficient communication** between staff and parents
- **Complex billing and fee tracking**
- **Limited real-time insights** into student performance

This system provides a centralized, web-based platform that consolidates teachers, students, classes, grades, and fees management into one intuitive interface.

---

## 🛠 Tech Stack

### **Backend**

- **FastAPI** — Modern, fast Python web framework
- **PostgreSQL** — Robust relational database
- **Asyncpg** — High-performance async PostgreSQL driver
- **Uvicorn** — ASGI server
- **Pydantic** — Data validation

### **Frontend**

- **Next.js 16** — React framework with TypeScript
- **React Hook Form** — Efficient form state management
- **Radix UI** — Unstyled, accessible UI components
- **Tailwind CSS** — Utility-first CSS framework
- **ESLint** — Code quality

### **DevOps & Infrastructure**

- **Docker** — Containerization
- **Docker Compose** — Multi-container orchestration
- **Docker Swarm Stack** — Production deployment

---

## ✨ Features

### **Dashboard**

- Real-time statistics and key metrics
- Recent activity feed
- Class schedule widget
- Top-performing students

### **Student Management**

- Add, edit, and delete student records
- Track enrollment dates and status
- Parent contact information
- Automatic student-to-class assignment

### **Teacher Management**

- Manage teacher profiles and contact info
- Track subject assignments
- Monitor employment status

### **Classes**

- Create and manage class sections
- Assign teachers to classes
- Track class capacity and enrollment

### **Grades & Academic Performance**

- Record student grades by subject and term
- Automatic letter grade calculation
- Multiple exam types (End of Term, Midterms, etc.)
- Grade tracking by term

### **Fee Management**

- Track student fees per term
- Monitor payment status (Unpaid, Partial, Paid)
- Calculate remaining balance
- Record payment methods and dates

### **Additional Features**

- Notifications system
- Messaging platform
- Attendance tracking
- Schedule management
- Reports generation
- User settings

---

## 🚀 Quick Start

### **Prerequisites**

- Docker & Docker Compose installed
- Git
- PostgreSQL credentials (for local development)

### **1. Clone the Repository**

```bash
git clone https://github.com/ahmad-cod/school-management-system.git
cd school-management-system
```

### **2. Configure Environment Variables**

Create a `.env` file in the project root:
Duplicate the template file to create your local environment config:
```bash
cp .env.example .env
```
Edit the `.env` file with your local settings.

### **3. Start with Docker Compose**

```bash
docker-compose up --build
```

This will:

- Build and start the PostgreSQL database
- Initialize the database schema and seed data
- Build and start the FastAPI backend (http://localhost:8000)
- Build and start the Next.js frontend (http://localhost:3000)

### **4. Access the Application**

| Component            | URL                         | Purpose                |
| -------------------- | --------------------------- | ---------------------- |
| **Frontend**         | http://localhost:3000       | Main web interface     |
| **API**              | http://localhost:8000       | REST API endpoints     |
| **API Docs**         | http://localhost:8000/docs  | Interactive Swagger UI |
| **Alternative Docs** | http://localhost:8000/redoc | ReDoc documentation    |

### **5. Login & Explore**

The system comes pre-seeded with sample data for classes, teachers, students, and grades. Start managing your school!

---

## 📁 Project Structure

```
school-management-system/
├── backend/                    # FastAPI application
│   ├── app/
│   │   ├── main.py            # FastAPI app setup & routes
│   │   ├── db.py              # Database connection pool
│   │   ├── models.py          # Pydantic models
│   │   └── routers/           # API endpoint groups
│   │       ├── students.py
│   │       ├── teachers.py
│   │       └── classes.py
│   ├── requirements.txt        # Python dependencies
│   └── Dockerfile
│
├── frontend/                   # Next.js application
│   ├── app/                   # App directory (routing)
│   │   ├── page.tsx           # Dashboard
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── classes/
│   │   ├── grades/
│   │   ├── fees/
│   │   ├── schedule/
│   │   ├── notifications/
│   │   └── [other pages]/
│   ├── components/            # React components
│   │   ├── dashboard/         # Dashboard components
│   │   └── ui/                # Reusable UI components
│   ├── services/              # API client services
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities
│   ├── package.json
│   └── Dockerfile
│
├── db/                         # Database scripts
│   ├── schema.sql             # Database schema
│   ├── seed.sql               # Sample data
│   ├── init.sql               # Initialization
│   └── queries.sql            # Common queries
│
├── docker-compose.yml         # Local dev orchestration
├── docker-stack.yml           # Production swarm config
├── locustfile.py              # Load testing
└── README.md                  # This file
```

---

## 🔧 Development

### **Backend Development**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### **Frontend Development**

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📊 API Endpoints

### **Students**

- `GET /students` — List all students
- `POST /students` — Create new student
- `GET /students/{id}` — Get student details
- `PUT /students/{id}` — Update student
- `DELETE /students/{id}` — Delete student

### **Teachers**

- `GET /teachers` — List all teachers
- `POST /teachers` — Create new teacher
- `GET /teachers/{id}` — Get teacher details
- `PUT /teachers/{id}` — Update teacher
- `DELETE /teachers/{id}` — Delete teacher

### **Classes**

- `GET /classes` — List all classes
- `POST /classes` — Create new class
- `GET /classes/{id}` — Get class details
- `PUT /classes/{id}` — Update class
- `DELETE /classes/{id}` — Delete class

Full API documentation available at http://localhost:8000/docs

<!-- ---

## 📸 Screenshots

> Add screenshots here to showcase:
>
> - Dashboard overview
> - Student management interface
> - Grade tracking system
> - Fee management dashboard
> - Mobile responsive design -->

---

## 🚀 Deployment

### **Production with Docker Swarm**

```bash
docker stack deploy -c docker-stack.yml school_system
```

### **Load Testing**

```bash
pip install locust
locust -f locustfile.py --host=http://localhost:8000
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📧 Support

For issues, suggestions, or questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for efficient school management**


<!-- 
├── autoscaler.py              # Auto-scaling logic
 -->