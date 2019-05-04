const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res)=> {
    res.send([
        {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': 'James',
        'birthday': '871222',
        'gender': 'male',
        'job': 'student'
        },
        {
          'id': 2,
          'image': 'https://placeimg.com/64/64/2',
          'name': 'John',
          'birthday': '911212',
          'gender': 'male',
          'job': 'student'
        },
        {
          'id': 3,
          'image': 'https://placeimg.com/64/64/3',
          'name': 'Ahnaf',
          'birthday': '921212',
          'gender': 'male',
          'job': 'student'
        }
    ]);
});
// listening port
app.listen (port, () => console.log(`Listening on port ${port}`));
