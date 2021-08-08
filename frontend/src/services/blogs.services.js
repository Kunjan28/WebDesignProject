import axios from "axios";

const apiurl = "http://localhost:8001/api/post/";

class BlogServices {

    getAllPosts(){
        return axios
        .get(apiurl 
        )
        .then(response => { 
          return response.data;
        });
    }

    getPostWithTag(tags){
      console.log(tags)
        return axios
        .get(apiurl + "tags", {
            tags
        })
        .then(response => { 
          return response.data;
        });
    }

    getPostByUser(userName){
        return axios
        .get(apiurl +"mypost",{
            userName
        }
        )
        .then(response => { 
          return response.data;
        });
    }

    addPost(tag,title,content,postDate,userName){
        console.log("U/serName");
        console.log("U/serName"+userName);
        return axios
        .put(apiurl+"update", {
            tag,
            title,content,postDate,userName
        })
        .then(response => { 
          return response.data;
        });
    }

    addPostComment(id, userName, comment){
        console.log("Post Comment called");
        return axios
        .put(apiurl + "comment", {
            id,
            userName,comment
        })
        .then(response => { 
          return response.data;
        });
    }

}

export default new BlogServices();