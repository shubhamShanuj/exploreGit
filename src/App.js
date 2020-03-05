import React from 'react'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import ChatBox from './components/ChatBox';
import LoginPage from './components/LoginPage';
import { AppBar, Toolbar } from '@material-ui/core';
import Axios from 'axios';


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            test: 0,
            isLoggedIn: false,
            allowedOpr : 'Login',
            header : 'Login Dashboard',
            username: '',
            secret: '',
            usersResponse : '',
            isAuthenticated : false
            
        }

      this.handleLogin = this.handleLogin.bind(this)
      this.toggleStatus = this.toggleStatus.bind(this)
      this.authenticateUser = this.authenticateUser.bind(this)
      this.onChangeSecret = this.onChangeSecret.bind(this)
      this.onChangeName = this.onChangeName.bind(this)
      this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        Axios
        .get('https://raw.githubusercontent.com/shubhamShanuj/exploreGit/master/db.json')
        .then(response => {
            this.setState({usersResponse: response.data})
        })
    }

    handleLogin(){
        this.authenticateUser();
        if(this.state.isAuthenticated){
            this.toggleStatus()
        }else{
            alert("Invalid credentials. Try again later...")
        }
    }

    authenticateUser(){
        console.log("I am not authenticated")
        const users = this.state.usersResponse;
        users.map(user => {
            console.log(user.username + user.secret + "::" + this.state.username + "-" +this.state.secret)
            if(user.username === this.state.username){
                console.log(">>> found username")
                if(user.secret === this.state.secret){
                    console.log(">>> Authenticated")
                    this.setState({isAuthenticated: true});
                }
            }
        } )
    }

    toggleStatus(){
        let isLoggedIn = this.state.isLoggedIn
        let msgBox 
        let header
        if(isLoggedIn){// may be opposite
            msgBox = 'Login'
            header = 'Login Dashboard'
        }else{
            msgBox = 'Sign-Out'
            header = 'Chat Dashboard'
        }
        
        this.setState({
            isLoggedIn : !isLoggedIn,
            allowedOpr: msgBox,
            header : header
        })
    }

    onChangeName(event){
        let val =  event.target.value;
        this.setState({
            username: val
        })
    }

    onChangeSecret(event){
        let val =  event.target.value;
        this.setState({
            secret: val
        })
    }

    render(){
        let chatBoxComponent;
        if(this.state.isLoggedIn){
            chatBoxComponent = <ChatBox />
        }else{
            chatBoxComponent = <LoginPage handleLogin={this.handleLogin} onChangeName={this.onChangeName} onChangeSecret={this.onChangeSecret} />
        }
        return(
            <Container style={{backgroundColor:'#b29add', height:'100%', width:'40%', boxShadow: '10px 10px 10px white'}} >
            <AppBar>
                <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                    <p> Vartalaap: An Instant Messenger</p>
                    <div>
                        <Button variant = "contained" color = "primary" onClick={this.handleLogin}> {this.state.allowedOpr} </Button>
                        &nbsp;	&nbsp;
                        <Button variant = "contained" color = "primary" >Sign-Up</Button>
                    </div>
                </Toolbar>
            </AppBar>
            <br/><br/><br/><br/><br/>
            <center>
                <div style={{boxShadow:'5px 5px 5px white'}}><h2>{this.state.header}</h2></div><br/><br/><br/><br/>
                {chatBoxComponent}
            </center>
            </Container>
        )
    }
}

export default App;