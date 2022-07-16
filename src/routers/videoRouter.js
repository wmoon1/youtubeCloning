import express from "express";
import {watch, getEdit, postEdit, getUpload, postUpload, deleteVideo} from "../controllers/videoController";
import {videoUpload, protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();

// \\d = digits only number for id
// if word you can \\w
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
.route("/:id([0-9a-f]{24})/edit")
.all(protectorMiddleware)
.get(getEdit)
.post(postEdit)
videoRouter
.route("/:id([0-9a-f]{24})/delete")
.all(protectorMiddleware)
.get(deleteVideo)
videoRouter
.route("/upload")
.all(protectorMiddleware)
.get(getUpload)
.post(videoUpload.single("video"), postUpload)


export default videoRouter;