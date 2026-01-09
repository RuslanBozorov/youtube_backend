import pool from "../database/config.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { join, extname } from "path";

class UserService {
  async register(body, files) {
    try {
      const { username, password } = body;
      const avatar = files?.avatar || files?.file;

      const existUser = await pool.query(
        "select * from users where username = $1",
        [username]
      );

      if (existUser.rows.length) {
        return { status: 409, message: "User already exist" };
      }

      if (
        !avatar ||
        !avatar.mimetype ||
        !avatar.mimetype.startsWith("image/")
      ) {
        return { status: 400, message: "Avatar faqat rasm bo'lishi kerak" };
      }

      const fileName = Date.now() + extname(avatar.name);
      await avatar.mv(join(process.cwd(), "src", "uploads", fileName));

      const avatarPath = `/uploads/${fileName}`;

      const passHash = await bcrypt.hash(password, 10);

      const newUser = await pool.query(
        "insert into users(username,password,avatar) values($1,$2,$3) RETURNING *",
        [username, passHash, avatarPath]
      );

      const id = newUser.rows[0].id;

      return {
        status: 201,
        message: "User Register",
        accessToken: Jwt.sign({ id, username }, "shaftoli"),
      };
    } catch (error) {
      return { status: 500, message: error.message };
    }
  }

  async login(body) {
    const { username, password } = body;

    const existUserName = await pool.query(
      "select * from users where username=$1",
      [username]
    );

    if (!existUserName.rows.length) {
      return {
        status: 404,
        message: "Username or Password wrong",
      };
    }

    if (!bcrypt.compare(password, existUserName.rows[0].password)) {
      return {
        status: 404,
        message: "Username or Password wrong",
      };
    }

    return {
      status: 200,
      message: "User successfuly login",
      accessToken: Jwt.sign(
        {
          id: existUserName.rows[0].id,
          username: existUserName.rows[0].username,
        },
        "shaftoli"
      ),
    };
  }

  async getAllUser() {
    const allUser = await pool.query("select * from users");
    return {
      status: 200,
      data: allUser,
    };
  }
}

export default new UserService();
