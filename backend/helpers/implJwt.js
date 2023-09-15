import { generateAccessToken, generateRefreshToken } from "./createJwt.js"
import {connect, closeConnection } from "../database/connection.js"

export const createAccessToken =(user)=>{
    return generateAccessToken(user)
}

export const createRefreshToken =async (user)=>{
    const refreshToken=generateRefreshToken(user)
    try {
        const db=await connect()
        const token=db.collection('token')
        const result=await token.insertOne({token:refreshToken})
        console.log("token inserted", result.insertedId);
        return refreshToken
    } catch (error) {
        console.log("error inserting token", error.message);
    }finally{
        await closeConnection()
    }
}