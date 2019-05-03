import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'

const customers = [
  {
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': 'James',
  'brithday': '871222',
  'gender': 'male',
  'job': 'student'
  },
  {
    'id': 2,
    'image': 'https://placeimg.com/64/64/2',
    'name': 'John',
    'brithday': '911212',
    'gender': 'male',
    'job': 'student'
  },
  {
    'id': 3,
    'image': 'https://placeimg.com/64/64/3',
    'name': 'Ahnaf',
    'brithday': '921212',
    'gender': 'male',
    'job': 'student'
  }
]

class App extends Component {
  render() {
    return (
      <div>
        {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
              );
          })
        }
      </div>
    );
  }
}

export default App;
