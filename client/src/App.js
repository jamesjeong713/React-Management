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
  }
});

class App extends Component {

  // state 는 변경될 수 있는 데이터를 명시할 때,
  state = {
    customers: ""
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async() => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
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
        { this.state.customers ? this.state.customers.map(c => { 
          return (<Customer key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>);
        }) : "N/A" }
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
