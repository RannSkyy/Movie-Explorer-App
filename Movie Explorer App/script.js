const API_KEY = "12345678"; //isi dengan key api yang asli

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const movieContainer = document.getElementById("movieContainer");
const statusMessage = document.getElementById("statusMessage");

searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        handleSearch();
    }
});

async function handleSearch() {
    const query = searchInput.value.trim();

    if (!query) {
        statusMessage.textContent = "Please enter a movie title.";
        return;
    }

    statusMessage.textContent = "Loading...";
    movieContainer.innerHTML = "";

    try {
        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        const data = await response.json();

        console.log("API RESPONSE:", data);

        if (data.Response === "False") {
            statusMessage.textContent = data.Error;
            return;
        }

        statusMessage.textContent = "";

        data.Search.forEach(movie => {
            const card = document.createElement("div");
            card.classList.add("movie-card");

            const poster =
                movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450?text=No+Image";

            card.innerHTML = `
                <img src="${poster}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
            `;

            movieContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Fetch Error:", error);
        statusMessage.textContent = "Network error. Check internet connection.";
    }
}
