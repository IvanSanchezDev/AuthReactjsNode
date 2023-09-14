import { useAuth } from "../context/authContext"


const Dashboard =()=>{

  const {user}=useAuth()
  const {info}=user
      
    return(
        <>
         <h1> {info.username}</h1>
        </>
       
    )
    
}

export default Dashboard