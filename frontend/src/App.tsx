import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import NavBar from "./components/navBar/NavBar";
import RightBar from "./components/rightBar/RightBar";
import LeftBar from "./components/leftBar/LeftBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import BottomBar from "./components/bottomNavBar/bottomBar";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";

import { RouterProvider,createBrowserRouter,Outlet, useLocation } from "react-router-dom";

import { SideBarProvider } from "./contextApi/sideBarprovider";
import ToggleThemeProvider from "./contextApi/toggleThemeProvider";
import { ThemeContext } from "./contextApi/createContext";
import ProtectedRoutes from "./utils/protectedRoutes";
const queryClient=new QueryClient();
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAxiosInterceptor } from "./interceptor/interceptor";

import { Toaster } from "react-hot-toast";

function App(){
    const Layout=()=>{
        useAxiosInterceptor();
        const location=useLocation();
        const hideRightLeft=location.pathname.startsWith("/profile");
        const {theme}=useContext(ThemeContext);
       return(
           <div style={theme=="light"?{backgroundColor:"#f1f4f5ff"}:{backgroundColor:"rgba(63, 54, 54, 1)",transition:"background-color 0.3s ease-in-out",minHeight:"100vh"}}>
                   <NavBar></NavBar>
               <div style={{display:"flex"}}>
                  <LeftBar></LeftBar>
                   <div className={`outlet${theme=="light"?"":" dark"}`} style={{flex:6}}>
                   <Outlet></Outlet>
                   </div>
                  {!hideRightLeft && <RightBar></RightBar>}
               </div>

               <div className="Bottom">
               <BottomBar></BottomBar>
               </div>
           </div>
       )
    }

      
     const router=createBrowserRouter([
        {
            path:'/',
            element:<ProtectedRoutes><Layout/></ProtectedRoutes>,
            children:[
                {
                    path:"/",
                    element:<Home/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                }
            ]
        },
        {
            path:'/login',
            element:<Login/>
        },
        {
            path:'/register',
            element:<Register/>
        }
     ])

    return(
        <div className="App" style={{height:"100vh",justifyContent:"center",alignItems:"center"}}>

            <Toaster position="bottom-center"  toastOptions={{
                duration:3000,
                style: {
                    background: "#333",
                    color: "#fff",
                    borderRadius: "8px",
                    padding: "12px 18px",
                    fontSize:"18px",
                    
                    },
            }}/>
             <QueryClientProvider client={queryClient}>
                <ToggleThemeProvider>
                    <SideBarProvider>
                    <RouterProvider router={router}></RouterProvider>
                    </SideBarProvider>
                </ToggleThemeProvider>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>

        </div>
    )
}
export default App;