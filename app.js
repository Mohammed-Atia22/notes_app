import express from 'express';
const app = express();
import { getnote,getnotes,createnotes } from './database.js';
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();

app.get("/notes", async (req,res)=>{
    const notes = await getnotes();
    res.send(notes);
})
app.get("/notes/:id", async (req,res)=>{
    const id = req.params.id;
    const note = await getnote(id);
    res.send(note);
})

app.post("/notes",async (req,res)=>{
    const {title,content} = req.body;
    const note = await createnotes(title,content);
    res.status(201).send(note);
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send('something broke');
})

app.listen(8080,()=>{
    console.log('server is running on port 8080');
})