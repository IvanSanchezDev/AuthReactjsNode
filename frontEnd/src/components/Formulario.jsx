
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const Formulario=()=>{

    const {register, handleSubmit}=useForm()

    const navigate = useNavigate();
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
            const result=await response.json()
            localStorage.setItem('token', result.token)
            navigate('/Dashboard')
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