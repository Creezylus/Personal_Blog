import express from 'express';
//import axios, { all } from 'axios';
import bodyParser from 'body-parser';
import loDash from 'lodash'
const app  = express();
const port = 3000;

var postTitleBodyArr = new Array();

function objTitleBody(title, body) {
    this.title = title;
    this.body = body;
  }

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

const homeStartingString = 
"Lorem ipsum dolor sit amet. Eum laborum autem et blanditiis minima aut dolor quasi est reiciendis aspernatur et saepe numquam quo corporis eveniet rem corporis quibusdam. A amet numquam ex nulla consequatur ex aliquid ipsum eos accusamus consequatur non dolor quasi qui perspiciatis voluptas!Ut molestiae explicabo et optio quia et corporis nesciunt qui voluptatem enim. Aut dolor adipisci ut consequuntur deleniti nam quis vitae eos earum laborum."
+ "Et nihil illo At quisquam velit et deleniti consequatur ea incidunt mollitia. Vel labore repellat qui aspernatur expedita ea eveniet quod 33 facere nihil hic quia explicabo est impedit quia qui quasi voluptas! Qui tempora esse sed quis corporis 33 saepe dolor et omnis dicta ab dolor quasi."
+ "Qui deserunt nesciunt et consequatur dolorem vel quibusdam distinctio qui quod reprehenderit ut explicabo architecto hic sint accusantium qui veritatis rerum. Sed repudiandae ipsum non vitae similique est omnis voluptatem est necessitatibus molestiae ad vitae voluptatem sit blanditiis commodi. Rem sunt aliquam aut nostrum pariatur ut impedit similique qui eius necessitatibus et deserunt blanditiis ea labore ipsam. Eos reiciendis illum et corporis tempora id error dicta eos rerum recusandae ea eaque magnam ex incidunt tempore.";

const aboutString = 
" Est labore nulla et necessitatibus iste et delectus facere aut odit omnis cum rerum animi! Aut accusantium placeat aut dicta voluptatum quo quas tempora aut consequatur necessitatibus cum nobis autem est facilis molestiae aut galisum quod."
+ "Eum vero necessitatibus sit quasi voluptas est laudantium molestiae sit modi enim sed vero eius et rerum possimus est quis iusto. Aut odio error est ipsa inventore ut labore ipsum At omnis enim eum nesciunt cupiditate. Et voluptatem laudantium quo voluptatum omnis vel natus impedit aut voluptas quod et beatae velit."

const contactPara= 
" Est labore nulla et necessitatibus iste et delectus facere aut odit omnis cum rerum animi! Aut accusantium placeat aut dicta voluptatum quo quas tempora aut consequatur necessitatibus cum nobis autem est facilis molestiae aut galisum quod."
+ "Eum vero necessitatibus sit quasi voluptas est laudantium molestiae sit modi enim sed vero eius et rerum possimus est quis iusto. Aut odio error est ipsa inventore ut labore ipsum At omnis enim eum nesciunt cupiditate. Et voluptatem laudantium quo voluptatum omnis vel natus impedit aut voluptas quod et beatae velit."

app.get("/",(req, res)=> {
    res.render(
        "home.ejs",
        {
            homePara: homeStartingString,
            postTitleBody: JSON.stringify(postTitleBodyArr),
        }
    );
});

app.get("/about",(req, res)=> {
    res.render(
        "home.ejs",
        {homePara: aboutString}
    );
});

app.get("/about",(req, res)=> {
    res.render(
        "about.ejs",
        {aboutPara: aboutString}
    );
} );

app.get("/contact",(req, res)=> {
    res.render(
        "contact.ejs",
        {contactPara: aboutString}
    );
} );

app.get("/compose",(req, res)=> {
    res.render(
        "compose.ejs",
    );
} );
app.post("/compose",(req, res) => {
    const reqBody = req.body;
    const ipText  = reqBody.compose;
    const ipArea  = reqBody.post;

    const ipTitleBody = new objTitleBody(ipText, ipArea);
    const arrayIdx = postTitleBodyArr.length;
    postTitleBodyArr[arrayIdx] = ipTitleBody;
    res.redirect("/");
});

app.get("/posts/:name", (req, res) =>{
    var lod = loDash.findIndex(postTitleBodyArr,['title', req.params.name]);
    if(lod >= 0)
    {
        console.log("match");
    }
    else
    {
        console.log("no match");
    }
    res.redirect("/");
});










































app.get("/", (req,res) => {
    try
    {
        res.render('index.ejs', 
        {
            Options : coinsArr,
            arrData: arrayCoinsData,
        });
    }
    catch(error)
    {
        console.log(error);
    }
});
// app.post("/search", async (req,res) => {

//     try
//     {
//         const asset  = req.body.searchCrypto.toLowerCase();
//         const url= ("https://api.coincap.io/v2/assets/" + asset);
//         const result = await axios.get(url);
//         res.render('index.ejs', 
//         {
//             Options : coinsArr,
//         });
//     }
//     catch
//     {
//         console.log(error);
//     }

// });
app.listen(port, ()=>
    {
        console.log(" I am active on port: 3000");
    }
);