// if you are using this, you can use the DB from db.js for secret and mongodb address
require("dotenv").config();

import express from "express";
import morgan from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./routers/rootRouter";
import MongoStore from "connect-mongo";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";


const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(
        session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            // if use false, there has no save cookies in website.
            // However, if the log in it, it will be shown the cookies again in DB
            saveUninitialized: false,
            // Originally if you died Sever, it cannot be login it
            // but use this 'store', when you kill the sever, it still can be log in it because it save mongo db 
            store: MongoStore.create({mongoUrl: process.env.DB_URL }),
    })
);
app.use(flash());
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
});
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
// first "" is URL, and second "" is folder
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/api", apiRouter);

export default app;

