const Post = require('../models/post');
//const multer = require("multer");
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/gif": "gif"
};
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         console.log(req,file)
//         const isValid = MIME_TYPE_MAP[file.mimetype];

//         let error = new Error("Invalid mime type");
//         if (isValid) {
//             error = null;
//         }
//         cb(error, "images");
//     },
//     filename: (req, file, cb) => {
//         const name = file.originalname
//             .toLowerCase()
//             .split(" ")
//             .join("-");

//         console.log(name)
//         const ext = MIME_TYPE_MAP[file.mimetype];
//         cb(null, name + "-" + Date.now() + "." + ext);
//     }
// });
exports.post = (req, res) => {
    const post = new Post({
        tag: req.body.tag,
        title:req.body.title,
        content: req.body.content,
        //imagePath: url + "/images/" + req.file.filename,
        creator: req.body.userId,
        postDate: req.body.postDate,
    })
    console.log(post);
   
        post.save().
            then(post => {
                if(post){
                    res.status(201).json({
                        message: "Post added successfully",
                        post: {
                            ...post,
                            id: post._id
                        }
                    })
                }

                    if(!post){
                        res.status(404).json({
                            message: "Error Adding Post",
                          
                        })
                    }
               
                
            })
            .catch(e => {
                console.log(e)
                res.status(501).json({ message: "Error Adding Post"+e });
            })
}

exports.getTagPost = (req, res) => {
    



        console.log(req.body.tags);

    Post.find({"tag":req.body.tags}).then(documents => {
        if(documents){
             res.status(200).json({
                message: "Posts fetched successfully!",
                posts: documents
            });
        }
        else{
             res.status(404).json({ message: "Post not found!" });
        }
       
    })
}

