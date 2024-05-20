const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "FROSTking7@",
  database: "ticket_data",
  authPlugin: "mysql_native_password",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/home_screen", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "home_screen.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  const checkIfExistsQuery = "SELECT * FROM users WHERE username = ?";
  db.query(checkIfExistsQuery, [username], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send("User already registered");
    } else {
      const insertUserQuery =
        "INSERT INTO users (username, password, email,user_role) VALUES (?, ?, ?, ?)";
      const userRole = 0;
      db.query(
        insertUserQuery,
        [username, password, email, userRole],
        (err, result) => {
          if (err) throw err;
          console.log("User registered");
          res.send("User registered");
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  // console.log(sql);

  db.query(sql, [username, password], (err, result) => {
    // console.log(result);
    if (err) throw err;
    if (result.length > 0) {
      const userRole = result[0].user_role;
      // console.log(userRole);

      if (userRole == 0) {
        console.log(" User Login successful");
        return res.json({ success: true, role: "user" });
      } else if (userRole == 1) {
        console.log("Admin login successful");
        return res.json({ success: true, role: "admin" });
      }
    } else {
      console.log("Invalid username or password");
      res.send("Invalid username or password");
    }
  });
});
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// app.get("/movie/:id/details", (req, res) => {
//   const movieId = req.params.id;
//   const sql = `SELECT * FROM rmovies WHERE id = ?`;
//   db.query(sql, [movieId], (err, result) => {
//     if (err) {
//       console.error("Error fetching movie details:", err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }
//     if (result.length === 0) {
//       res.status(404).send("Movie details not found");
//       return;
//     }
//     res.json(result[0]); // Send movie details as JSON
//   });
// });

app.get("/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const sql = `SELECT * FROM rmovies WHERE id = ${movieId}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});


app.get("/movie_details", (req, res) => {
  res.sendFile(path.join(__dirname, "movie_details.html"));
});

// ////////////////////////////

app.get("/upcomming/movie/:id", (req, res) => {
  const movieId = req.params.id;
  const sql = `SELECT * FROM umovies WHERE id = ${movieId}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get("/upcomming.details", (req, res) => {
  res.sendFile(path.join(__dirname, "upcomming.details.html"));
});

app.get("/search", (req, res) => {
  const searchQuery = req.query.q;
  const sql = `SELECT * FROM rmovie WHERE title LIKE '%${searchQuery}%' UNION SELECT * FROM umovie WHERE title LIKE '%${searchQuery}%'`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error executing MySQL query: " + error.stack);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

// ////////////////////////////////////////////////////////////////////////////
app.set("view engine", "ejs");

app.get("/pvr", (req, res) => {
  const query = "SELECT * FROM pvr_details";

  db.query(query, (err, results) => {
    if (err) throw err;

    res.render("index", { pvrDetails: results });
  });
});






app.post('/ticket.html', (req, res) => {
  const { movie, pvr, showTime, date, seats } = req.body;

  const sql = `INSERT INTO bookings (movie, pvr, show_time, date, seats) VALUES (?, ?, ?, ?, ?)`;
  const values = [movie, pvr, showTime, date, seats.join(", ")];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      res.status(500).send('Error inserting data into MySQL');
      return;
    }
    console.log('Booking data inserted into MySQL table');
    res.json({ success: true });
  });
});

// app.post('/ticket.html', (req, res) => {
//   const { movie, pvr, showTime, date, seats } = req.body;

//   // Construct the table name based on the selected movie name
//   const tableName = `${movie}_tickets`;

//   // Construct the SQL query to insert data into the respective movie-specific table
//   const sql = `INSERT INTO ${tableName} (pvr, show_time, date, seats) VALUES (?, ?, ?, ?)`;
//   const values = [pvr, showTime, date, seats.join(", ")];

//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error('Error inserting data into MySQL:', err);
//       res.status(500).send('Error inserting data into MySQL');
//       return;
//     }
//     console.log('Booking data inserted into', tableName, 'table');
//     res.json({ success: true });
//   });
// });

app.get('/admin/ticket-sold/:movieName', (req, res) => {
  const movieName = req.params.movieName;
  const sql = 'SELECT * FROM bookings WHERE movie = ?';
  db.query(sql, [movieName], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      return res.status(500).send('Database query error');
    }
    res.json(results);
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// http://localhost:3000/register
// http://localhost:3000/login
// http://localhost:3000/home_screen
// http://localhost:3000/pvr
// http://localhost:3000/seat_ui.html
// http://localhost:3000/payment.html
// http://localhost:3000/admin
// http://localhost:3000/ticket.html
