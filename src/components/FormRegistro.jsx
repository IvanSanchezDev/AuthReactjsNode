import {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'



const FormRegistro=()=>{

    const {register, handleSubmit, formState: { errors }, watch}=useForm()

    const[info, setInfo]=useState({})

    const navigate=useNavigate()


  useEffect(()=>{

                const hacerPeticion=async ()=>{
                    try {
                        
                        const api='http://localhost:1234/api/auth/register'
                        const response=await fetch(api, {
                            method:'POST',
                            headers: {
                               
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(info)
                        })
                        const result=await response.json()
                        console.log(result);

                        if(result.status!==500){
                            Swal.fire(
                                'Correct!',
                                result.message,
                                'success'
                            )
                            navigate('/Login')
                        }else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Try Again!',
                                footer: 'Error in field ' + result.errors[0].path
                              })
                        }
                       
                        
                    } catch (error) {
                        console.log(error);
                    }
                }

                {(Object.keys(info).length!==0) && hacerPeticion()}
                
            
        }, [info]
    )
        

    const onSubmit=handleSubmit((data)=>{
        const { username, password, rolSistema}=data
        setInfo({ username, password, rol: parseInt(rolSistema)})
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
         
            <input type="submit"  value="Registrarse" />
        </form>
    )
}          


export default FormRegistro