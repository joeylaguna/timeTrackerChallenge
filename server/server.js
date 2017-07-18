const express = require('express');
const path = require('path');
var pg = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.post('/users/:userID/:name', (req, res) => {
  let userID = req.params.userID;
  let name = req.params.name;
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`INSERT INTO users values ('${userID}', '${name}')`, function(err, result) {
      done();
      if (err)
       { console.error(err); res.send("Error " + err); }
      else
       { res.send(result); }
    });
  });
});

app.post('/tasks/:userID/:task/:timeSpent/:taskID', function(request, response) {
  let userID = request.params.userID;
  let task = request.params.task;
  let timeSpent = request.params.timeSpent;
  let taskID = request.params.taskID;
  let date = new Date();
  date = date.toISOString().substring(0, 10);

  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`INSERT INTO tasks (user_id, task_name, time_spent, date, task_id) values ('${userID}', '${task}', '${timeSpent}', '${date}', ${taskID})`, function(err, result) {
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

app.get('/users', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`SELECT user_id, name FROM users`, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result); }
    });
  });
});

app.post('/update/:userID/:index/:taskName/:timeSpent', function(request, response) {
  let index = request.params.index+1;
  let taskName = request.params.taskName;
  let timeSpent = request.params.timeSpent;
  let userID = request.params.userID;
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`UPDATE tasks SET task_name = '${taskName}', time_spent='${timeSpent}'  where task_name=${taskName} AND user_id='${userID}'`, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.send(result); }
    });
  });
});

app.get('/tasks', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(`SELECT * FROM tasks`, function(err, result) {
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
