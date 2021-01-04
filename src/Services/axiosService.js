import Axios from "axios"

export default class axiosService{
    Post = (url,data,isHeaderReq = false) => {
        return Axios.post(url,data,isHeaderReq);
    }
        
}