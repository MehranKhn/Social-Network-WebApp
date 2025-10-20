import "./rightBar.scss";
import "../../darkThemeStyles/rightBarStyles.scss";

import Card from "../card/card";
import SuggestionsCard from "../card/suggestions";
import umaidKhan from "../../assets/umaidKhan.jpg";
import heroFaizan from "../../assets/heroFaizan.jpg"
import ActivitiesCard from "../card/Activities";
import Friends from "../card/frnds";
import { useContext } from "react";
import { ThemeContext } from "../../contextApi/createContext";

const usersWithActivities=[
    {
        image:umaidKhan,
        name:"Riyan",
        action:"changed their cover picture",
        time:1
    },
    {
        image:heroFaizan,
        name:"Faizan",
        action:null,
        time:1
    },{
        image:umaidKhan,
        name:"Faisal",
        action:"changed their cover picture",
        time:1
    },{
        image:heroFaizan,
        name:"Asif",
        action:null,
        time:1
    },{
        image:umaidKhan,
        name:"Mehran",
        action:"changed their cover picture",
        time:1
    },{
        image:heroFaizan,
        name:"Umaid",
        action:null,
        time:1
    },
]
const users=[
    {
        image:heroFaizan,
        name:"Faizan"
    },
    {
        image:heroFaizan,
        name:"Asif"
    },
    {
        image:umaidKhan,
        name:"Mehran",
    },
    {
        image:umaidKhan,
        name:"Faisal",
    },
    {
        image:umaidKhan,
        name:"Umaid",
    }
]

function RightBar(){
    const {theme}=useContext(ThemeContext);

    return <div className={`rightBar${theme=="light"?"":" dark"}`}>

        <div className="contentContainer">
            <Card>
                <SuggestionsCard users={users}/>
            </Card>

            <Card>
                <ActivitiesCard users={usersWithActivities}></ActivitiesCard>
            </Card>
            <Card>
                <Friends users={users}></Friends>
            </Card>
        </div>

    </div>
}
export default RightBar;