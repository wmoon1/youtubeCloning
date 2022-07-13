import Video from "../models/Video";

//same as Video.find({}, (error, videos) => {})
/*const handleSearch = (error, videos) => {
    console.log("errors", error);
    console.log("videos", videos);
}
console.log("start")
Video.find({}, (error, videos) => {
    return res.render("home", {pageTitle: "Wooram's Home", videos });
});
console.log("finished")
*/

//callback find({})
export const home = async (req, res) => {
    const videos = await Video.find({}).sort({createdAt: "desc"});
    return res.render("home", {pageTitle: "Wooram's Home", videos });
};
export const watch = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);

    //Usually Error first is better
    if(video === null){
        return res.render("404", {pageTitle: "Video is not Found" })
    }
    return res.render("watch", {pageTitle: video.title , video: video });
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.status.render("404", {pageTitle: "Video is not Found" })
    }
    return res.render("Edit", {pageTitle: `Editing: ${video.title}`, video})
};
export const postEdit = async (req, res) => {
    const {id} = req.params;
    //get the form from pug
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id: id});
    if(!video){
        return res.render("404", {pageTitle: "Video is not Found" })
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description, 
        hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect(`/videos/${id}`);
};


export const getUpload = (req,res) => {
   return res.render("Upload", {pageTitle: "Upload Video"});
};

export const postUpload = async (req, res) => {
    const {title, description, hashtags } = req.body;
    try{
    await Video.create ({
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
        return res.redirect("/");
    }   catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error_message,
        });
    }
};

export const deleteVideo = async (req,res) => {
    const { id } = req.params;
    await Video.findByIdAndRemove(id);
    return res.redirect("/");
}

export const search = async (req, res) => {
    //when search get this thing(url ex: keyword=python using query)
    const {keyword} = req.query;
    let videos = [];
    if (keyword){
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "i")
            },
        })
    }
    return res.render("search", {pageTitle: "Search", videos});
}