import { useContext, createContext, useState, useEffect} from "react";
import { Navigate } from "react-router-dom";
import { requestNewAccessToken } from "./requestNewAccessToken";


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
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");


    const saveUser = (data) => {
      setAccessTokens(data.data.tokenAcces, data.data.tokenRefresh)
      setUser(data.data.user)
      setIsAuthenticated(true)
      setIsLoading(false)

    }

    const setAccessTokens=(accessToken, refreshToken)=>{
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      localStorage.setItem("token", JSON.stringify({ refreshToken }));
    }

    async function getNewAccessToken(refreshToken) {
      const token = await requestNewAccessToken(refreshToken);
      if (token) {
        return token;
      }
    }

    function getAccessToken(){
      return accessToken
    }

    //obtenemos el token del estado si no existe lo extraemos del localStorage
    function getRefreshToken() {
      if (refreshToken) {
        return refreshToken;
      }
      const token = localStorage.getItem("token");
      if (token) {
        const { refreshToken } = JSON.parse(token);
        setRefreshToken(refreshToken);
        return refreshToken;
      }
      return null;
    }
    

    function getUser(){
      return user
    }

    const logout = () => {
      localStorage.removeItem("token");
      setAccessToken("");
      setRefreshToken("");
      setUser(undefined);
      setIsAuthenticated(false);
    };

    async function checkAuth(){
        try {
          //Existe access token
          if (accessToken) {
            const userInfo=await traerInfo(accessToken);
            setUser(userInfo)
            setAccessToken(accessToken)
            setIsAuthenticated(true);
            setIsLoading(false);
          }else{
            //Si no existe entonces lo extraemos del local storage
            const token = localStorage.getItem("token");
            if (token) {
              const refreshToken=JSON.parse(token).refreshToken
              //PEDIR UN NUEVO  ACCESS TOKEN
              try {
                const token=await getNewAccessToken(refreshToken)
                const userInfo=await traerInfo(token);
                console.log("infoo" + userInfo);
                setUser(userInfo)
                setAccessToken(accessToken)
                setIsAuthenticated(true);
                setIsLoading(false);
              } catch (error) {
                console.log(error);
                setIsLoading(false);
              }
              
            }else {
              setIsLoading(false);
            }
          }
        } catch (error) {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {         
      checkAuth();
    }, []);
    
    


    return (
        <AuthContext.Provider value={{saveUser, getAccessToken, getRefreshToken, logout, isAuthenticated, getUser, setIsAuthenticated }}>
            {isloading ? <div>Loading...</div> : children}
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
          console.error(`Error en la solicitud: ${response.errors}`);
        }
      } catch (error) {
        
        console.log("erorr" + error.message);
      }
}

export default AuthContext;
