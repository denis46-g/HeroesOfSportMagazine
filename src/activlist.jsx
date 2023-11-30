import * as d3 from "d3";

import * as sprtsmn from "./legendary_sportsmen.json";
import * as achvmnts from "./sportsmen_achievements.json"

import {React} from 'react'
import ReactDOM from 'react-dom/client'

import * as fs from 'fs';

let acts;

function ActivList(magaz) {
    acts = magaz.activities

    return (
        <aside className="aside" id="launchesContainer">
            <h3 id="act_names">Виды спорта</h3>
            <div id="ActivlistContainer">

            <ul>
                {acts.map(act => {
                    return <li onMouseDown = {ShowSportsmenByActivity} key={act.id}>{act}</li>
                })}
            </ul>
            </div>
        </aside>
    )
}

export {ActivList}


let other_sport_chosen = false;

function ShowSportsmenByActivity(Event){
    let elem = Event.target
    if(elem.style.backgroundColor == "" || elem.style.backgroundColor == "white"){
        if(!other_sport_chosen){
            elem.style.backgroundColor = "red";
            other_sport_chosen = true;
            SportsmenList(elem["innerText"]);
        }
    }
    else
    {
        document.getElementById("sport_infa").remove()
        elem.style.backgroundColor = "white";
        other_sport_chosen = false;
    }
}

let sport;

function SportsmenList(act){
    let res_s;
    sprtsmn.activities.map(s => {
        if(s.name == act){
            res_s = s
            sport = s.name
        }
    })

    var sport_infa = document.createElement('div')
    sport_infa.setAttribute('id','sport_infa')

    var sport_name = document.createElement('div')
    sport_name.innerHTML = `<h3>${res_s.name}</h3>`
    sport_name.setAttribute('id', 'sport_name')
    //document.body.appendChild(sport_name);
    sport_infa.appendChild(sport_name)

    var sport_ul = document.createElement('div')
    sport_ul.setAttribute('id', 'SportsmenlistContainer')
    document.body.appendChild(sport_ul);

    var sport_ul_ul = document.createElement('ul')
    sport_ul_ul.setAttribute('id', 'sportsmenUl')
    
    {res_s.sportsmen.map(sp => {
        var li = document.createElement('li')
        li.setAttribute('id', 'li')
        li.innerHTML = `${sp}`
        li.onclick = ShowInformAboutSportsman
        sport_ul_ul.appendChild(li)
    })}

    sport_ul.appendChild(sport_ul_ul)
    sport_infa.appendChild(sport_ul)
    document.getElementById('main').appendChild(sport_infa)
    /*return (
        <aside className="aside" id="launchesContainer2">
            <h3>{res_s.name}</h3>
            <div id="SportsmenlistContainer">

            <ul>
                {res_s.sportsmen.map(sp => {
                    return <li onMouseDown = {ShowInformAboutSportsman} key = {sp.id}>{sp}</li>
                })}
            </ul>
            </div>
        </aside>
    )*/
}

let other_sportsman_chosen = false;

function ShowInformAboutSportsman(Event){
    let elem = Event.target
    if(elem.style.backgroundColor == "" || elem.style.backgroundColor == "white"){
        if(!other_sportsman_chosen){
            elem.style.backgroundColor = "red";
            other_sportsman_chosen = true;
            AchievementsInformation(elem["innerText"]);
        }
    }
    else
    {
        document.getElementById("sportsman_infa").remove()
        elem.style.backgroundColor = "white";
        other_sportsman_chosen = false;
    }
}

let photo_path = ""

function AchievementsInformation(sportsman){
    let res_sportsman;
    achvmnts.sportsmen.map(s => {
        if(s.name == sportsman){
            res_sportsman = s
        }
    })

    //let photo_path = `./photos/${sport}/${res_sportsman.name}.jpg`
    //let photo_path = "./LevYashin.png"
    photo_path = `./src/photos/${sport}/${res_sportsman.name}.jpg`

    var sportsman_infa = document.createElement('div')
    sportsman_infa.setAttribute('id','sportsman_infa')
    
    var sportsman_name = document.createElement('div')
    sportsman_name.innerHTML = `<h3>${res_sportsman.name}</h3>`
    sportsman_name.setAttribute('id', 'sportsman_name')
    sportsman_infa.appendChild(sportsman_name)

    var img = document.createElement('img')
    img.src = photo_path;
    img.setAttribute('id','image-container');
    img.alt = "sportsman"
    sportsman_infa.appendChild(img);

    var inform = document.createElement('ul')
    inform.setAttribute('id', 'sportsmanAchievUl')

    {res_sportsman.achievements.map(ach => {
        var li = document.createElement('li')
        li.setAttribute('id', 'li')
        li.innerHTML = `${ach}`
        li.onmouseenter = FillColorBlocks
        li.onmouseout = DropColorBlocks
        inform.appendChild(li)
    })}

    sportsman_infa.appendChild(inform)

    document.getElementById('main').appendChild(sportsman_infa)
}

export{photo_path}

function FillColorBlocks(Event){
    let elem = Event.target
    if (elem["innerText"].includes("серебряный") || elem["innerText"].includes("финалист"))
        document.getElementById('sportsman_name').style.backgroundColor = "silver"
    else if (elem["innerText"].includes("бронзовый"))
        document.getElementById('sportsman_name').style.backgroundColor = "rgb(205,127,50)"
    else if(elem["innerText"].includes("лимпийский чемпион") || elem["innerText"].includes("лимпийская чемпионка")
    || elem["innerText"].includes("чемпион") || elem["innerText"].includes("чемпионка") ||
    elem["innerText"].includes("обедитель") ||
    elem["innerText"].includes("олотого") || elem["innerText"].includes("бладатель"))
        document.getElementById('sportsman_name').style.backgroundColor = "gold"
}

function DropColorBlocks(Event){
    document.getElementById('sportsman_name').style.backgroundColor = "white"
}

export {SportsmenList}