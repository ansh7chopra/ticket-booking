function getTicketSales(movieName) {
    fetch(`/admin/ticket-sold/${movieName}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                // Construct the URL for the ticket details page
                const ticketDetailsUrl = `/ticket-details.html?movie=${encodeURIComponent(movieName)}&data=${encodeURIComponent(JSON.stringify(data))}`;
                // Navigate to the ticket details page
                window.location.href = ticketDetailsUrl;
            } else {
                console.error('No ticket sales data available for this movie.');
                alert('No ticket have been booked for this movie.');
            }
        })
        .catch(error => console.error('Error fetching ticket sales:', error));
}


function searchMovies() {
    var input, filter, movies, movie, title, i;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    movies = document.querySelectorAll('.rmovies, .umovies');

    for (i = 0; i < movies.length; i++) {
      movie = movies[i];
      title = movie.textContent || movie.innerText;    
      if (title.toUpperCase().indexOf(filter) > -1) {
        movie.style.display = '';
      } else {
        movie.style.display = 'none';
      }
    }
  }
  document.getElementById('logoutbtn').addEventListener('click', function() {
    window.location.href = '/login';
  });

