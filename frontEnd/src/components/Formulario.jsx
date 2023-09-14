
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
            
            const api='http://localhost:1234/api/auth/login'
            const response=await fetch(api, {
                method:'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result=await response.json()
                localStorage.setItem('token', result.token)
                setIsAuthenticated(true)
            }else{
                const result=await response.json()
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