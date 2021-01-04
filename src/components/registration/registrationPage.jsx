import React from 'react'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Service from '../../Services/userService'
import {Redirect} from 'react-router-dom'
import './registrationPage.css'
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from '@material-ui/core'

const service = new Service();

export default class registrationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        redirect:false,
        hidden: true,
        password: '',
        passwordErrorFlag:false,
        passwordMsg:'',
        confirmPassword: '',
        confirmPasswordErrorFlag:false,
        confirmPasswordMsg:'',
        firstName: '',
        firstNameErrorFlag:false,
        firstNameMsg:'',
        lastName:'',
        lastNameErrorFlag:false,
        lastNameMsg:'',
        email:'',
        emailErrorFlag:false,
        emailMsg:"You can use letters,numbers and periods ",
        snackbarOpen: false,
        snackbarMsg:"Registration Completed"
        };
        this.toggleShow = this.toggleShow.bind(this);
    }
    snackbarClose = (event) =>{
        this.setState({
            snackbarOpen:false
        })
    }
    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    validate = () =>{
        var isValid = true
        this.setState({
            firstNameErrorFlag:false,
            firstNameMsg:'',
            lastNameErrorFlag:false,
            lastNameMsg:'',
            emailErrorFlag:false,
            emailMsg:"You can use letters,numbers and periods ",
            passwordErrorFlag:false,
            passwordMsg:'',
            confirmPasswordErrorFlag:false,
            confirmPasswordMsg:'',
        })
        if(this.state.firstName.length === 0){
            this.setState({
                firstNameErrorFlag:true,
                firstNameMsg:'Name is required'
            })
            isValid = false
        }else if(!this.state.firstName.match(/^[A-Z][a-z]{2,}$/)) {
            this.setState({
                firstNameErrorFlag : true,
                firstNameMsg:'Name is not valid'
            })
            isValid = false
        }
        if(this.state.lastName.length === 0){
            this.setState({
                lastNameErrorFlag:true,
                lastNameMsg:'Name is required'
            })
            isValid = false
        }else if(!this.state.lastName.match(/^[A-Z][a-z]{2,}$/)) {
            this.setState({
                lastNameErrorFlag : true,
                lastNameMsg:'Name is not valid'
            })
            isValid = false
        }     
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
        if(this.state.confirmPassword.length === 0 ){
            this.setState({
                confirmPasswordErrorFlag : true,
                confirmPasswordMsg:'Password is required'
            })
            isValid = false
        }else if(this.state.confirmPassword !== this.state.password ){
            this.setState({
                confirmPasswordErrorFlag : true,
                confirmPasswordMsg:'Password does not match'
            })
            isValid = false
        }
        return isValid;   
    }
    onSubmit =()=>{
        if(!this.validate()){
            console.log('registration fail');
        }
        else{
            let userData = {
                "firstName":this.state.firstName,
                "lastName":this.state.lastName,
                "email": this.state.email,
                "password": this.state.password,
                "service":"advance"
            }
            service.registration(userData).then(data=>{
                console.log(data);
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
                "firstName":"",
                "lastName":"",
                "email":"",
                "password":"",
                "confirmPassword":""
            })
        }
    }
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
      }
    render(){
        if(this.state.redirect){
            console.log(this.state.redirect)
            return <Redirect to='/signIn' />
        }
        return <div className='main'>
                    <div className='mainHeading'>
                    <h1 className='F'>F</h1>
                    <h1 className='U'>u</h1>
                    <h1 className='N'>n</h1>
                    <h1 className='D'>d</h1>
                    <h1 className='O'>o</h1>
                    <h1 className='U'>o</h1>
                    </div>
                    <h2 className='header'>Create Your Fundoo Account</h2>
                    <div className='mainFile'>
                        <form>
                            <div className='row'>
                                <TextField className='textField mr' name='firstName' label="First Name" value={this.state.firstName}
                                 error={this.state.firstNameErrorFlag} onChange={this.handleChange} variant="outlined" size="small" 
                                 helperText={this.state.firstNameMsg}/>
                                <TextField className='textField '  name='lastName' label="Last Name" value={this.state.lastName} 
                                 error={this.state.lastNameErrorFlag} onChange={this.handleChange} variant="outlined" size="small"
                                 helperText={this.state.lastNameMsg}/>
                            </div>
                            <div className='row'>
                                <TextField className='textField email' name='email' label="Email" value={this.state.email} 
                                            error={this.state.emailErrorFlag} onChange={this.handleChange} variant="outlined" size="small" 
                                            helperText={this.state.emailMsg} />
                            </div>
                            <div className='row'>
                                <TextField className='textField mr' name='password' label="Password" type={this.state.hidden ? 'password' : 'text'} 
                                            value={this.state.password} error={this.state.passwordErrorFlag} onChange={this.handleChange} 
                                            variant="outlined"  size="small" helperText={this.state.passwordMsg} />
                                <TextField className='textField' label="Confirm Password" name='confirmPassword' 
                                            type={this.state.hidden ? 'password' : 'text'} value={this.state.confirmPassword} 
                                            error={this.state.confirmPasswordErrorFlag} onChange={this.handleChange} variant="outlined" size="small" 
                                            helperText={this.state.confirmPasswordMsg}/>
                            </div>
                            <div className='row'>                
                                <Checkbox color="primary" onClick={this.toggleShow} />
                                <label className='showPassword'>Show Password</label>
                            </div>
                            <div className='sign'>
                                <Button className='button' href="./signIn" color="primary">Sign in instead</Button>
                                <Button className='button next' variant="contained" color="primary" onClick={this.onSubmit} value='submit' >Next</Button>
                            </div>
                        </form>
                        <img src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="" width="200" height="200" className="image" />
                    </div>
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