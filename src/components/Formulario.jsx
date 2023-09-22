
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"
import { useState } from "react";


const Formulario=()=>{
    const [errorResponse, setErrorResponse] = useState("");
    const {register, handleSubmit}=useForm()
    const {isAuthenticated, setIsAuthenticated}=useAuth()

    const onSubmit=handleSubmit(async (data)=>{
        try {
            
            const api=`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/auth/login`
            const response=await fetch(api, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            
                const result=await response.json()
                console.log(result);
               if(result.status!==400){
                    localStorage.setItem('token', result.token)
                    setIsAuthenticated(true)
                }else{
                    setErrorResponse(result.message)
                }
               
            
            
        } catch (error) {
           console.log(error);
        }
    })

    if (isAuthenticated) {
        return <Navigate to="/Dashboard" />;
    }

    return (
        <form onSubmit={onSubmit} >           
            <label htmlFor="">Usuario</label>
            <input type="text" {...register('username')}/>
            <br />
            <label htmlFor="">Password</label>
            <input type="password" {...register("password")}  />
            <br />
            <input type="submit"  value="Iniciar Sesion" />
            {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        </form>
    )

}

export default Formulario