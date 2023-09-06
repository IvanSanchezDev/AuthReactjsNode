import {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";


const Formulario=()=>{

    const {register, handleSubmit}=useForm()

    //const{ info, setInfo}=useState({})


    /*
  useEffect(()=>{
        
        (async ()=>{
            try {
                console.log(info);
                const api='http://localhost:1234/auth/login'
                const response=await fetch(api, {
                    method:'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(info)
                })
                const result=await response.json()
                return result
            } catch (error) {
                console.log(error);
            }
        })()
    }, [info])*/

    const onSubmit=handleSubmit(async (data)=>{
        try {           
            const api='http://localhost:1234/auth/login'
            const response=await fetch(api, {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const result=await response.json()
            console.log(result);
            return result
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <form onSubmit={onSubmit} >           
            <label htmlFor="">Usuario</label>
            <input type="text" {...register('username')}/>
            <br />
            <label htmlFor="">Password</label>
            <input type="password" {...register("password")}  />
            <br />
            <input type="submit"  value="Iniciar Sesion" />
        </form>
    )

}

export default Formulario