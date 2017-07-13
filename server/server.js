const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/users/:userID/:name', (req, res) => {
  let userID = req.params.userID;
  let name = req.params.name;
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`INSERT INTO tasks users ('${userID}', '${name}') ON CONFLICT DO NOTHING`, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result); }
    });
  });
});

app.post('/tasks/:userID/:task/:timeSpent/', function(request, response) {
  let userID = request.params.userID;
  let task = request.params.task;
  let timeSpent = request.params.timeSpent;
  let date = new Date();
  date = date.toISOString().substring(0, 10);

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`INSERT INTO tasks values ('${userID}', '${task}', '${timeSpent}', '${date}')`, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result); }
    });
  });
});

app.get('/tasks/:id', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`SELECT * FROM tasks WHERE user_id='${request.params.id}'`, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result); }
    });
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});

module.exports = app;
