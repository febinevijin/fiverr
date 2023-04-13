import { createContext, useContext, useEffect, useReducer } from "react";
import { authInitialState, authReducer } from "./Reducer";
import Request from "../utils/Request";


const Auth = createContext();

const Context = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, authInitialState);
 
    
   
    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("currentUser"));
        if (data) {
             dispatch({
               type: "LOGIN_SUCCESS",
               payload: data,
             });
        }  
    }, [])
  
 
    

  const login = async (email, password) => {
    try {
        const { data } = await Request.post("/auth/login", { email, password });
         localStorage.setItem("currentUser", JSON.stringify(data));
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response.data.message,
      });
     
    }
    };
  const logout = async () => {
    try {
      await Request.post("/auth/logout")
      localStorage.removeItem("currentUser");
       dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error.response.data.message);
    }
     
    };

  return <Auth.Provider value={{authState,login,logout}}>{children}</Auth.Provider>;
};

export default Context;



export const AuthContext = () => {
  return  useContext(Auth)
}
