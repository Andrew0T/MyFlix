const express = require('express'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(morgan('common'));

mongoose.connect('mongodb://localhost:27017/myFlix',{
   useNewUrlParser: true,
   useUnifiedTopology: true
 });

const Movies = Models.Movie,
      Users = Models.User,
      Genres = Models.Genre,
      Directors = Models.Directors,
      Actors = Models.Actors;

// Welcome Text
app.get('/', (req, res) => {
 res.send('Welcome to myFlix App')
});

// Creates new user

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username })
  .then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then((user) =>{res.status(201).json(user);
      })
      .catch(error => {console.error(error);
      res.status(500).send('Error:' + error);
      });
    }
 })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error:' + error);
    });
});

// Read or Get all users

app.get('/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
  })
  .catch((err) => {console.error(err);
    res.status(500).send("error:" + err);
  });
});

// Gets a user by username
app.get('/users/:Username', (req, res) => {
  Users.findOne({Username: req.params.Username })
    .then((user) => {
      res.json(user);
  })
  .catch((err) => {console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Reads the list of ALL movies

app.get('/movies', (req, res) => {
  Movies.find()
  .then((movies) => {
  res.status(201).json(movies);
})
.catch((err) => {console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Read the data about a movie, by title

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({'Title': req.params.Title })
    .then((movie) => {
      res.json(movie);
  })
.catch((err) => {console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Read Movie Genre

app.get('/movies/genres/:Name', (req, res) => {
  Movies.findOne({'Genre.Name': req.params.Name })
    .then((movie) => {
      res.json(movie.Genre);
  })
  .catch((err) => {console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//Read Directors information

app.get('/movies/directors/:Name', (req, res) => {
  Movies.findOne({'Director.Name': req.params.Name })
    .then((movie) => {
      res.json(movie.Director);
  })
  .catch((err) => {console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

// Update user information

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({Username: req.params.Username},
    { $set:
      {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    },
    { new: true},
    (err, updatedUser)=> {
    if (err) {
      console.error(err);
      res.status(500).send('Error:' + err);
  } else {
    res.json(updatedUser);
  }
  });
});

// Update User favourite movie

  app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
      { $push: { FavouriteMovies: req.params.MovieID }
    },
    { new: true},
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error:' + err);
      }else{
        res.json(updatedUser); 
      }
    });
  });


// Deletes Users favourite movie

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username},
      { $pull: { FavouriteMovies: req.params.MovieID }
    },
     { new: true},
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error:' + err);
      }else{
        res.json(updatedUser); 
      }
    });
  });


// Deletes a User from Users list using User ID

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({Username: req.params.Username})
  .then((user) =>{  
  if (!user) {
    res.status(400).send(req.params.Username +' was not found.');
  } else {
    res.status(200).send(req.params.Username + ' was deleted.');
    }
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('There was an error. Please try again.');
});


app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});