const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
// this library is to contact with file 
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host:conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

// npm install --save multer
// it is to use the multer library
// multer library? 중복되지 않는 형태로 올라가게 됨.
// AWS의 s3 서비스를 사용하면 효과적. why? 데이터베이스와 서버에 업로드된 이미지가
// 완전히 일치한다는 것을 보장하기 힘듬.
const multer = require('multer');
const upload = multer({dest: './upload' });

app.get('/api/customers', (req, res) => {
    // res.send();
    connection.query(
      "SELECT * FROM CUSTOMER",
      (err,rows,fields) => {
          res.send(rows);
      }
    );
});

app.use('/image', express.static('./upload'));
// basically, it gets binary data type from server by 'image' variable -> upload.single('image') 
// it gets together with filename;
app.post('/api/customers', upload.single('image'), (req,res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  // to check if the data works successfully
  // console.log(image);
  // console.log(name);
  // console.log(birthday);
  // console.log(gender);
  // console.log(job);

  // send the rows of data to server
  connection.query(sql, params,
    (err,rows, fields) => {
        res.send(rows);
        console.log("error: ", err, "\nrows: ", rows);
    })
});

// listening port
app.listen (port, () => console.log(`Listening on port ${port}`));
 