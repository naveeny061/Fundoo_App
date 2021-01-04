import React from "react";
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Service from '../../Services/userService'
import {Redirect} from 'react-router-dom'
import './forgetPassword.css';
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from '@material-ui/core'

const service = new Service();

export default class forgetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        redirect:false,
        email:'',
        emailErrorFlag:false,
        emailMsg:"Enter recovery email",
        snackbarOpen: false,
        snackbarMsg:"Email is send"
        };
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
            emailErrorFlag:false,
            emailMsg:"Enter recovery email"
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
        return isValid;   
    }
    onSubmit =()=>{
        if(!this.validate()){
            console.log('forget password fail');
        }
        else{
            let userData = {
                "email": this.state.email
            }
            service.forgetPassword(userData).then(data=>{
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
                'email':''
            })
        }
    }    
    render(){
        if(this.state.redirect){
            console.log(this.state.redirect)
            return <Redirect to='/signIn' />
        }
        return <div className='main2'>
            <div className='mainHeading'>
                <h1 className='F'>F</h1>
                <h1 className='U'>u</h1>
                <h1 className='N'>n</h1>
                <h1 className='D'>d</h1>
                <h1 className='O'>o</h1>
                <h1 className='U'>o</h1>
            </div>
            <h2 className='header'>Account recovery</h2>
            <div className='mainFile-forget'>
            <TextField className='textField email-forget' name='email' label="Email" value={this.state.email} onChange={this.handleChange} 
             error={this.state.emailErrorFlag} helperText={this.state.emailMsg} variant="outlined" size="medium" />
            <Button className='button next-forget' variant="contained" color="primary" onClick={this.onSubmit} value='submit' >Next</Button>
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