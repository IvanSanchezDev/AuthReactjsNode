import { useContext, createContext, useState, useEffect} from "react";
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
    const token=localStorage.getItem('token');

    const logout = () => {
        localStorage.clear();
        setIsAuthenticated(false);
    };

    async function checkAuth(token){
        try {
                console.log("entrrooo");
                const userInfo=await traerInfo(token)
                console.log(userInfo);
                setUser(userInfo)
                setIsAuthenticated(true);
                setIsLoading(false);
            
          
        } catch (error) {
            setIsAuthenticated(false);
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
       
        if (token) {
            console.log("existe token");
            checkAuth(token);
        }
        
      }, [token]);
    
    


    return (
        <AuthContext.Provider value={{logout, isAuthenticated,user, isloading }}>
            {children}
        </AuthContext.Provider>
    )

}

const traerInfo=async(accesToken)=>{
               
    try {
        const response = await fetch(`http://localhost:1234/api/user`, {
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
