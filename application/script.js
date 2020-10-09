const NBDAYS = 5;
let map = new Map();
let scr = [false, false, false, false, false];

initDaysDiv();
setInterval(scrollAllHours,1000);

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
            hourDiv.style = "padding-left: 5px;margin-left: 10px;";
            hourDiv.id = "d" + i + "h" + h; 
            aligned.appendChild(hourDiv);
        }
        node.appendChild(aligned);
    }
}

function scroll(id, i){
    if (!scr[i]){
       document.getElementById(id).scrollTop += document.getElementById(id).clientHeight /2;
       let current = document.getElementById(id).scrollTop;
       let max     = document.getElementById(id).scrollHeight - document.getElementById(id).clientHeight;
       if (current == max && current != 0 && max != 0){
            scr[i] = true;
       }
    }
    else{
        let x = document.getElementById(id).scrollTop -= document.getElementById(id).clientHeight /2;
        if (x <= 0){
            document.getElementById(id).scrollTop = 0;
            scr[i] = false;
        }
    }

}
function city(){
    let data = document.getElementById("city").value;
    if (!isNaN(data)){
        let postalSearch = new Postal(data);
    }
    else
    {
       let w = new Weather(data);
    }
}

