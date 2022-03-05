import {Request, Response} from 'express';
import { pool } from '../../database/database';

export class sliderController{
    async updateSlider(req:Request,respond:Response){
        console.log(req.body);
        try{
            if(req.body.data.length == 0){
                await pool.query( "DELETE FROM slider where type = ?;",req.body.type);
                respond.send('DOSNT EXIST THE ITEM')
            }else{
                var result = req.body.data.map((e:any)=>Object.values(e));
                await pool.query( "DELETE FROM slider WHERE type = ?;",req.body.type);
                let newFile = await pool.query(`INSERT INTO slider(id,imageDesk,imageMobile,alt,title,type,link,paragraph,icon) VALUES ?;`,[result],(err:any, res:any) => {
                    if(err) throw err;
                    respond.send('UPDATE DATA')
                })
            }
        }catch(err:any){
            respond.send('ERROR, UPDATING')
        }
    }
    async getSliders(req:Request,res:Response){
        const {type} = req.body
        const allSlides = await pool.query('SELECT * FROM slider WHERE type = ?',type);
        res.send(allSlides)
    }
}