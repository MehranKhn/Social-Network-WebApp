import "./home.scss";
import Stories from "../../components/stories/stories";
import Posts from "../../components/posts/posts";

function Home(){
    return(
        <div className="home">
            <div className="stories">
                <Stories></Stories>
            </div>
            
           <Posts></Posts>
        </div>
    )
}
export default Home;
