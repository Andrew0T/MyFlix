const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    name: 'Paul',
    favouriteMovies: ['Dune']
  },
  {
    id: 2,
    name: 'Peter',
    favouriteMovies: []
  },
  {
    id: 3,
    name: 'Mary',
    favouriteMovies: ['Chocolat']
  },
 ]

let movies = [
  {
    'title': 'The Life of Brian',
    'description': 'A young man, Brian, who was born one stable down and on the same night as Jesus, becomes intrigued by a young rebel, Judith. To try and impress her, Brian joins the independence movement against the Romans, the Peoples Front of Judea. However, in an attempt to hide from the Romans, he relays some of the teachings he heard from Jesus, which ends up spurring a crowd to believe he is the Messiah. While trying to get rid of his followers and reunite with Judith, he embarks on several misadventures.',
    'genre': {
      'name': 'Comedy',
       'description': 'A comedy film emphasizes humor and are designed to make the audience laugh. Films in this style traditionally have a happy ending, however black comedy can be an exception.'
          },
    'year': '1979',
    'director': {
      'name': 'Terry Jones',
      'bio': 'Terence Jones was born 1 February 1942 and died 21 January 2020. He was a Welsh comedian, director, historian, actor, writer and member of the Monty Python comedy team. After graduating from Oxford University with a degree in English, Jones and writing partner Michael Palin wrote and performed for several high-profile British comedy programmes, including Do Not Adjust Your Set and The Frost Report, before creating Monty Python\'s Flying Circus with Cambridge graduates Graham Chapman, John Cleese, and Eric Idle and American animator-filmmaker Terry Gilliam. Jones was largely responsible for the programme\'s innovative, surreal structure, in which sketches flowed from one to the next without the use of punch lines.            He made his directorial debut with the Python film Holy Grail, which he co-directed with Gilliam, and also directed the subsequent Python films Life of Brian and The Meaning of Life.Jones co-created and co-wrote with Palin the anthology series Ripping Yarns. He also wrote an early draft of Jim Henson\'s film Labyrinth and is credited with the screenplay, though quite little of his work actually remained in the final cut. Jones was a well-respected medieval historian, having written several books and presented television documentaries about the period, as well as a prolific children\'s book author. In 2016, Jones received a Lifetime Achievement award at the BAFTA Cymru Awards for his outstanding contribution to television and film. After living for several years with a degenerative aphasia, he gradually lost the ability to speak and died in 2020 from frontotemporal dementia.',
      'birth': 1942.2020
     }
  },
  {
    'title': 'Lord of the Rings, The Fellowship of the Ring',
    'description': 'A young hobbit, Frodo, who has found the One Ring that belongs to the Dark Lord Sauron, begins his journey with eight companions to Mount Doom, the only place where it can be destroyed.',
    'genre': {
      'name': 'Fantasy',
      'description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
          },
    'year': '2001',
    'director': {
      'name' : 'Peter Jackson',
      'bio': 'Sir Peter Robert Jackson ONZ KNZM was born 31 October 1961, is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the third-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide. Jackson began his career with the splatstick horror comedy Bad Taste (1987) and the black comedy Meet the Feebles (1989) before filming the zombie comedy Braindead (1992). He shared a nomination for Academy Award for Best Original Screenplay with his partner Fran Walsh for Heavenly Creatures, which brought him to mainstream prominence in the film industry. Jackson has been awarded three Academy Awards for The Lord of the Rings: The Return of the King (2003), including the award for Best Director. His other awards include three BAFTAs, a Golden Globe, two Primetime Emmy Awards and four Saturn Awards among others. His production company is WingNut Films, and his most regular collaborators are co-writers and producers Walsh and Philippa Boyens. Jackson was made a Companion of the New Zealand Order of Merit in 2002. He was later knighted (as a Knight Companion of the order) by Sir Anand Satyanand, the Governor-General of New Zealand, at a ceremony in Wellington in April 2010. In December 2014, Jackson was awarded a star on the Hollywood Walk of Fame.',
      'birth': 1961.0
    }
  },
  {
    'title': 'Lord of the Rings, The Two Towers',
    'description': 'Frodo and Sam arrive in Mordor with the help of Gollum. A number of new allies join their former companions to defend Isengard as Saruman launches an assault from his domain.',
    'year': '2002',
    'genre': {
      'name': 'Fantasy',
      'description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
          },
    'director': {
      "name" : "Peter Jackson",
      "bio": "Sir Peter Robert Jackson ONZ KNZM was born 31 October 1961, is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the third-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide. Jackson began his career with the splatstick horror comedy Bad Taste (1987) and the black comedy Meet the Feebles (1989) before filming the zombie comedy Braindead (1992). He shared a nomination for Academy Award for Best Original Screenplay with his partner Fran Walsh for Heavenly Creatures, which brought him to mainstream prominence in the film industry. Jackson has been awarded three Academy Awards for The Lord of the Rings: The Return of the King (2003), including the award for Best Director. His other awards include three BAFTAs, a Golden Globe, two Primetime Emmy Awards and four Saturn Awards among others. His production company is WingNut Films, and his most regular collaborators are co-writers and producers Walsh and Philippa Boyens. Jackson was made a Companion of the New Zealand Order of Merit in 2002. He was later knighted (as a Knight Companion of the order) by Sir Anand Satyanand, the Governor-General of New Zealand, at a ceremony in Wellington in April 2010. In December 2014, Jackson was awarded a star on the Hollywood Walk of Fame.",
      "birth": 1961.0
    }
  },
  {
    'title': 'Lord of the Rings, Return of the King',
    'description': 'The former Fellowship members prepare for the final battle. While Frodo and Sam approach Mount Doom to destroy the One Ring, they follow Gollum, unaware of the path he is leading them to.',
    'year': '2003',
    'genre': {
      'name': 'Fantasy',
       'description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
          },
    'director': {
      'name' : 'Peter Jackson',
      'bio': 'Sir Peter Robert Jackson ONZ KNZM was born 31 October 1961, is a New Zealand film director, screenwriter and producer. He is best known as the director, writer and producer of the Lord of the Rings trilogy (2001–2003) and the Hobbit trilogy (2012–2014), both of which are adapted from the novels of the same name by J. R. R. Tolkien. Other notable films include the critically lauded drama Heavenly Creatures (1994), the horror comedy The Frighteners (1996), the epic monster remake film King Kong (2005), the World War I documentary film They Shall Not Grow Old (2018) and the documentary The Beatles: Get Back (2021). He is the third-highest-grossing film director of all-time, his films having made over $6.5 billion worldwide. Jackson began his career with the splatstick horror comedy Bad Taste (1987) and the black comedy Meet the Feebles (1989) before filming the zombie comedy Braindead (1992). He shared a nomination for Academy Award for Best Original Screenplay with his partner Fran Walsh for Heavenly Creatures, which brought him to mainstream prominence in the film industry. Jackson has been awarded three Academy Awards for The Lord of the Rings: The Return of the King (2003), including the award for Best Director. His other awards include three BAFTAs, a Golden Globe, two Primetime Emmy Awards and four Saturn Awards among others. His production company is WingNut Films, and his most regular collaborators are co-writers and producers Walsh and Philippa Boyens. Jackson was made a Companion of the New Zealand Order of Merit in 2002. He was later knighted (as a Knight Companion of the order) by Sir Anand Satyanand, the Governor-General of New Zealand, at a ceremony in Wellington in April 2010. In December 2014, Jackson was awarded a star on the Hollywood Walk of Fame.',
      'birth': 1961.0
    }
  },
  {
    'title': 'Chocolat',
    'description': 'A woman and her daughter open a chocolate shop in a conservative village in France, much to the villager\'s disapproval. Over time, they win the people\'s hearts and also help them with their troubles.',
    'year': '2000',
    'genre': {
      'name': 'Romantic Drama',
       'description': 'Romantic dramas are films with central themes that reinforce our beliefs about love. The story typically revolves around characters falling into (and out of, and back into) love.'
          },
    'director': {
      'name': 'Lasse Hallstroem',
    'bio': 'Lars Sven (Lasse) Hallstroem was born 2 June 1946 is a Swedish film director. He first became known for directing almost all the music videos by the pop group ABBA, and subsequently became a feature film director. He was nominated for an Academy Award for Best Director for My Life as a Dog (Mitt liv som hund) (1985) and later for The Cider House Rules (1999). His other celebrated directorial works include What\'\s Eating Gilbert Grape (1993) and Chocolat (2000).',
    'birth': 1946.0
    }
  },
  {
    'title': 'Dune',
    'description': 'Paul Atreides arrives on Arrakis after his father accepts the stewardship of the dangerous planet. However, chaos ensues after a betrayal as forces clash to control melange, a precious resource.',
    'year': '1984',
    'genre': {
      'name': 'Fantasy',
       'description': 'Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.'
          },
    'director': {
      'name': 'David Lynch',
      'bio': 'David Lynch, born January 20, 1946, is an American filmmaker, painter, visual artist, actor, musician, writer, and philanthropist. A recipient of an Academy Honorary Award in 2019, Lynch has received three Academy Award nominations for Best Director, and the Cesar Award for Best Foreign Film twice, as well as the Palme d\'Or at the Cannes Film Festival and a Golden Lion award for lifetime achievement at the Venice Film Festival. In 2007, a panel of critics convened by The Guardian announced that (after all the discussion, no one could fault the conclusion that David Lynch is the most important film-maker of the current era), while AllMovie called him (the Renaissance man of modern American filmmaking). His work led to him being labeled ,the first populist surrealist, by film critic Pauline Kael. Lynch studied painting before he began making short films in the late 1960s. His first feature-length film, the surrealist Eraserhead (1977), became a success on the midnight movie circuit, and he followed that by directing The Elephant Man (1980), Dune (1984), and Blue Velvet (1986). Lynch next created his own television series with Mark Frost, the murder mystery Twin Peaks (1990–91), which initially ran for two seasons. He also made the film prequel Twin Peaks: Fire Walk with Me (1992) and the road film Wild at Heart (1990) in the same period. Turning further towards surrealist filmmaking, three of his subsequent films operated on dream logic non-linear narrative structures: Lost Highway (1997), Mulholland Drive (2001), and Inland Empire (2006). Lynch and Frost reunited in 2017 for the third season of Twin Peaks, which aired on Showtime. Lynch co-wrote and directed every episode, and reprised his onscreen role as Gordon Cole. His other artistic endeavors include his work as a musician, encompassing the studio albums BlueBOB (2001), Crazy Clown Time (2011), and The Big Dream (2013), as well as music and sound design for a variety of his films (sometimes alongside collaborators Alan Splet, Dean Hurley, and-or Angelo Badalamenti); painting and photography; writing the books Images (1994), Catching the Big Fish (2006), Room to Dream (2018), and numerous other literary works; and directing several music videos such as the video for (Shot in the Back of the Head) by Moby, who in turn, directed a video for Lynch\'s The Big Dream, as well as advertisements, including the Dior promotional film Lady Blue Shanghai (2010). An avid practitioner of Transcendental Meditation, in 2005 he founded the David Lynch Foundation, which seeks to fund the teaching of TM in schools and has since widened its scope to other at-risk populations, including the homeless, veterans, and refugees.',
      'birth': 1946.0
        }
  },
  {
    'title': 'The Bourne Identity',
    'description': 'A man with a bullet-ridden body is found and looked after by strangers. He wakes up with a blank memory and begins a journey to learn his identity, unaware that the road ahead is full of danger.',
    'year': '2002',
    'genre': {
      'name': 'Action-Thiller',
       'description': 'Featuring guns, explosions, elaborate, and apocalypse set pieces, this movie type first developed in the 1970s and became the exemplar of the Hollywood mega-blockbuster in the 1980s. These films often feature a race against the clock, lots of violence and a clear—often flamboyantly evil—antagonist. Though they may involve elements of crime or mystery films, those aspects take a back seat to the action.'
          },
    'director': {
      'name': 'Doug Liman',
      'bio': 'Douglas Eric Liman, born July 24, 1965, is an American film director and producer. He is known for directing the films Swingers (1996), Go (1999), The Bourne Identity (2002), Mr. & Mrs. Smith (2005), Jumper (2008), Edge of Tomorrow (2014), and American Made (2017). Most of his career has been associated with the production company Hypnotic. He is co-owner with Dave Bartis, whom he met as an undergraduate at Brown University where they co-founded Brown Television (BTV) and the National Association of College Broadcasters (NACB). Liman is on the advisory board of the Legal Action Center and the Arthur Liman Public Interest Program at Yale Law School.',
      'birth': 1965.0
    }
  },
  {
    'title': 'The Bourne Supremacy',
    'description': 'When he is falsely framed in a CIA operation, Jason Bourne is forced to return to his old ways as an assassin, in order to figure out why they are still after him.',
    'year': '2004',
    'genre': {
      'name': 'Action-Thiller',
       'description': 'Featuring guns, explosions, elaborate, and apocalypse set pieces, this movie type first developed in the 1970s and became the exemplar of the Hollywood mega-blockbuster in the 1980s. These films often feature a race against the clock, lots of violence and a clear—often flamboyantly evil—antagonist. Though they may involve elements of crime or mystery films, those aspects take a back seat to the action.'
          },
    'director': {
      'name': 'Paul Greengrass',
      'bio': 'Paul Greengrass CBE was born 13 August 1955, is a British film director, film producer, screenwriter and former journalist. He specialises in dramatisations of historic events and is known for his signature use of hand-held cameras. His early film Bloody Sunday (2002), about the 1972 shootings in Derry, Northern Ireland, won the Golden Bear at 52nd Berlin International Film Festival. Other films he has directed include three in the Bourne action/thriller series: The Bourne Supremacy (2004), The Bourne Ultimatum (2007), and Jason Bourne (2016); United 93 (2006), for which he won the BAFTA Award for Best Director and received an Academy Award for Best Director nomination; Green Zone (2010); and Captain Phillips (2013). In 2004, he co-wrote and produced the film Omagh, which won the British Academy Television Award. In 2007, Greengrass co-founded Directors UK, a professional organisation of British filmmakers, and was its first president until 2014. In 2008, The Telegraph named him among the most influential people in British culture. In 2017, Greengrass was honoured with a British Film Institute Fellowship.',
      'birth': 1955.0
    }
  },
  {
    'title': 'The Bourne Ultimatum',
    'description': 'Jason Bourne sets off on a quest to uncover his dark past. However, to get to the end of the riddle, he must dodge the CIA agents who\'\re trying to kill him.',
    'year': '2007',
    'genre': {
      'name': 'Action-Thiller',
       'description': 'Featuring guns, explosions, elaborate, and apocalypse set pieces, this movie type first developed in the 1970s and became the exemplar of the Hollywood mega-blockbuster in the 1980s. These films often feature a race against the clock, lots of violence and a clear—often flamboyantly evil—antagonist. Though they may involve elements of crime or mystery films, those aspects take a back seat to the action.'
          },
    'director': {
      'name': 'Paul Greengrass',
      'bio': 'Paul Greengrass CBE was born 13 August 1955, is a British film director, film producer, screenwriter and former journalist. He specialises in dramatisations of historic events and is known for his signature use of hand-held cameras. His early film Bloody Sunday (2002), about the 1972 shootings in Derry, Northern Ireland, won the Golden Bear at 52nd Berlin International Film Festival. Other films he has directed include three in the Bourne action/thriller series: The Bourne Supremacy (2004), The Bourne Ultimatum (2007), and Jason Bourne (2016); United 93 (2006), for which he won the BAFTA Award for Best Director and received an Academy Award for Best Director nomination; Green Zone (2010); and Captain Phillips (2013). In 2004, he co-wrote and produced the film Omagh, which won the British Academy Television Award. In 2007, Greengrass co-founded Directors UK, a professional organisation of British filmmakers, and was its first president until 2014. In 2008, The Telegraph named him among the most influential people in British culture. In 2017, Greengrass was honoured with a British Film Institute Fellowship.',
      'birth': 1955.0
    }
  },
  {
    'title': 'Jason Bourne',
    'description': 'Jason Bourne, a former CIA agent, is drawn out of hiding by CIA director Robert Dewey. He then sets out to discover more about his past, family and his father\'s death.',
    'year': '2016',
    'genre': {
      'name': 'Action-Thiller',
       'description': 'Featuring guns, explosions, elaborate, and apocalypse set pieces, this movie type first developed in the 1970s and became the exemplar of the Hollywood mega-blockbuster in the 1980s. These films often feature a race against the clock, lots of violence and a clear—often flamboyantly evil—antagonist. Though they may involve elements of crime or mystery films, those aspects take a back seat to the action.'
          },
    'director': {
      'name': 'Paul Greengrass',
      'bio': 'Paul Greengrass CBE was born 13 August 1955, is a British film director, film producer, screenwriter and former journalist. He specialises in dramatisations of historic events and is known for his signature use of hand-held cameras. His early film Bloody Sunday (2002), about the 1972 shootings in Derry, Northern Ireland, won the Golden Bear at 52nd Berlin International Film Festival. Other films he has directed include three in the Bourne action/thriller series: The Bourne Supremacy (2004), The Bourne Ultimatum (2007), and Jason Bourne (2016); United 93 (2006), for which he won the BAFTA Award for Best Director and received an Academy Award for Best Director nomination; Green Zone (2010); and Captain Phillips (2013). In 2004, he co-wrote and produced the film Omagh, which won the British Academy Television Award. In 2007, Greengrass co-founded Directors UK, a professional organisation of British filmmakers, and was its first president until 2014. In 2008, The Telegraph named him among the most influential people in British culture. In 2017, Greengrass was honoured with a British Film Institute Fellowship.',
      'birth': 1955.0
      }
    }
  ]


// Creates new user

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser);
  } else {
      res.status(400).send('users name needed');
  }
 })


// Reads the list of ALL movies

app.get('/movies', (req, res) => {
  res.status(200).json(movies);
})


// Read the data about a movie, by title

app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
})

// Read Movie Genre

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find(movie => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
})


//Read Directors information

app.get('/movies/directors/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find(movie => movie.director.name === directorName).director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
})


// Update user information

app.put('/users/:id', (req, res) => {
  const {id} = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
      user.name = updatedUser.name;
      res.status(200).json(user)
  } else {
    res.status(400).send('no such user');
  }
  })

// Update User favourite movie

  app.put('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );

  if (user) {
      user.favouriteMovies.push(movieTitle);
      res.status(200).send(`${movieTitle} has been added to user ${id}\'s array`);
  } else {
    res.status(400).send('User not found');
  }
  })


// Deletes Users favourite movie

app.delete('/users/:id/:movieTitle', (req, res) => {
  const {id, movieTitle } = req.params;
  
  let user = users.find( user => user.id == id );

  if (user) {
      user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
      res.status(200).send(`${movieTitle} has been removed from user ${id}\'s array`);
  } else {
    res.status(400).send('User not found');
  }
  })


// Deletes a User from Users list using User ID

app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );
  
  if (user) {
    users = users.filter(user => user.id != id );
    res.status(200).send(`User ${id} was deleted.`);
    } else {
    res.status(400).send('User not found');
  }
  });


app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});