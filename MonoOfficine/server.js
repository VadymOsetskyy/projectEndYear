const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');

var http = require('http').createServer(app);
const MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');

const url = 'mongodb+srv://admin:wenandrea123@andreawen-jytg8.mongodb.net/test?retryWrites=true,{useNewUrlParser: true}';
const io = require('socket.io')(5000, http);

//start angular perojwct
//ng serve --host 0.0.0.0 --port 8080 --disableHostCheck

app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

io.on("connection", socket => {
  console.log('connected')
  socket.on("biciRent", msg => {
    io.emit("biciPrenotata", msg.id);
    mono_Pren_handler(msg.id)
  });

  socket.on('fineNolleggio', msg => {
    insertFNol(msg);
    console.log('finito nolleggio')
  })

})

function mono_Pren_handler(id) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Tecnologie");
    console.log(id)
    dbo.collection("Monopattini").findOne({ _id:  new mongo.ObjectID(id) }, function(err, result) {
      if (err) throw err;
      db.close();
      console.log(result)
      if (result.stato == false) {
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("Tecnologie");
          dbo.collection("Monopattini").updateOne({ _id:  new mongo.ObjectID(id) }, { $set: { 'stato': true } }, function(err, result) {
            if (err) throw err;
            db.close();
      console.log(result)
            console.log('asdasdasda')

          })
        })
      }

    })
  })
}

function insertFNol(msg) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Tecnologie");
    dbo.collection("Noleggio").insertOne(msg.infoNol, function(err, result) {
      if (err) throw err;
      db.close();
      console.log('inserito dati nol')

    })
  })
  fine_Nol_handler(msg._id)
}

function fine_Nol_handler(id){
  MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("Tecnologie");
          dbo.collection("Monopattini").updateOne({ _id:  new mongo.ObjectID(id) }, { $set: { 'stato': false } }, function(err, result) {
            if (err) throw err;
            db.close();
            console.log('aggiornato dati flase_')

          })
        })
}

app.get('/login/:log/:pass', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log(req.params.log)
    var dbo = db.db("Tecnologie");
    dbo.collection("Users").findOne({ username: req.params.log, password: req.params.pass }, function(err, result) {
      if (err) throw err;
      db.close();
      console.log(result)
      if (result)
        res.send({ result: result })
      else
        res.send({ result: 'Error' })
    })
  })
})

app.post('/register', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Tecnologie");
    dbo.collection("Users").insertOne({ username: req.body.log, password: req.body.pass }, function(err, result) {
      if (err)
        throw err;
      db.close();
      res.send({ result: "inserito" })
    })
  })
})

app.get('/getMonopatini', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Tecnologie");
    dbo.collection("Monopattini").find({}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      console.log(result)
      if (result)
        res.send(result)
      else
        res.send({ result: 'Error' })
    })
  })
})

app.listen(3000, function() {
});
