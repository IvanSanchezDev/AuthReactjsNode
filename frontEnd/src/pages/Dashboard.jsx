import { useAuth } from "../context/authContext"


const Dashboard =()=>{

  const {getUser, logout}=useAuth()
  const infoUser = getUser()
  console.log(infoUser);
      
    return(
        <>
         <h1>Bienvenido al panel principal {infoUser?.username}</h1>
         <button type="button" onClick={logout}>Cerrar Sesion</button>
         
        </>
       
    )
    
}

export default Dashboard