const checkAuth = require("../middleware/checkAuth");
const controller = require("../controllers/post.controller");

// sets up routes for authentication

module.exports =  (app)=> {
  
    app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  //posts.use(checkAuth);
  app.post(
    "/api/posts",
 
    controller.post // signs up user successfully
  );

  app.get(
    "/api/posts/tags/",
 
    controller.getTagPost // signs up user successfully
  );

  

  



  //post.post("/api/auth/signin", controller.signin); // sign in user
};