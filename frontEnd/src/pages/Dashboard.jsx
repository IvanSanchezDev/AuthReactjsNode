import {  useState, useEffect } from "react"


const Dashboard =()=>{

            
            const [info, setInfo] = useState(null)

            const token = localStorage.getItem("token");
           

            useEffect(() => {

              const traerInfo=async()=>{
               
                  try {
                      const response = await fetch(`http://localhost:1234/api/user`, {
                        method: "GET",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `bearer ${token}`,
                        },
                      });
                  
                      if (response.ok) {
                     
                        const json = await response.json();
                        
                        setInfo(json.info)
                      }  else {
                        console.error(`Error en la solicitud: ${response.status}`);
                      }
                    } catch (error) {
                      
                      console.log(error);
                    }
              }
              if (token!=="") {
                traerInfo()
              }
              
            }, [token])
  
    return(
        <>
         <h1>  {info ?  `Bienvenido usuario ${info.username}` : '... Cargando'}</h1>
        </>
       
    )
    
}

export default Dashboard