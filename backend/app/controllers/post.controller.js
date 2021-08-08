const Post = require('../models/post');
const Comment = require('../models/comment');
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

        console.log(req.body);

    Post.find({"tag":req.body.tagname}).then(documents => {
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

exports.getAllPost = (req, res) => {
   

Post.find().populate("comments").then(documents => {
    if(documents){
         res.status(200).json({
            message: "All Posts fetched successfully!",
            posts: documents
        });
    }
    else{
         res.status(404).json({ message: "Post not found!" });
    }
})
}

exports.postComment = (req, res) => {
    const comment = new Comment();
    comment.id=req.body.id,
    comment.userName= req.body.userName;
    comment.comment=req.body.comment;

    comment.save()
    .then((result) => {
      Post.findOne({ _id: req.body.id }, (err, post) => {
          if (post) {
              // The below two lines will add the newly saved review's 
              // ObjectID to the the User's reviews array field
              post.comments.push(comment);
              post.save();
              //res.json({ message: 'Comment created!' });
          }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });

    Post.findOne({ _id: req.body.id })
    .populate("comments")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });

   
}


