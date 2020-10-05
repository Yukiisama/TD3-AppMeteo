let map = new Map();
let scr = [false, false, false, false, false];
setInterval(scrollAllHours,500);

function scrollAllHours(){
    for (let i = 0; i < 5; i++)
        scroll('hourly' + i, i);
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
    let w   = new Weather(document.getElementById("city").value);
}

