import React, { useState } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import z from "zod";

function Register(){
   const inputSchema=z.object({
    name:z.string().min(1,"Please Enter You name"),
    email:z.string().email("Invalid email format"),
    password:z.string().min(8,"Password must be 8 characters long").max(23,"Password must be at most 23 characters long").regex(/[A-Z]/,"Password must contain at least one upperCase letter").regex(/[0-9]/,"Password must contain at least one number"),
    username:z.string().min(3,"username must be at least 3 characters long")
   });

    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:"",
        name:""
    });
    
    
   const [err,setErr]=useState<Record<string,string>>({});

    const Navigate=useNavigate();
    function handleNavigate(){
        Navigate('/login')
    }

    function handleChange(e:React.ChangeEvent<HTMLFormElement>){
        const target=e.target as unknown as HTMLInputElement;
        const {value,name}=target;
        
        setErr(prev=>{
            if(typeof prev=="object"){
                return {...prev,[name]:""}
            }
            return prev;
        })

        setInputs(prev=>({...prev,[name]:value}));

        
    }


   async function Register(e:React.MouseEvent<HTMLButtonElement>){
       e.preventDefault();
       const parsedData=inputSchema.safeParse(inputs);
       
       if(parsedData.success){
            try{
        
                const response=await axios.post("http://localhost:3000/api/auth/register",inputs);
                
                if(response.status==200){
                    Navigate('/login');
                }

            }

            catch(e:unknown){
                    if(axios.isAxiosError(e)){
                        
                        setErr({general:e.response?.data.msg});
                    }
                    else{
                        setErr({general:"Something went wrong"});
                    }
                }
            }
            
            else{
                const fieldErrors:Record<string,string>={};
                const formattedErrors=parsedData.error.format();
                console.log(formattedErrors.password);
                for(const key in formattedErrors){
                   const errObj=formattedErrors[key as keyof typeof formattedErrors];
                   if(errObj && "_errors" in errObj && Array.isArray(errObj._errors)){
                      fieldErrors[key]=errObj._errors[0];
                   }
                }
                setErr(fieldErrors);
                console.log(fieldErrors)
            }

   }

    return(
         <div className="register">
              <div className="card">
                    <div className="left">
                        <h1>Register</h1>
                        <form onChange={handleChange}>
                        <input type="text" placeholder="Name" name="name"/>
                        {err.name && <p style={{color:"red"}} className="error">{err.name}</p>}

                            <input type="text" placeholder="Username" name="username"/>
                            {err.username && <p style={{color:"red"}} className="error">{err.username}</p>}
                            <input type="email" placeholder="email" name="email"/>
                            {err.email && <p style={{color:"red"}} className="error">{err.email}</p>}
                            <input type="password" placeholder="Password" name="password"/>
                            {err.password && <p style={{color:"red"}} className="error">{err.password}</p>}

                           {err && <p style={{color:"red"}}>{err.general}</p>}

                            <button onClick={Register}>Register</button>
                        </form>
                    </div>
                    <div className="right">
                          <h1>Zwitter</h1>

                          <p>Welcome to Zwitter, where every thought, every moment, and every connection matters. Zwitter is more than just a social media app—it's a vibrant, real-time community that keeps you in the loop with what's happening around the world and with the people you care about most. Share your ideas in short, impactful messages, discover trending topics, and connect with a diverse network of users who share your interests. Whether you're following your favorite creators, staying updated on breaking news, or just sharing a laugh with friends, Zwitter's seamless interface and instant updates ensure you never miss a beat. Join the conversation and start creating your own story, one Zweet at a time.</p>

                          <span>Do you have an account?</span>
                          <button onClick={handleNavigate}>Login</button>
                    </div>
              </div>
        </div>
    )
}
export default Register