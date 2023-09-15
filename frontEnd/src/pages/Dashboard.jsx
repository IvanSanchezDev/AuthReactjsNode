import { useAuth } from "../context/authContext"


const Dashboard =()=>{

  const {user, logout}=useAuth()
  const {info}=user
      
    return(
        <>
         <h1>Bienvenido al panel principal {info?.username}</h1>
         <button type="button" onClick={logout}>Cerrar Sesion</button>
         
        </>
       
    )
    
}

export default Dashboard