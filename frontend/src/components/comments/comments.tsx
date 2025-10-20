import "./comments.scss";
import umaidKhan from "../../assets/umaidKhan.jpg"
import heroFaizan from "../../assets/heroFaizan.jpg"
const comments=[
    {
        id:1,
        userId:2,
        comment:"Mashallah,Allah bless you",
        name:"Arslan",
        profilePicture:umaidKhan,
    },
    {
        id:2,
        userId:4,
        comment:"Own Power,Own Rules,Own Kingdom",
        name:"Inam",
        profilePicture:heroFaizan,
    },
    {
        id:3,
        userId:6,
        comment:"hata  waiiiii",
        name:"Asif",
        profilePicture:heroFaizan,
    }
]

function Comments(){
    return(
        <div className="comments">
            <div className="write">
                <img src={heroFaizan} alt="PP" />
                <input type="text" placeholder="Write a Comment"/>
                <button>Post</button>
            </div>
           {
            comments.map(Comment=>(
            
                <div className="comment">
                     <div className="user">
                           <img src={Comment.profilePicture} alt="PP" />
                           <span>{Comment.name}</span>
                     </div>
                     <div className="text">
                        <p>{Comment.comment}</p>
                        <span>1 hour ago</span>
                  </div>
                </div>
            ))
           }
        </div>
    )
}
export default Comments;