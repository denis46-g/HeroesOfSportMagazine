import {ActivList, SportsmenList} from "./activlist";
import {useEffect, useState} from "react";
import {SportMagazine} from "./sportmagazine";


function App(){
    const [activities, setActivities] = useState([]);
    const sportmagazine = new SportMagazine();
    
    useEffect(()=>{
        sportmagazine.activities().then(data =>{
            setActivities(data)
        })
    },[])

    /*useEffect(()=>{
        sportmagazine.sportsmen().then(data =>{
            setSportsmen(data)
        })
    },[])*/

    //<Map /> (отредачить и вставить в return потом)

    return(
        <main className='main' id='main'>
            <ActivList activities = {activities}/>
        </main>
    )
}

export {App};