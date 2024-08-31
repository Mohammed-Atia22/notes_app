import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

export async function getnotes(){
    const result = await pool.query('SELECT * FROM notes');
    const rows = result[0];
    return rows;
}

// const notes = await getnotes();
// console.log(notes);


export async function getnote(id){
    const result = await pool.query(`
        SELECT *
        FROM notes
        WHERE id = ?
        `,[id]);
    return result[0][0];
}

// const note = await getnote(1);
// console.log(note);

export async function createnotes(title,content){
    const [result] = await pool.query(`
    INSERT INTO notes (title,contents)
    VALUES (?,?)
    `,[title,content])
    const id =  result.insertId;
    return getnote(id);
}
// const result = await createnotes('test','test');
// console.log(result);