import "./posts.scss"
import PostCard from "../card/postCard"
import heroFaizan from "../../assets/heroFaizan.jpg";
import umaidKhan from "../../assets/umaidKhan.jpg";
const posts=[
    {
        id:1,
        user:"Mehran",
        userId:2,
        ProfilePic:heroFaizan,
        time:"10 mins ago",
        description:"He is my friend umaid i love him alot",
        images:umaidKhan
    },
    {
        id:2,
        user:"Faizan",
        ProfilePic:heroFaizan,
        userId:2,
        time:"1 day ago",
        description:"He is my friend umaid i love him alot",
        images:umaidKhan
    },
    {
        id:3,
        user:"Umaid",
        userId:4,
        ProfilePic:heroFaizan,
        time:"5 day ago",
        description:"He is my friend umaid i love him alot",
        images:umaidKhan
    },
    {
        id:4,
        user:"Asif",
        userId:6,
        ProfilePic:heroFaizan,
        time:"1 hour ago",
        description:"He is my friend umaid i love him alot.heloooooo my name is amir khan and what's your name",
    },
]

export default function Posts(){
    return(
        <div className="posts" style={{minHeight:"100vh"}}>
            {
                posts.map(post=>{
                         return <PostCard id={post.id} user={post.user} userId={post.userId} profilePic={post.ProfilePic} time={post.time} description={post.description} images={post.images} key={post.id}></PostCard>
                })
            }
        </div>
    )
}