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

## How It Works

**Sign Up:**  
- User enters username, email, and password.  
- Data is sent to `json-server` using a **POST** request and stored in `data.json`.

**Login:**  
- User enters username and password.  
- Credentials are checked via a **GET** request to `json-server`.  
- If valid, the user is redirected to the home page.

> This app is for learning purposes and is **not production-ready**. Passwords are stored in plain text.

---

## Technologies Used

- HTML, CSS, JavaScript  
- [json-server](https://www.npmjs.com/package/json-server)  
- Local JSON file as database (`data.json`)

---

## Author

**Prachiti Dagale**
