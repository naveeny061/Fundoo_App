import Axiom from "./axiosService";

const httpService = new Axiom();

export default class userService{
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"
    registration = (data) =>{
        return httpService.Post(`${this.baseUrl}user/userSignUp`, data);
    }
    login = (data) => {
        return httpService.Post(`${this.baseUrl}user/login`, data);
    }
    forgetPassword = (data) =>{
        return httpService.Post(`${this.baseUrl}user/reset`, data);
    }
    resetPassword = (data,token) =>{
        return httpService.Post(`${this.baseUrl}user/reset-password`,data,{headers:{
            Authorization : `${token}`,
        },
    });
    }
}
