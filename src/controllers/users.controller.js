import usersService from "../services/users.service.js";

class UserController{
    constructor(){}

    async register(req,res){
        const data = await usersService.register(req.body,req.files)


    }
}


export default new UserController()