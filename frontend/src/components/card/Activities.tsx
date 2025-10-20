
interface Users{
    users:{image:string,name:string,action:string|null,time:number}[]
}

function ActivitiesCard({users}:Users){

    function formatTime(minutes: number): string {
        if (minutes < 60) return `${minutes} min ago`;
        
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;

        if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
        return `${hrs} hr${hrs > 1 ? "s" : ""} ${mins} min ago`;
    }

    return(
        <div className="item" >
            <span>Latest Activities</span>

             {
                users.map((user,i)=>{
                    return  <div className="user" key={i}>
                    
                <div className="activities">

                    <div className="info"> 
                        <img src={user.image} alt={user.name} />    
                        <span className="name">{user.name}</span>

                        <div className="action">
                             <span >{user.action}</span>
                        </div>
                       
                    </div>
                        
                        
                        <span className="time">{formatTime(user.time)}</span>

                </div>
             </div>
                })
             }
             
        </div>
    )
}
export default ActivitiesCard;