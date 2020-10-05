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
        document.getElementById("tdh0").innerHTML      = "Maintenant";  
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
        let cond     = document.getElementById("condition" + dayNumber);
        let tmin     = document.getElementById("tmin"+ dayNumber);
        let tmax     = document.getElementById("tmax"+ dayNumber);
        let data     = this.json["fcst_day_" + dayNumber];
        tmin.innerHTML = "tmin: " + data.tmin;
        tmax.innerHTML = "tmax: " + data.tmax;
        cond.innerHTML = data.condition;
        
        let img = new Image();
        img.src = data.icon;
        document.getElementById("hd" + dayNumber).innerHTML  = data.day_long;     
        let node = document.getElementById("img" + dayNumber);
        this.clearNode(node);
        node.appendChild(img);


        // a ameliorer avec carousel
        Object.keys(data.hourly_data).forEach(e => {
                let hour = new Hour(data.hourly_data[e],e,dayNumber);
                hour.showHour();
        });
    }
    // penser à réduire le nb de champs et de faire une sorte de carousel
}