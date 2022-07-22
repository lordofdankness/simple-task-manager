# **Simple Task Manager App**

A task manager app using MongoDB, Express, Node.

### Features

---

- User signup and login

- Task CRUD

- User profile image upload

- Email notification on user signup via SendGrid

---

To install dependencies run: `$ npm install` then start the app: `$ npm run dev`

Then create an .env file at the root of the project folder and insert the following:

```
SENDGRID_API_KEY=YOUR_SEND_GRID_API_KEY
MONGODB_CONNECTION_URL=YOUR_LOCAL_MONGODB_URL/task-manager-app
PORT=3000
```
