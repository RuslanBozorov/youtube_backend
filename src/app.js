import express from "express";
import fileUpload from "express-fileupload";
import { config } from "dotenv";
import indexRouter from "./routes/index.js";
import fs from "fs";
import { join } from "path";
config();

const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(indexRouter.userRouter);

app.use((error, req, res, next) => {
  if (error.status && error.status < 500) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      name: error.name,
    });
  } else {
    let errorText = `\n[${new Date()}]--${req.method}--${req.url}--${
      error.message
    }`;
    fs.appendFileSync(
      join(process.cwd(), "src", "logs", "logger.txt"),
      errorText
    );

    return res.status(error.status).json({
      status: error.status,
      message: "InternalServerError",
    });
  }
});

app.listen(process.env.PORT, () => console.log("Server is running"));
