function noDuplicates(tab, isText){
    let set = new Set();
    tab.forEach(element => set.add((isText) ? element.city : element.code));
    return [...set];
}

function autoComplete(completionTab, isText){
    const list = document.getElementById('cityList');
    list.querySelectorAll('*').forEach(n => n.remove());
    let tab = noDuplicates(completionTab.cities, isText);
    tab.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        list.appendChild(option);
    });

}



function getAvailablesCities(){
    //const url = 'https://www.prevision-meteo.ch/services/json/list-cities';
    /* if I didn't have CORS issues, thats what i would have done, but they didn't allow access control allow origin*/
    let doc = document.getElementById('city').value;
    if (doc == '') return;
    const url = 'https://vicopo.selfbuild.fr/cherche/' + doc;
    let f = fetch(url)
                .then(response => response.json())
                .then(json => autoComplete(json, isNaN(doc)))
                .catch((err) => console.log(err));
    
}