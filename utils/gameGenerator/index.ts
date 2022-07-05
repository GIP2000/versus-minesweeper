// import {PrismaClient} from "@prisma/client"; 
import { BoardInstance, StaticBoard } from "@prisma/client";
import prisma from "../prismaClient"; 

type Cord = {
    x: number;
    y: number;
}

export const generateMap = async (amount:number, size: Cord, start:Cord) =>{
    const board:boolean[] = new Array(size.x * size.y - amount).fill(false); 
    for(let i = 0; i<amount; i++){
        let cord; 
        do {
            cord = Math.floor(Math.random() * board.length);
        } while(cord !== start.x + start.y*size.x); // don't put a bomb on the start location
        board.splice(cord,0,true);  
    }

    const {byteArray} = board.reduce<{byteArray: number[], value: number}>((acc,x,i)=>{
        let newReturn = {...acc}; 
        if( i%8 === 0 )
            newReturn = {byteArray: [...acc.byteArray, acc.value], value: 0}
        newReturn.value = ((x ? 1 : 0) << i%8) & newReturn.value; 
        return newReturn
    },{byteArray: [], value: 0});


    const boardObj = await prisma().staticBoard.create({
        data: {
            startX: start.x, 
            startY: start.y, 
            board: Buffer.from(byteArray)
        }
    });

    return {board,boardObj}; 
}

export const countBombs = (buffer:Buffer): number => 
    buffer.reduce<number>((acc,x)=>{
        let count = 0;         
        for(let i = 0; i<8; i++){
            if ((1 & (x >> i)) === 1){
                count++; 
            }
        }
        return acc + count; 
    },0); 

export const getInitalClickMask = (boardObj:StaticBoard & {includes: BoardInstance}): Buffer => {

    const buffer = Buffer.alloc(boardObj.board.byteLength); 


    return Buffer.alloc(1); 
}

