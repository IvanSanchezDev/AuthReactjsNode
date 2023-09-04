import express from 'express'

const app=express()

const port= process.env.PORT  || 5001

app.listen(port, ()=>{
    console.log(`server running in http://localhost:${port}`);
})