const express=require('express');
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')

dotenv.config()
const app=express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const LoginRouter=require('./Routers/loginRouter.js')
const articleRouter=require('./Routers/ArticleRouter')
const imageRouter=require('./Routers/imageRouter')
const videoRouter=require('./Routers/videoRouter')
const doubtRouter=require('./Routers/doubtRouter')
app.use('/users',LoginRouter)
app.use('/posts/article',articleRouter)
app.use('/posts/images',imageRouter)
app.use('/posts/videos',videoRouter)
app.use('/posts/doubt',doubtRouter)

mongoose.connect(process.env.mongoose_uri).then(
    app.listen('3001',()=>console.log('listening at 3001'))
)






