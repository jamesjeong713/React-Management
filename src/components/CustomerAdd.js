import React from 'react';
import { post } from 'axios';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        }
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                // 고객을 추가한 이후에 서버로부터 응답을 받고,
                // 고객을 불러올 필요가 있음. 
                this.props.stateRefresh();
            })
        // for test to post data to server
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: ''
        })
    }
    // in html, to make function of handldeFileChange and handleValueChange
    handleFileChange = (e) => {
        this.setState({
            // to change file value in state
            // e.target.files: event가 발생한 input value의 set file value
            file: e.target.files[0],
            fileName: e.target.value

        })
    }

    // e라는 이벤트 변수를 매개변수로 받은 뒤에,
    handleValueChange = (e) => {
        let nextState = {};
        // 사용자가 입력 또는 선택한 변경된 value를 userName이라는 것으로 변경하겠다.
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    // to make the code for onChnage function in form html
    addCustomer = () => {
        const url='/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file)
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday)
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        // 기본적으로 파일이 포함되어 있는 데이터를 서버로 전송하고자 할때는
        // 웹 표준에 맞는 태그를 추가해줘야 한다.
        const config = {
            headers: {
                //전달하고자 하는 것에 파일이 포함되어 있으면 넣어줘야 함.
                'content-type': 'multipart/form-data'
            }
        }
        // npm install --save axios 
        // post 라이브러리를 이용해서, 해당 url에 form데이터를 해당 환경설정에 맞게,
        // 헤더를 붙여서 실제로 서버로 데이터를 보낼 수 있게 해주는 것.
        return post(url, formData, config);
    }

    render() {
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>Add Customer</h1>
                Profile Image: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                <br />
                Name: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/>
                <br />
                Birthday: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/>
                <br />
                Gender: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/>
                <br />
                Job: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/>
                <br />
                <button type="submit"> Add </button>
            </form>
        );
    }
}

export default CustomerAdd;