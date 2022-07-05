import { StaticBoard, BoardInstance } from "@prisma/client";
import prisma from "../../utils/prismaClient"; 
import { countBombs } from "../../utils/gameGenerator";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";

type Props = {
    boardObj:  (StaticBoard & {instances: BoardInstance[]}) | null 
}


export const getStaticPaths:GetStaticPaths = ()=>({
    paths: [], 
    fallback: "blocking"
}); 

export const getStaticProps:GetStaticProps<Props> = async ({params})=>{

    if(params?.id && typeof params.id === "string"){
        const boardObj = await prisma().staticBoard.findFirst({
            where: {id: parseInt(params.id)},
            include: {
                instances: {
                    where: {
                        userId: 0 // TODO fix 
                    }
                }
            }
        }); 

        return { props: {
            boardObj
        }}
    }
    return {
        props: {boardObj: null}
    }; 
}





const Game: React.FC<Props> = ({boardObj})=>{
    const router = useRouter();

    if(!(boardObj !== null || (
        (router.query.amount && typeof router.query.amount === "string") && 
        (router.query.sizeX && typeof router.query.sizeX === "string")   && 
        (router.query.sizeY && typeof router.query.sizeY === "string")
    ))) return <div>Error Invalid Request</div>

    const amount = useMemo<number>(()=>boardObj !== null ? countBombs(boardObj.board) : parseInt((router.query.amount as string)),[])
    
    const [amountRemain,setAmountRemain] = useState(amount);  
    
    const boardLen = useMemo<number>(()=>
        boardObj !== null ? 
        boardObj.board.byteLength : 
        parseInt((router.query.sizeX as string)) * parseInt((router.query.sizeY as string)),[]
    )

    const [board,setBoard] = useState(boardObj !== null ? boardObj.board : Buffer.alloc(boardLen)); 
    const [clickedMask,setClickedMask] = useState<Buffer>()

    if(boardObj === null){
        // render board and wait for first click 

        // after first click generate new board and new instance 
    } else {
        // render board as instructed 
        if(boardObj.instances.length > 0){
            // fill in the current masks
        }
        else {
            // generate a new instance 
        }
    }


    return <div></div>
}

export default Game; 