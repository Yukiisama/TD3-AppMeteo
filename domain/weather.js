class Weather {
    constructor(city) {
        this.url = "https://www.prevision-meteo.ch/services/json/";
        this.city = city;
        this.json = undefined;
        this.requestJson();
    }

    requestJson() {
        let meteo = fetch(this.url + this.city).then((resp) => { return resp.json(); })
            .then((json) => {
                this.json = json;
                this.showJsonData();
                if (this.json.current_condition)
                    this.showCurrent();
                this.showNextDays();
            })
            .catch((err) => console.log(err));
        return meteo;
    }
    
    showJsonData(){
        document.getElementById("collapseData").innerHTML = "<pre>" + syntaxHighlight(JSON.stringify(this.json, undefined, '\t')) +"</pre>";
    }

    showCurrent() {
        document.getElementById("condition").innerHTML = this.json.current_condition.condition;
        document.getElementById("humidity").innerHTML  = "Humidity: " + this.json.current_condition.humidity;
        document.getElementById("tmp").innerHTML       = "Temperature: " + this.json.current_condition.tmp;
        let img = new Image();
        img.src = this.json.current_condition.icon;
        let node =  document.getElementById("img");
        this.clearNode(node);
        node.appendChild(img);

    }

    clearNode(node){
        node.querySelectorAll('*').forEach(n => n.remove());
    }

    showNextDays() {
        for (let i = 0; i < 5; i++)
            if (this.json["fcst_day_" + i])
                this.showNextDay(i);
    }

    showNextDay(dayNumber){
        let dn = dayNumber + 1;
        let cond     = document.getElementById("condition" + dn);
        let tmin     = document.getElementById("tmin"+ dn);
        let tmax     = document.getElementById("tmax"+ dn);
        let data     = this.json["fcst_day_" + dayNumber];
        tmin.innerHTML = "tmin: " + data.tmin;
        tmax.innerHTML = "tmax: " + data.tmax;
        cond.innerHTML = data.condition;
        
        let img = new Image();
        img.src = data.icon;
        document.getElementById("hd" + dn).innerHTML  = data.day_long;     
        let node = document.getElementById("img" + dn);
        this.clearNode(node);
        node.appendChild(img);
    }
    // penser à réduire le nb de champs et de faire une sorte de carousel
}