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

    getPostWithTag(tagname){
        return axios
        .put(apiurl + "tags", {
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
        return axios
        .put(apiurl + "update", {
            tag,
            title,content,postDate,userName
        })
        .then(response => { 
          return response.data;
        });
    }

    addPostComment(){
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