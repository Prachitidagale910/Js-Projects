// Select elements
const playlistDiv = document.querySelector(".playlist");
const mainVideo = document.querySelector(".left.demo video");
const videoTitle = document.querySelector(".left.demo h2");
const videoDesc = document.querySelector(".left.demo p");
// Comment section elements
const textarea = document.getElementById("comment");  // match HTML id
const commentDiv = document.querySelector(".comm-div");
const form = document.getElementById("comment-form");
// Load playlist from JSON
loadPlaylist();

async function loadPlaylist() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Failed to fetch data.json');

        const data = await response.json();

        // Clear previous content
        playlistDiv.innerHTML = '';

        data.forEach(({ name, description, video_Src, image_Src }) => {
            // Create a playlist item
            const item = document.createElement("div");
            item.classList.add("playlist-item");
            item.innerHTML = `
                <h3>${name}</h3>
                <img src="${image_Src}" width="150" />
            `;

            // Click event to update main video
            item.addEventListener("click", () => {
                mainVideo.src = video_Src;
                mainVideo.play();
                videoTitle.textContent = name;
                videoDesc.textContent = description;
            });

            playlistDiv.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading playlist:', error);
        playlistDiv.innerHTML = `<p>Failed to load playlist.</p>`;
    }
}

textarea.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {  
        event.preventDefault();  // prevent newline
        const inputText = textarea.value.trim(); // remove extra spaces

        if(inputText !== "") { // only add if not empty
            comment_div.innerHTML += `<p>${inputText}</p>`;
            textarea.value = ""; // clear textarea
        }
    }
});


form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevent form reload

    const inputText = textarea.value.trim();
    if(inputText !== "") {
        // Add comment using innerHTML
        comment_div.innerHTML += `<p>${inputText}</p>`;

        // Clear textarea
        textarea.value = "";

        // Optional: scroll to bottom
        comment_div.scrollTop = comment_div.scrollHeight;
    }
});