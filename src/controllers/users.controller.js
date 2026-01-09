import userService from "../service/user.service.js";

class UserController {
  async register(req, res) {
    const data = await userService.register(req.body, req.files);
    return res.status(data.status).json(data);
  }

  async login(req, res) {
    const data = await userService.login(req.body);
    res.status(data.status).json(data);
  }

  async getAllUser(req, res) {
    const data = await userService.getAllUser(req.body);
    res.status(data.status).json(data);
  }
}

export default new UserController();
