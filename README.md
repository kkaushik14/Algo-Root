# Task Manager API

This is a **Task Manager API** built with **Node.js & Express**, using **file system storage** instead of a database. The API allows users to **create, read, update, and delete (CRUD) tasks**. The frontend is deployed on **Vercel**, and the backend is deployed on **Render**.

---

## 📌 **Project Setup & Installation**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/kkaushik14/Algo-Root.git
cd Algo-Root/backend  # Navigate to the backend folder
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env` file inside the `backend/` folder and add:
```env
PORT=2011
```

### **4️⃣ Start the Server**
```sh
node server.js
```
The server will run on **[http://localhost:2011](http://localhost:2011)**.

---

## 📌 **API Endpoints**

### **1️⃣ Fetch All Tasks**
**GET** `/api/tasks`
#### **Response:**
```json
[
  {
    "id": "1234",
    "text": "Sample Task",
    "description": "This is a task description.",
    "completed": false
  }
]
```

---

### **2️⃣ Create a Task**
**POST** `/api/tasks`
#### **Request Body:**
```json
{
  "text": "New Task",
  "description": "Task details"
}
```
#### **Response:**
```json
{
  "id": "5678",
  "text": "New Task",
  "description": "Task details",
  "completed": false
}
```

---

### **3️⃣ Update a Task**
**PUT** `/api/tasks/:id`
#### **Request Body:**
```json
{
  "text": "Updated Task",
  "completed": true
}
```
#### **Response:**
```json
{
  "id": "5678",
  "text": "Updated Task",
  "description": "Task details",
  "completed": true
}
```

---

### **4️⃣ Delete a Task**
**DELETE** `/api/tasks/:id`
#### **Response:**
```json
{
  "message": "Task deleted successfully"
}
```

---

## 📌 **Testing the API**

### **1️⃣ Using Postman**
- Import the API endpoints.
- Make **GET, POST, PUT, DELETE** requests.
- Ensure correct responses.

### **2️⃣ Using Curl**
#### **Fetch all tasks:**
```sh
curl -X GET https://task-manager-4n7k.onrender.com/api/tasks
```
#### **Create a task:**
```sh
curl -X POST -H "Content-Type: application/json" -d '{"text":"New Task", "description":"Details"}' https://task-manager-4n7k.onrender.com/api/tasks
```
#### **Update a task:**
```sh
curl -X PUT -H "Content-Type: application/json" -d '{"completed":true}' https://task-manager-4n7k.onrender.com/api/tasks/5678
```
#### **Delete a task:**
```sh
curl -X DELETE https://task-manager-4n7k.onrender.com/api/tasks/5678
```

---

## 📌 **Screenshots (UI Showcase)**
📌 Add UI screenshots here showing the **task list, adding a task, editing a task, and deleting a task.**  
```md
![Task Manager UI](https://drive.usercontent.google.com/download?id=1Wxj4anDbuHzqSvSQQ7wOlZr5OrL16nRG&export=view)

![Task Manager UI](https://drive.google.com/uc?export=view&id=1km8iqerGotTWlAf30cWBlR-LHOk7Rjys)

![Task Manager UI](https://drive.google.com/uc?export=view&id=1I_dhMtsEioh5LcUUT-fruIyKHxhKWT-tv)

![Task Manager UI](https://drive.google.com/uc?export=view&id=1km8iqerGotTWlAf30cWBlR-LHOk7Rjys)

![Task Manager UI](https://drive.google.com/uc?export=view&id=1V9PUGZxyxcBwO0gd3dgIfNsW4Vw1sGzX)

```

---

## 📌 **Deployment Links**
- **Frontend (Vercel):** [https://task-manager-tan-zeta.vercel.app](https://task-manager-tan-zeta.vercel.app)
- **Backend (Render):** [https://task-manager-4n7k.onrender.com](https://task-manager-4n7k.onrender.com)

---
