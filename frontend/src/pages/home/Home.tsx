import "./home.scss";
import Stories from "../../components/stories/stories";
import Posts from "../../components/posts/posts";
import UploadPost from "../../components/postUploading/postUploading";
import { AuthContext } from "../../contextApi/createContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CommentProvider from "../../contextApi/commentProvider";
function Home(){
    const {isAuthenticated}=useContext(AuthContext);
    if(!isAuthenticated){
        <Navigate to="/login" />
    }
    return(
        <div className="home">
            <div className="stories">
                <Stories></Stories>
            </div>
            <UploadPost/>
            <CommentProvider><Posts/></CommentProvider>
        </div>
    )
}
export default Home;
