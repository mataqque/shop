import {Request, Response} from 'express';
import { pool } from '../database/database';
const sharp = require('sharp');;
const pathRoute = require('path')
const fs = require('fs')
const pathDestination = '../public/images';
export class filesController{
    
    async upload (req:Request,res:Response){
        try{
            const {filename, encoding, mimetype, size, path, destination } = req.file;
            var file = {
                filename: filename,
                coding: encoding,
                mimetype: mimetype,
                destination: destination,
                size: size,
                path: path,
            }
            // file.filename = 'compress-'+file.filename; 
            // const newFile = await pool.query('INSERT INTO files ( filename, coding, mimetype, destination, size, path) VALUES (?,?,?,?,?,?) ', Object.values(file));
            // console.log(newFile)
            
            // await sharp(pathRoute.join(__dirname,`../public/images/${file.filename}`))
            // .resize({width:1800,withoutEnlargement: true})
            // .webp({quality: 80,force: false})
            // .jpeg({quality: 80, compressionLevel: 8, progressive: true, force: false})
            // .png({quality: 80, progressive: true, force: false })
            // .toFile(pathRoute.join(__dirname,`../public/images/compress-${file.filename}`), function(err:any) {
            //     if(err){
            //         console.log(err)
            //     }
            // }).toBuffer()
            // .then((err:any,inf:any) => { 
            //     fs.unlinkSync(pathRoute.join(__dirname,`../public/images/${file.filename}`))
            // })
    
            // res.send({newFile:newFile})
            res.send({newFile:{}})
        }catch(err){
            console.log(err)
            res.send(err)
        }
    }
    async getImages(req:Request,res:Response){
        const allimages = await pool.query('SELECT * FROM `files`');
        res.send(allimages)
    }
    async deleteFiles(req:Request,res:Response){
        try {
            const filesDeletes = await pool.query('DELETE FROM `files` WHERE id_file in (?)', [req.body.map((e:any)=>{ return e.id_file})]);
            await req.body.map((e:any)=>{ fs.unlinkSync(pathRoute.join(__dirname,`../public/images/${e.filename}`))
            })
            res.send(filesDeletes)
        } catch (err) {
            console.log(err);
        }
    }
    async compressImages(req:Request,res:Response){
        
        

        res.send(pathRoute.join(__dirname,"../public"))
    }
}