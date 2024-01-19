const http=require("http");
const express=require('express');
const app=express();
app.use(express.json());
const path = require('path');
const hbs = require('hbs');
const{Server}=require("socket.io");//in server s must be capital for running the program



// const port=process.env.PORT||3000;

const publicPath = path.join(__dirname,"../public");
const templatePath = path.join(__dirname, "../templates");

app.set('view engine', 'hbs');
app.set("views", path.join(templatePath, "views"));
// hbs.registerPartials(partialPath);
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.render('index'); // Assuming you have an 'index.hbs' file in the 'views' folder
});

// app.get('/',(req,res)=>{
//     res.send("welcome to live chat");
// })
const server=http.createServer(app);
const io=new Server(server);//handel the all request of socket io

io.on("connection",(socket)=>{
// console.log(`new user is connected`,socket.id);

//socket se message aya socket ko baat do
socket.on("user-message",(message)=>{
    console.log("a newuser message",message);
    io.emit("message",message);
})
})//means mai tum chat karoge to hum dono socket hai



server.listen(3000,()=>{
    console.log(`server start at port 3000`);
})
// app.listen(port,()=>{
//    console.log(`server is running on port:${port}`)
// })
