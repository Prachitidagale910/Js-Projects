
let form = document.querySelector(".form-control");
let input  = document.querySelector("#username");
let user_info = document.querySelector(".user-info");

form.addEventListener("submit", (e)=>{

    e.preventDefault();
    getData(input.value);

})

async function getData(user) {
    // Show loading state
    user_info.innerHTML = `
        <div style="padding:20px; text-align:center; color:#555;">⏳ Loading user data...</div>
    `;

    try {
        let response = await fetch(`https://api.github.com/users/${user.trim()}`);

        if (!response.ok) {
            if (response.status === 404) {
                // User not found
                user_info.innerHTML = `
                    <div style="border:2px dashed #ff6699; padding:20px; border-radius:10px; max-width:400px; text-align:center; background:#fff0f5;">
                        <h2 style="color:#cc0033;">🚫 No Such User</h2>
                        <p>Oops! We couldn’t find <strong>${user}</strong> on GitHub.</p>
                        <p style="font-size:14px; color:#555;">Tip: Check the username and try again.</p>
                    </div>
                `;
            } else {
                // Other HTTP errors
                user_info.innerHTML = `
                    <div style="border:2px solid #ff9900; padding:20px; border-radius:10px; max-width:400px; text-align:center; background:#fff8e1;">
                        <h2 style="color:#ff6600;">⚠️ Something went wrong!</h2>
                        <p>Unable to fetch data for <strong>${user}</strong>.</p>
                        <p style="font-size:14px; color:#555;">Error Code: ${response.status}</p>
                    </div>
                `;
            }
            return; // exit the function
        }

        // Parse JSON for valid user
        let { id, name, email, bio, location, avatar_url, created_at } = await response.json();

        user_info.innerHTML = `
            <div style="border:1px solid #ccc; padding:15px; border-radius:8px; max-width:400px; text-align:center;">
                <img src="${avatar_url}" alt="${name}" width="100" style="border-radius:50%; margin-bottom:10px;">
                <h2>${name || "No Name Provided"}</h2>
                <p><strong>ID:</strong> ${id}</p>
                <p><strong>Email:</strong> ${email || "Not Available"}</p>
                <p><strong>Bio:</strong> ${bio || "No bio available"}</p>
                <p><strong>Location:</strong> ${location || "Not specified"}</p>
                <p><strong>Joined:</strong> ${new Date(created_at).toDateString()}</p>
            </div>
        `;
    } catch (err) {
        // Network or unexpected error
        user_info.innerHTML = `
            <div style="border:2px solid #ff3333; padding:20px; border-radius:10px; max-width:400px; text-align:center; background:#ffe6e6;">
                <h2 style="color:#cc0000;">💥 Unexpected Error!</h2>
                <p>Something went really wrong while fetching <strong>${user}</strong>’s data.</p>
                <p style="font-size:14px; color:#555;">Error Message: ${err.message}</p>
            </div>
        `;
    }
}
