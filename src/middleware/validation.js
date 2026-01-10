import { BadRequestError } from "../utils/error.js";
import validations from "../validations/validations.js";

class UserMiddleware {
  register = (req, res, next) => {
    const { error } = validations.registerSchema.validate(req.body);


    if (error) {
        return next(new BadRequestError(400, error.details[0].message))
    }
    next();
  };
}

export default new UserMiddleware();
