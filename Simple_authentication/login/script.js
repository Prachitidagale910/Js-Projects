let form = document.querySelector("#loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

    fetchData(username, password);
});

async function fetchData(uname, pwd) {
    const response = await fetch("http://localhost:3000/users");
    const data = await response.json();

    const user = data.find(u => u.username === uname && u.password === pwd);

    if (user) {
        alert("Login successful!");

        // ✅ Store username so we can use it on home page
        localStorage.setItem("username", user.username);

        // ✅ Redirect to home page
        window.location.href = "home.html";
    } else {
        alert("Invalid User!!");
    }
}
