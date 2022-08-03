import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";
import { async } from "regenerator-runtime";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");


let stream;
let recorder;
let videoFile

const handleDownload = async () => {
    const ffmpeg = createFFmpeg({
        corePath: "http://localhost:3000/public/ffmpeg-core.js",
        // Use public address if you don't want to host your own.
        // corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js'
        log: true,
    });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

    const mp4File = ffmpeg.FS("readFile", "output.mp4");

    console.log(mp4File);

    const a = document.createElement("a");
    a.href = videoFile;
    a.download = "MyRecording.webm";
    document.body.appendChild(a);
    a.click();
};

const handleStop = () => {
    startBtn.innerText = "Download recording";
    startBtn.removeEventListener("click", handleStop);
    startBtn.addEventListener("click", handleDownload);

    recorder.stop();
}

const handleStart = () => {
    startBtn.innerText = "Stop recording";
    startBtn.removeEventListener("click", handleStart);
    startBtn.addEventListener("click", handleStop);
    recorder = new MediaRecorder(stream, {mineType: "video/webm"});
    recorder.ondataavailable = (event) => {
        videoFile = URL.createObjectURL(event.data);
        console.log(event.data);
        video.srcObject = null;
        video.src = videoFile;
        video.loop = true;
        video.play();
    };
    recorder.start();
};

const init = async() => {
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {width: 300, height: 300},
    });
    video.srcObject = stream;
    video.play();
}

init();

startBtn.addEventListener("click", handleStart);