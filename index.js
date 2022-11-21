const express = require('express'),
  morgan = require('morgan'),
  path = require('path');

const app = express();

// setup the logger

app.use(morgan('combined'));

app.use(express.static('public'));


let myMovies = [
  {
    title: 'The Life of Brian',
    year: '1979',
    director: 'Terry Jones'
  },
  {
    title: 'Lord of the Rings, The Fellowship of the Ring',
    year: '2001',
    director: 'Peter Jackson'
  },
  {
    title: 'Lord of the Rings, The Two Towers',
    year: '2002',
    director: 'Peter Jackson'
  },
  {
    title: 'Lord of the Rings, Return of the King',
    year: '2003',
    director: 'Peter Jackson'
  },
  {
    title: 'Chocolate',
    year: '2000',
    director: 'Lasse Hallström'
  },
  {
    title: 'Dune',
    year: '1984',
    director: 'David Lynch'
  },
  {
    title: 'The Bourne Identity',
    year: '2002',
    director: 'Doug Liman'
  },
  {
    title: 'The Bourne Supremacy',
    year: '2004',
    director: 'Paul Greengrass'
  },
  {
    title: 'The Bourne Ultimatum',
    year: '2007',
    director: 'Paul Greengrass'
  },
  {
    title: 'Jason Bourne ',
    year: '2016',
    director: 'Paul Greengrass'
  }
];

// get requests middleware 

app.get('/', (req, res, next) => {
  res.send('Welcome to my Movie app!');
});

app.get('/documentation', (req, res, next) => {                  
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/movies', (req, res, next) => {
  res.json(myMovies);
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oops....something went wrong!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});