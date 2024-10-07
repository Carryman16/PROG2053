let postList = []; // Store initially fetched posts
let isLoading = false; // Control multiple event triggers

function getPosts() { // Fetch data and fill the post array
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error: " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        postList = data; // Store fetched data in array
        displayPosts(18); // Initially display 18 posts
    })
    .catch((error) => {
        console.error("Error fetching posts: ", error);
    });
}

function displayPosts(count) {
    let container = document.getElementById("container");
    let addedPosts = 0;

    while (postList.length > 0 && addedPosts < count) { // Limit to `count` posts
        const postItem = postList.shift(); // Get and remove the first post
        const postElement = document.createElement("article");
        const postTitle = document.createElement("h1");
        const postBody = document.createElement("p");

        postTitle.textContent = postItem.title;
        postBody.textContent = postItem.body;

        postElement.appendChild(postTitle);
        postElement.appendChild(postBody);
        postElement.classList.add("post-styling");
        
        container.appendChild(postElement);
        addedPosts++;
    }
    isLoading = false; // Allow more posts to be loaded later
}

// Fetch and populate postList when the page loads
getPosts();

window.onscroll = function() {
    // Check if the user is close to the bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 75 && !isLoading) {
        isLoading = true; // Prevent triggering multiple loads
        displayPosts(10); // Load more posts (e.g., 10 at a time)
    }
};
