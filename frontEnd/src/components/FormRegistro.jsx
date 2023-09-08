import {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";


const FormRegistro=()=>{

    const {register, handleSubmit, formState: { errors }, watch}=useForm()

    const[info, setInfo]=useState({})


  useEffect(()=>{

                const hacerPeticion=async ()=>{
                    try {
                        
                        const api='http://localhost:1234/auth/register'
                        const response=await fetch(api, {
                            method:'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(info)
                        })
                        const result=await response.json()
                        console.log(result);
                        return result
                    } catch (error) {
                        console.log(error);
                    }
                }

                {(Object.keys(info).length!==0) && hacerPeticion()}
                
            
        }, [info]
    )
        

    const onSubmit=handleSubmit((data)=>{
        const { username, password, rolSistema, arrPermisos}=data
        setInfo({ username, password, rol: parseInt(rolSistema), permisos:[arrPermisos]})
    })

    return (
        <form onSubmit={onSubmit} >           
            <label htmlFor="">Usuario</label>
            <input type="text" {...register('username')}/>
            <br />
            <label htmlFor="">Password</label>
            <input type="password" {...register("password")}  />
            <br />
            <label htmlFor="">Confirm Password</label>
            <input type="password" {...register("confirmPassword", {
                validate:(value)=>{
                    return (value===watch('password'))? true : 'las passwords no coinciden'
                }
                })}  />
                 {  errors.confirmPassword && (
                    <span>{errors.confirmPassword.message}</span>
                    )}
            <br />
            <br />
            <label htmlFor="">Rol</label>
            <select name="rol" {...register("rolSistema")}>
                <option value="0">Usuario</option>
                <option value="1">Admin</option>
            </select>
            <br />
            <label htmlFor="">Versions</label>
            <select name="versions" {...register("arrPermisos")}>
                <option value="1.0.0">1.0.0</option>
                <option value="2.0.0">2.0.0</option>
            </select>
            <br />

            <input type="submit"  value="Registrarse" />
        </form>
    )
}          


export default FormRegistro