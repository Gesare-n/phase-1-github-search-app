// API endpoint for GitHub user data
const API_URL = "https://api.github.com/users/";

// DOM elements
const main = document.getElementById("main");
const searchBox = document.getElementById("search");

// Function to fetch and display user information
const getUser = async (username) => {
    try {
        // Fetch user data from GitHub API
        const response = await fetch(API_URL + username);
        const data = await response.json();

        // HTML pattern for user card
        const card = `
            <div class="card">
                <div>
                    <img src="${data.avatar_url}" alt="image" class="avatar">
                </div>
                <div class="user-info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
                    <ul class="info">
                        <li>${data.followers}<strong>Followers</strong></li>
                        <li>${data.following}<strong>Following</strong></li>
                        <li>${data.public_repos}<strong>Repos</strong></li>
                    </ul>
                    <div id="repo"></div>
                </div>
            </div>
        `;

        // Set the inner HTML of the main container to the user card
        main.innerHTML = card;

        // Fetch and display user repositories
        getRepos(username);

        // Log user data to the console
        console.log(data);
    } catch (error) {
        // Handle errors, check if the user profile does not exist (404 status)
        console.log(error.response.status);
        if (error.response.status == 404) {
            createErrorCard('No profile with this Username');
        }
    }
}

// Initial call to fetch and display user data for a default user
getUser("gesare-n");

// Function to fetch and display user repositories
const getRepos = async (username) => {
    try {
        // Get the element to display repositories
        const repos = document.getElementById("repo");

        // Fetch user repositories from GitHub API
        const response = await fetch(API_URL + username + "/repos");
        const data = await response.json();

        // Log repository data to the console
        console.log(data);

        // Create links for each repository and append them to the repos element
        data.map((item) => {
            const elem = document.createElement("a");
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target = "_blank";
            repos.appendChild(elem);
        })
    } catch (error) {
        // Handle errors, display an error card
        createErrorCard('No profile with this Username');
    }
}

// Function to handle form submission
const formSubmit = (e) => {
    // Check if the search box is not empty
    if (searchBox.value != "") {
        // Fetch and display user data for the entered username
        getUser(searchBox.value);
        // Clear the search box
        searchBox.value = "";
    }
    // Prevent the default form submission
    return false;
}

// Event listener for the focusout event on the search box
searchBox.addEventListener("focusout", () => {
    // Trigger form submission when focus is out of the search box
    formSubmit();
})

// Function to create an error card with a given message
const createErrorCard = (msg) => {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
    // Set the inner HTML of the main container to the error card
    main.innerHTML = cardHTML;
}
