
interface Users{
    users:{image:string,name:string}[]
}

function SuggestionsCard({users}:Users){
    return(
       <div className="item">
            <span>Suggestions For You</span>

        {
            users.map((user,i)=>{
                return <div className="user"  key={i}>
              
                    <div className="userInfo">
                        <img src={user.image} alt="Umaid" />
                        <span>{user.name}</span>
                    </div>
                        

                        <div className="buttons">
                            <button>Follow</button>
                            <button>Dismiss</button>
                        </div>
                
            </div>
                })
            }
            
       </div>
    )
}
export default SuggestionsCard;


                