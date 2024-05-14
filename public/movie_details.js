window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get("id");

  fetch(`/movie/${movieId}`)
    .then((response) => response.json())
    .then((data) => {
      const movieDetailsDiv = document.getElementById("movieDetails");
      movieDetailsDiv.innerHTML = `
      <h1>${data[0].title}</h1>
      <p><strong>Directed by:</strong> ${data[0].director}</p>
      <p><strong>Starring:</strong> ${data[0].starring}</p>
      <p><strong>Genre:</strong> ${data[0].genre}</p>
    `;
    })
    .catch((error) => console.error("Error fetching movie details:", error));
    // 
    window.addEventListener("popstate", function (event) {
      if (event.state && event.state.page === "home") {
          localStorage.removeItem("selectedMovie");
      }
  });
};


document.getElementById("pvr_btn").addEventListener("click", function () {

  const movieName = document.querySelector("#movieDetails h1").textContent;
  localStorage.setItem("selectedMovie", movieName); // Store movie name in localStorage
  console.log("Movie name stored in localStorage:", movieName);
  window.location.href = '/pvr';
});


