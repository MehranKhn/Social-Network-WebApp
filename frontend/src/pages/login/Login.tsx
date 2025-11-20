import type React from 'react';
import './login.scss';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../contextApi/createContext';
import toast from 'react-hot-toast';

function Login(){
    const [inputs,setInput]=useState({
        username:"",
        password:""
    });
    const [err,setErr]=useState<Record<string,string>>({});
    const {setIsAuthenticated,setCurrentUserId}=useContext(AuthContext);
    const [loading,setLoading]=useState(false);

    const Navigate=useNavigate();
    function handleNavigate(){
        Navigate('/register')
    }

    function handleChange(e:React.ChangeEvent<HTMLFormElement>){
        const target=e.target as unknown as HTMLInputElement;
        const {name,value}=target;
        setErr({});

        setInput(prev=>({...prev,[name]:value}));
    }

    async function handleLogin(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        if (inputs.username.trim() === "") {
            newErrors.username = "Please enter your username";
        }
        if (inputs.password.trim() === "") {
            newErrors.password = "Please enter your password";
        }

        // If any errors exist, set them and stop execution
        if (Object.keys(newErrors).length > 0) {
            setErr(newErrors);
            return;
        }

        try{
           setLoading(true);
            const response=await axios.post("http://192.168.12.31:3000/api/auth/login",inputs,{
                withCredentials:true
            });
            if(response.status==200){
                setIsAuthenticated(true);
                setCurrentUserId(response.data.id);
                const {id,...rest}=response.data;

                localStorage.setItem("user",JSON.stringify(rest));
                toast.success("Logged In Successfully!");
                Navigate("/")
            }
            
        }
        catch(e:unknown){
            if(axios.isAxiosError(e)){
                setErr({general:e.response?.data.msg});
                setLoading(false);
                
            }else{
                setErr({general:"Something went worng"});
            }
        }
    }

   
    return (
        <div className="login">
              <div className="card">
                    <div className="left">
                          <h1>Zwitter</h1>

                          <p>Welcome to Zwitter, where every thought, every moment, and every connection matters. Zwitter is more than just a social media app—it's a vibrant, real-time community that keeps you in the loop with what's happening around the world and with the people you care about most. Share your ideas in short, impactful messages, discover trending topics, and connect with a diverse network of users who share your interests. Whether you're following your favorite creators, staying updated on breaking news, or just sharing a laugh with friends, Zwitter's seamless interface and instant updates ensure you never miss a beat. Join the conversation and start creating your own story, one Zweet at a time.</p>

                          <span>Don't have an account?</span>
                          <button onClick={handleNavigate}>Register</button>
                    </div>
                    <div className="right">
                        <h1>Login Into Your Account</h1>
                        <form onChange={handleChange}>
                            <input type="text" placeholder="Enter your username or email" name='username' />

                            {err.username && <p style={{color:"red"}}>{err.username}</p>}

                            <input type="text" placeholder="Password" name='password'/>

                             {err.password && <p style={{color:"red"}}>{err.password}</p>}
                                
                         {err && <p style={{color:"red"}}>{err.general}</p>}      

                            <button onClick={handleLogin} disabled={loading}>{loading?<span className='spinner'></span>:"Login"}</button>

        
                        </form>
                    </div>
              </div>
        </div>
    )
}

export default Login;