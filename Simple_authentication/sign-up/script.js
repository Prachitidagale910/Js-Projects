
let form = document.getElementById("signupForm");
form.addEventListener("submit", (e)=>{

    e.preventDefault();

const username = document.getElementById('username').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const confirmPassword = document.getElementById('confirmPassword').value;


   if(password === confirmPassword){
    const userData = { username, email, password };
    saveUser(userData);
} else {
    alert("Passwords do not match!");
}
});


async function saveUser(userData) {
    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if(response.ok){
            alert("Sign Up Successful!");
            document.getElementById("signupForm").reset();
            window.location.href = "login.html"; // redirect
        } else {
            alert("Failed to sign up. Try again.");
        }
    } catch(error) {
        console.error("Error:", error);
        alert("Server error!");
    }
}
