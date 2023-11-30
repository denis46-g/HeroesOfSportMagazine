import {React} from 'react'
import ReactDOM from 'react-dom/client'

import * as raw1 from 'url:./sport_activities.txt'

class SportMagazine{

    constructor() {}

    async activities(){
    var result = [];
    await fetch(raw1)
        .then(response => response.text())
        .then(data => {
            result = data.split('\r\n');
        });
        
    return result;
    }

    /*sportsmen(){
        return fetch(raw2)
            .then(response=>response.json())
            .then(data => {
                console.log(data)});
    }*/

    /*achievements(id){
        return fetch(`${this.baseUrl}launchpads/${id}`)
            .then(response=>response.json());
    }

    starlinks(){
        return fetch(`${this.baseUrl}starlink`)
            .then(response=>response.json());
    }*/
}

export {SportMagazine}