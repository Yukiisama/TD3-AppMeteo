const NBDAYS = 5;
const map = new Map();
let scrollDown = [false, false, false, false, false];


initDaysDiv();
setInterval(scrollAllHours,1000);
setInterval(getAvailablesCities,500);

function scrollAllHours(){
    for (let i = 0; i < 5; i++)
        scroll('hourly' + i, i);
}

function initDaysDiv(){
    for (let i = 0; i < NBDAYS; i++){
        let node = document.getElementById('hourly' + i);
        let aligned = document.createElement('div');
        aligned.className = "row align-items-start";
        for (let h = 0; h < 24; h++){
            let hourDiv = document.createElement('div');
            hourDiv.id = "d" + i + "h" + h; 
            aligned.appendChild(hourDiv);
        }
        node.appendChild(aligned);
    }
}

function scroll(id, i){
    if (!scrollDown[i]){
       document.getElementById(id).scrollTop += document.getElementById(id).clientHeight /2;
       let current = document.getElementById(id).scrollTop;
       let max     = document.getElementById(id).scrollHeight - document.getElementById(id).clientHeight;
       if (current == max && current != 0 && max != 0){
            scrollDown[i] = true;
       }
    }
    else{
        let x = document.getElementById(id).scrollTop -= document.getElementById(id).clientHeight /2;
        if (x <= 0){
            document.getElementById(id).scrollTop = 0;
            scrollDown[i] = false;
        }
    }

}
let old_city = undefined;
function city(){
    let data = document.getElementById("city").value;
    if(old_city != data){
        if (!isNaN(data)){
            let postalSearch = new Postal(data);
        }
        else
        {
        let w = new Weather(data);
        }
    }
    old_city = data;
}



