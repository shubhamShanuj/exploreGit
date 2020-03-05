import React from 'react'
import { TextField, Button } from '@material-ui/core';
import App from '../App';

class LoginPage extends React.Component{

    constructor(props){
        super(props);

    }

    toggleLoginStatus(){
        let app = new App();
        app.setState(
            {
                isLoggedIn: !app.state.isLoggedIn
            }
        )
        console.log()
    }

    render(){
        return (
            <center>
                <form noValidate autoComplete="on" >
                    <TextField id="username" label="Username" style={{width:'350px'}} onChange={this.props.onChangeName}/>
                    <br/>
                    <TextField type="password" id="password" label="Secret" style={{width:'350px'}} onChange={this.props.onChangeSecret}/>
                    <br/><br/><br/>
                    <Button variant = "contained" color = "primary" onClick={this.props.handleLogin}> ok </Button>
                </form>
                
            </center>
        )// Add a button below the form
    }
}

export default LoginPage;