const API_URL = "https://api.github.com";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const searchResults = document.querySelector("#search-results");
const repoList = document.querySelector("#repo-list");

// Search GitHub for users by name
function searchUsers(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  const searchUrl = `${API_URL}/search/users?q=${searchTerm}`;
  fetch(searchUrl, { headers: { Accept: "application/vnd.github.v3+json" } })
    .then((response) => response.json())
    .then((data) => {
      searchResults.innerHTML = "";
      data.items.forEach((user) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        li.addEventListener("click", () => displayUserRepos(user.login));
        searchResults.appendChild(li);
      });
    })
    .catch((error) => console.error(error));
}

// Display all repositories for a specific user
function displayUserRepos(username) {
  const reposUrl = `${API_URL}/users/${username}/repos`;
  fetch(reposUrl, { headers: { Accept: "application/vnd.github.v3+json" } })
    .then((response) => response.json())
    .then((data) => {
      repoList.innerHTML = "";
      data.forEach((repo) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        repoList.appendChild(div);
      });
    })
    .catch((error) => console.error(error));
}

searchForm.addEventListener("submit", searchUsers);
