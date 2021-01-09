import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Services from '../../Services/userService'
import {Redirect} from 'react-router-dom'
import SnackBar from "@material-ui/core/Snackbar";
import './signIn.css'
import { IconButton } from '@material-ui/core'

const  service = new Services();

export default class signIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        redirect:false,
        password: '',
        passwordErrorFlag:false,
        passwordMsg:'',
        email:'',
        emailErrorFlag:false,
        emailMsg:'',
        snackbarOpen: false,
        snackbarMsg:"sucessful"
        };
    }
    snackbarClose = (event) =>{
        this.setState({
            snackbarOpen:false
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })  
    }
    onSubmit =()=>{

        if(!this.validate()){
            console.log('login fail');
        }
        else{
            let userData = {
                "email": this.state.email,
                "password": this.state.password
            }
            service.login(userData).then(data=>{
                console.log(data);
                localStorage.setItem("userToken",data.data.id);
                this.setState(
                    {
                        snackbarOpen: true
                    })
                    setTimeout(() => {
                     this.setState({
                        redirect:true
                     })   
                    }, 3000);
            }).catch(error=>{
                console.log(error);
            })
            this.setState({
                email:'',
                password:''
            })
        }
    }
    validate = () =>{
        var isValid = true
        this.setState({
            emailErrorFlag:false,
            emailMsg:'',
            passwordErrorFlag:false,
            passwordMsg:'',
        })     
        if(this.state.email.length === 0){
            this.setState({
                emailErrorFlag:true,
                emailMsg:'Email is required'
            })
            isValid = false
        }else if(!this.state.email.match(/^[a-zA-Z][a-zA-Z0-9]*([.+-][a-zA-Z0-9]+)*(@[a-zA-Z0-9]+[.][a-zA-Z0-9]{2,})([.][a-zA-Z]{2,4})?$/)) {
            this.setState({
                emailErrorFlag : true,
                emailMsg:'Email is not valid'
            })
            isValid = false
        }
        if(this.state.password.length === 0){
            this.setState({
                passwordErrorFlag : true,
                passwordMsg:'Password is required'
            })
            isValid = false
        }else if(!this.state.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/)) {
            this.setState({
                passwordErrorFlag : true,
                passwordMsg:'Password is not valid'
            })
            isValid = false
        }
        return isValid;   
    }
    
    render(){
        if(this.state.redirect){
                return <Redirect to='/Dashboard' />
        }
        return <div className='main1'>
                <div className='mainHeading'>
                    <h1 className='F marginUnset'>F</h1>
                    <h1 className='U marginUnset'>u</h1>
                    <h1 className='N marginUnset'>n</h1>
                    <h1 className='D marginUnset'>d</h1>
                    <h1 className='O marginUnset'>o</h1>
                    <h1 className='U marginUnset'>o</h1>
                </div>
                    <h1 className='heading'>Sign in</h1>
                    <name1 className='subHeading'>Use your fundoo account</name1>
                    <form className='form'>
                        <TextField className='field' value={this.state.email} name = 'email' onChange={this.handleChange} error={this.state.emailErrorFlag} label="Email Id" 
                        variant="outlined" size="small"  helperText={this.state.emailMsg}/>
                        <TextField className='field' value={this.state.password} name = 'password' onChange={this.handleChange} error={this.state.passwordErrorFlag} label="Password"
                         type='password' variant="outlined"  size="small" helperText={this.state.passwordMsg} />
                        <Button className='forgetPassword' href="./forgetPassword" color="primary">Forget Password?</Button>
                        <div className='rowSignIn'>
                            <a href="./registration">Create account</a>
                            <Button className='button' variant="contained" color="primary" onClick={this.onSubmit}>Next</Button>
                        </div>
                    </form>
                    <SnackBar 
                    anchorOrigin={{vertical:'bottom',horizontal:'center'}}
                    open = {this.state.snackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}
                    message={this.state.snackbarMsg}
                    action={[
                        <IconButton 
                        key='close'
                        arial-label='close'
                         color='inherit'
                        onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                    />
        </div>
    }
}
