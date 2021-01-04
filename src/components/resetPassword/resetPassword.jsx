import React from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Service from '../../Services/userService'
import {Redirect} from 'react-router-dom'
import './resetPassword.css'
import SnackBar from "@material-ui/core/Snackbar";
import { IconButton } from '@material-ui/core'

const service = new Service(); 

export default class forgetPassword extends React.Component{
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
        snackbarOpen: false,
        snackbarMsg:"Password changed"
        };
        this.toggleShow = this.toggleShow.bind(this);
    }
    snackbarClose = (event) =>{
        this.setState({
            snackbarOpen:false
        })
    }
    toggleShow() {
        this.setState({ hidden: !this.state.hidden });
    }
    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    validate = () =>{
        var isValid = true
        this.setState({
            passwordErrorFlag:false,
            passwordMsg:"",
            confirmPasswordErrorFlag:false,
            confirmPasswordMsg:"",
        })     
        if(this.state.password.length === 0){
            this.setState({
                passwordErrorFlag:true,
                passwordMsg:'Password is required',
            })
            isValid = false
        }else if(!this.state.password.match(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?!(?:.*[!@#$%^&*]){2})[a-zA-Z0-9!@#$%^&*]{8,}$/)) {
            this.setState({
                passwordErrorFlag : true,
                passwordMsg:'Password is not valid'
            })
            isValid = false
        }
        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                confirmPasswordErrorFlag:true,
                confirmPasswordMsg:'Password does ot match'
            })
            isValid = false
        }
        if(this.state.confirmPassword.length === 0){
            this.setState({
                confirmPasswordErrorFlag:true,
                confirmPasswordMsg:'Password is required'
            })
            isValid = false
        }
        return isValid;   
    }
    token = this.props.match.params.token;
    
    onSubmit =()=>{
        if(!this.validate()){       
            console.log('failed');
        }
        else{
            console.log(this.token)
            let userData ={
                "newPassword":this.state.password
            };
            service.resetPassword(userData,this.token).then(data=>{
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
                'password':'',
                'confirmPassword':''
            })
        }
    }
    render(){
        if(this.state.redirect){
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
            <h2 className='header header-Reset'>New Password</h2>
            <div className='mainFile-reset'>
                <TextField className='textField mr' name='password' label="Password" type={this.state.hidden ? 'password' : 'text'} 
                    value={this.state.password} error={this.state.passwordErrorFlag} onChange={this.handleChange} 
                    variant="outlined"  size="small" helperText={this.state.passwordMsg} />
                <TextField className='textField' label="Confirm Password" name='confirmPassword' 
                    type={this.state.hidden ? 'password' : 'text'} value={this.state.confirmPassword} 
                    error={this.state.confirmPasswordErrorFlag} onChange={this.handleChange} variant="outlined" size="small" 
                    helperText={this.state.confirmPasswordMsg}/>
                <div>
                    <Checkbox color="primary" onClick={this.toggleShow} />
                    <label className='showPassword'>Show Password</label>
                </div>
                <Button className='button next' variant="contained" color="primary" onClick={this.onSubmit} value='submit' >Next</Button>
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