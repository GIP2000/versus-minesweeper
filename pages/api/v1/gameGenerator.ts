import {generateMap} from "../../../utils/gameGenerator"; 
import prisma from "../../../utils/prismaClient"
import type { NextApiRequest, NextApiResponse } from 'next'; 
import type {ReqBodyGameGenerator} from "../../../types/routeTypes"


export default async (req:NextApiRequest, res:NextApiResponse)=>{
    if (req.method !== "POST") {
        res.status(405).send({message: "Invalid Request please POST"}); 
        return; 
    }
    const {amount,size,start}:ReqBodyGameGenerator = req.body; 

    const {board,boardObj} = await generateMap(amount,size,start);

    const instance = await prisma.boardInstance.create({
        data: {
            staticBoardId: boardObj.id,
            clickedMask: Buffer.alloc(Math.ceil(size.x * size.y / 8)),
            flaggedMask: Buffer.alloc(Math.ceil(size.x * size.y / 8)), 
            userId: 0, 
        }
    }); 

    res.status(200).json({board,boardObj,instance})
}