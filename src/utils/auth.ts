import axios from "axios";

import { BASE_URL,GET_TOKEN ,GET_USER,REFRESH_TOKEN} from "./constant";


interface LoginResponse{
    access:string;
    refresh:string;

}



export const login = async (email:string,password:string):Promise<LoginResponse>=>{


    try{
        const response = await axios.post<LoginResponse>(`${BASE_URL}${GET_TOKEN}`,{
            username:email,password:password
        });
        localStorage.setItem("accessToken",response.data.access)
        localStorage.setItem("refreshToken",response.data.refresh)

        return response.data;
    }
    catch(error){
        console.error("Login Failed",error)
        throw new Error("Invalid Email Or Password")
    }

    


}

export const getUserData = async () :Promise<any>=> {

    try{
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access Token Found");
        const response = await axios.get(`${BASE_URL}${GET_USER}`,{headers:{
            Authorization:`Bearer ${token}`

        }});
        return response.data
    }
    catch(error:any){
        if (error.response && error.response.status ===401){
            await refreshAccessToken();
            return getUserData();
        }
        else{
            console.log(error);
            throw error;
        }
        
    }
}


interface RefreshTokenResponse{
    access:string
}


export const refreshAccessToken = async():Promise<void> =>{
    try{
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No Refresh Token Found");
        const response = await axios.post<RefreshTokenResponse>(`${BASE_URL}${REFRESH_TOKEN}`,{
           refresh:refreshToken});

        localStorage.setItem("accessToken",response.data.access);

        
    }
    catch(error){
        console.error("Refresh Token Failed",error)
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("Session Expired. Please Login Again.")
    }

}


export const isAuthenticated = ():boolean =>{
    const accessToken = localStorage.getItem("accessToken");
    return !!accessToken;
}