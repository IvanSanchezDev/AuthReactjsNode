import { useContext, createContext, useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
const AuthContext = createContext();



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
    return context;
};

//compoonente que engloba a otros
export const AuthProvider=({children})=>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isloading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    

    const logout = () => {
      
        localStorage.clear();
        setIsAuthenticated(false);
        <Navigate to='/'/>
    };

    async function checkAuth(){
        try {
          const token=localStorage.getItem('token');
            if (token) {
                
              const userInfo=await traerInfo(token)
              setIsAuthenticated(true);
              
                setUser(userInfo)
                
                setIsLoading(false);
            }else{
              setIsLoading(false);
            }
                
        } catch (error) {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {         
      checkAuth();
    }, [isAuthenticated]);
    
    


    return (
        <AuthContext.Provider value={{logout, isAuthenticated, user, isloading, setIsAuthenticated }}>
            {isloading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    )

}

const traerInfo=async(accesToken)=>{
               
    try {
        const response = await fetch(`http://${import.meta.env.VITE_HOSTNAME}:${import.meta.env.VITE_PORT_BACKEND}/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${accesToken}`,
          },
        });
    
        if (response.ok) {
       
          const json = await response.json();
          
          return json
        }  else {
          console.error(`Error en la solicitud: ${response.status}`);
        }
      } catch (error) {
        
        console.log(error);
      }
}

export default AuthContext;
