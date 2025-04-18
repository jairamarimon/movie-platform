# movie-platform
This is a movie platform management application that allows users to create, read, update and delete (CRUD) operations on movies.

## Prerequisites

Before running the application, make sure the following are installed:

- **Node.js** – Required to run the Angular frontend.
- **npm** – For managing frontend dependencies.
- **Python 3.x** – For running the Django backend.
- **pip** – For installing Python dependencies.

---

## Backend Setup (Django)

### 1. Clone the Repository

Start by cloning the project to your local set up:

```bash
git clone <https://github.com/jairamarimon/movie-platform.git>
```

### 2. Set Up Virtual Environment

Navigate to the backend directory and create a virtual environment. This ensures that the Python dependencies are isolated for this project.

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate # for Windows
source venv/bin/activate # for Mac/Linux
```

### 3. Install Python Dependencies

With the virtual environment activated, install the required Python dependencies:

```bash
pip install -r requirements.txt
```

### 4. Set Up the Database

Run the migrations to set up the database:

```bash
python manage.py migrate
```

### 5. Run Django Server

```bash
python manage.py runserver
```

---

## Frontend Setup (Angular)

### 1. Install Node Dependencies

Move to the frontend directory and install the necessary dependencies for Angular:

```bash
cd frontend
npm install
```

### 2. Run Angular Server

```bash
ng serve
```

---

# Accessing the Application

Once both the backend and frontend are up and running:

Open your browser and visit http://localhost:4200 to start interacting with the Angular app.

All API requests to manage movie data will be routed to the Django backend at http://localhost:8000.
