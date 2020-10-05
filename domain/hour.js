class Hour{
    constructor (data, hour) {
        this.data = data;
        this.hour = hour;
    }
    showHour(){
        document.getElementById("hour").innerHTML        = this.hour;
        document.getElementById("H_condition").innerHTML = this.data.CONDITION;
        document.getElementById("H_tmin").innerHTML      = "tmin: " + this.data.DPT2m;
        document.getElementById("H_tmax").innerHTML      = "tmax: " + this.data.TMP2m;
    }
}