import axios from "axios";

const apiurl = "http://localhost:8001/api/post/";

class BlogServices {

    getAllPosts(){
        return axios
        //need to fill
    }

    getPostWithTag(tagname){
        return axios
        //need to fill
    }

    getPostByUser(emailid){
        return axios
        //need to fill
    }

}

export default new BlogServices();