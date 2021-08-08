const config = require("../config/auth.config");
const db = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");
const User = db.user;
const Post = db.post;





// creates new user in database
exports.signup = (req, res) => {
  const user = new User({
    userName: req.body.userName, // requests username
    firstName: req.body.firstName, 
    lastName: req.body.lastName, 
    emailId: req.body.emailId, // requests email
    phoneNo:req.body.phoneNo,
    password: bcrypt.hashSync(req.body.password, 8) // requests hidden password
  });

  user.save((err, user) => {
    if (err) { // error message
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "User was registered successfully!" });
    // if (req.body.roles) { // finds roles
    //   Role.find(
    //     {
    //       name: { $in: req.body.roles }
    //     },
    //     (err, roles) => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }

    //       user.roles = roles.map(role => role._id);
    //       user.save(err => {
    //         if (err) {
    //           res.status(500).send({ message: err });
    //           return;
    //         }
    //         // success message once user is saved
    //         res.send({ message: "User was registered successfully!" });
    //       });
    //     }
    //   );
    // } else { // if role is not specified, default user role
    //   Role.findOne({ name: "user" }, (err, role) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }

    //     user.roles = [role._id];
    //     user.save(err => {
    //       if (err) {
    //         res.status(500).send({ message: err });
    //         return;
    //       }
    //       // success message once user is saved
    //       res.send({ message: "User was registered successfully!" });
    //     });
    //   });
    // }
  });
};

// signin function for user
exports.signin = (req, res) => {
  User.findOne({ // searches for username in database
    emailId: req.body.emailId
  })
   // .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) { // error message if username does not exist
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      // denies accesstoken if password is invalid
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // generates token using jsonwebtoken
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      // returns user information and access token
      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        emailId: user.emailId,
        accessToken: token,
        userName: user.userName
      });
    });
};
exports.update = (req, res) => {
  const post = new Post();
  post.tag= req.body.tag;
  post.title=req.body.title;
  post.content= req.body.content;
  //imagePath: url + "/images/" + req.file.filename,
  post.userName= req.body.userName;
  post.postDate=req.body.postDate;
  post.save()
    .then((result) => {
      User.findOne({ userName: post.userName }, (err, user) => {
          if (user) {
              // The below two lines will add the newly saved review's 
              // ObjectID to the the User's reviews array field
              user.posts.push(post);
              user.save();
              res.json({ message: 'Review created!' });
          }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });



  
}

// deletes user account
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.query.id).then((data) => {
    if (!data) { // if data cannot be found for user
      res.status(404).send({
        message: `Cannot delete User with id=${req.query.id}. User was not found!`
      });
    } else {
      res.send({
        message: "User was deleted successfully!"
      });
    }
  })
}

exports.getPosts = (req, res) => {
  User.findOne({ userName: req.body.userName })
    .populate({path:"posts", populate : {
      path : 'comments'}
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};