import mongoose from "mongoose";
import BlogPost from "../../models/modelDbBlogPost.js" 
const FileId = "dbUtils is active";
const DefaultConnectionString = "mongodb://127.0.0.1:27017/blogDB"
let ExitCode = "0: Success";


const dBClass = {
    async connect(connectionString){
        try
        {
            if(connectionString == null)
            {
                connectionString = DefaultConnectionString;
            }
            await mongoose.connect(connectionString,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            if (mongoose.connection.readyState === 1){
                ExitCode = "0: Successfully Connected to Database"
                return ExitCode;
            }
        }
        catch (error)
        {
            ExitCode = "1: Unsuccessful Connection Attempt";
            return ExitCode;
        }
        
        return ExitCode;
    },

    async createBlogPost (postTitle, postBody)
    {
        let blogPost =  new BlogPost ({
            title: postTitle,
            body: postBody,
        });
        return (blogPost);
    },

    async addBlogPosts(ItemsArray)
    {
        try
        {
            await BlogPost.insertMany(ItemsArray);
            ExitCode = "0: Successfully Added Blog Post";
        }
        catch(error)
        {
            ExitCode = "1: Error While Adding Blog Post";
            return ExitCode;
        }
        return ExitCode;
    },

    async getAllPosts()
    {

        let allPostsDefault =  new BlogPost (
        {
            title: "Error Fetching Blog Posts",
            body: "Error Fetching Blog Posts",
        });
        var allPosts = new Array();

        function createAllPostsResponse(ipExitCode, ipBlogPosts){
            const response = 
            {
                exitCode: ipExitCode,
                allPosts: ipBlogPosts,
            }
            return response;
        }

        try
        {
            allPosts = await  BlogPost.find({});
            ExitCode = "0: Successfully fetched all posts. Return array Length: " + allPosts.length;
        }
        catch (error)
        {
            allPosts[0] = allPostsDefault;
            ExitCode = "1: Error while fetching the posts. Error: " + error.toString();
        }
        return (createAllPostsResponse(ExitCode,allPosts));
    },









    async pingDBUtils(){
        ExitCode = "0: Success. dbUtils is active.";
        return ExitCode;
    }
};
export default dBClass;