import { useAuth } from "../context/authContext"


const Dashboard =()=>{

  const {user}=useAuth()
  console.log(user.username);
      
    return(
        <>
         <h1> {user.username}</h1>
        </>
       
    )
    
}

export default Dashboard