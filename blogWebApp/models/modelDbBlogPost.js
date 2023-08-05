
import mongoose, { model } from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title:{type: String, required: true},
    body: {type: String, required: true}
});

const BlogPost = await mongoose.model("BlogPost",blogPostSchema);

export default BlogPost;