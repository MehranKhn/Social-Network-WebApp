interface Users{
    users:{image:string,name:string}[]
}


export default function Friends({users}:Users){
    return(
        <div className="item">
            <span>Online Friends</span>
            {
                users.map((user,i)=>{
                    return  <div className="user" key={i}>
                    
                        <div className="online">
                            <div className="onlineImage">
                                <img src={user.image} alt={user.name} /> 
                                <button></button>
                            </div>
                               
                            <span className="name">{user.name}</span>
                        </div>
                        
                </div>
                })
             }
        </div>
    )
}