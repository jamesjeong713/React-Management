import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { async } from 'rxjs/internal/scheduler/async';

const styles = theme => ({
  root: {
    witdth: '100%',
    marginTop: theme.spacing.unit *3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
    // 가로 길이가 1080 보다 작아지면 스크롤이 나오게 하는 css
  },
  progress: {
    margin: theme.spacing.unit*2
  }
});

class App extends Component {

  // state 는 변경될 수 있는 데이터를 명시할 때,
  state = {
    customers: "",
    // progress bar는 0% 에서 100%까지 
    completed: 0
  }

  componentDidMount() {
    // 0.02초마다 프로그레스 함수가 수행될 수 있도록 해주는 것
    this.timer = setInterval (this.progress, 20);  
    // if you comment it, you can test progress bar easily
    // because default customer is empty ("") so that data is getting
    // the data continuosly. 
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState( { completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    // props는 변경될 수 없는 데이터를 명시할 때,
    const { classes } = this.props; 
    return (
      <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Job</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {/* {customers.map(c => { return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.name} gender={c.gender} job={c.job}/> ); }) } */}
        {this.state.customers ? this.state.customers.map(c => {
              return ( <Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/> );
            }) : 
          <TableRow>
            <TableCell colSpan="6" align="center">
              <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
            </TableCell>
          </TableRow>
        }
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
