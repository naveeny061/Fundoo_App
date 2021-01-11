import Axiom from "./axiosService";

const httpService = new Axiom();

export default class noteService{
    baseUrl = "http://fundoonotes.incubation.bridgelabz.com/api/"
    saveNotes = (data, token) => {
        return httpService.Post(`${this.baseUrl}notes/addNotes`, data, {
            headers: {
                Authorization: `${token}`,
            }
        });
    }
    getNoteList = (token) => {
        return httpService.Get(`${this.baseUrl}notes/getNotesList`,{
            headers: {
                Authorization: `${token}`,
            }
        });
    }
    delete = (data, token) => {
        return httpService.Post(`${this.baseUrl}notes/trashNotes`, data, {
            headers: {
                Authorization: `${token}`,
            }
        });
    }

}
