# Task Manager API

This is a **Task Manager API** built with **Node.js & Express**, using **file system storage** instead of a database. The API allows users to **create, read, update, and delete (CRUD) tasks**. The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.

---

## 📌 **Project Setup & Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kkaushik14/Algo-Root.git
cd Algo-Root/backend  # Navigate to the backend folder

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env file inside the backend/ folder and add:
PORT=2011

4️⃣ Start the Server
node server.js
The server will run on http://localhost:2011.
📌 API Endpoints
1️⃣ Fetch All Tasks
GET /api/tasks

Response:
json
Copy
Edit
[
  {
    "id": "1234",
    "text": "Sample Task",
    "description": "This is a task description.",
    "completed": false
  }
]
2️⃣ Create a Task
POST /api/tasks

Request Body:
json
Copy
Edit
{
  "text": "New Task",
  "description": "Task details"
}
Response:
json
Copy
Edit
{
  "id": "5678",
  "text": "New Task",
  "description": "Task details",
  "completed": false
}
3️⃣ Update a Task
PUT /api/tasks/:id

Request Body:
json
Copy
Edit
{
  "text": "Updated Task",
  "completed": true
}
Response:
json
Copy
Edit
{
  "id": "5678",
  "text": "Updated Task",
  "description": "Task details",
  "completed": true
}
4️⃣ Delete a Task
DELETE /api/tasks/:id

Response:
json
Copy
Edit
{
  "message": "Task deleted successfully"
}
📌 Testing the API
1️⃣ Using Postman
Import the API endpoints.

Make GET, POST, PUT, DELETE requests.

Ensure correct responses.

2️⃣ Using Curl
Fetch all tasks:
sh
Copy
Edit
curl -X GET https://task-manager-4n7k.onrender.com/api/tasks
Create a task:
sh
Copy
Edit
curl -X POST -H "Content-Type: application/json" -d '{"text":"New Task", "description":"Details"}' https://task-manager-4n7k.onrender.com/api/tasks
Update a task:
sh
Copy
Edit
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' https://task-manager-4n7k.onrender.com/api/tasks/5678
Delete a task:
sh
Copy
Edit
curl -X DELETE https://task-manager-4n7k.onrender.com/api/tasks/5678
📌 Screenshots (UI Showcase)
📌 Add UI screenshots here showing the task list, adding a task, editing a task, and deleting a task.


📌 Deployment Links
Frontend (Vercel): https://task-manager-tan-zeta.vercel.app

Backend (Render): https://task-manager-4n7k.onrender.com
