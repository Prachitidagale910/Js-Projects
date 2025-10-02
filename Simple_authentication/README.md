# PinkPulse Authentication App

A simple **authentication web application** built with HTML, CSS, and JavaScript.  
This project demonstrates how **user login and signup** works using a **local JSON file** with `json-server` as a mock backend.  

---

## Features

- **Sign Up:** Users can register with a username, email, and password.
- **Login:** Users can log in with their credentials.
- **Local Database:** Uses `data.json` as a mock database.
- **Fetch API:** Demonstrates GET and POST requests using JavaScript fetch.
- **Responsive UI:** Attractive black & pink theme with animations.

---

## Project Structure

Simple_authentication/
│
├── login/ # Login page
├── sign-up/ # Signup page
├── database/
│ └── data.json # Mock database
├── index.html # Home page
├── app.js # JS for home page
└── script.js # JS for login/signup functionality

yaml
Copy code

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
2. Install json-server
bash
Copy code
npm install -g json-server
3. Start the local server
bash
Copy code
json-server --watch database/data.json --port 3000
Server will run at: http://localhost:3000/users

4. Open the application
Open index.html in your browser.

Navigate to Login or Sign Up pages.

How It Works
Sign Up:

User enters username, email, and password.

Data is sent to json-server using a POST request and stored in data.json.

Login:

User enters username and password.

Credentials are checked via a GET request to json-server.

If valid, the user is redirected to the home page.

This app is meant for learning purposes and is not production-ready. Passwords are stored in plain text.

Technologies Used
HTML, CSS, JavaScript

json-server

Local JSON file as database (data.json)

Author
Prachiti Dagale

yaml
Copy code
