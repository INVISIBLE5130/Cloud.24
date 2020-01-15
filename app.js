window.addEventListener("load",()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(
       ".temperature-description"
    );
    let temperatureDegree = document.querySelector(
       ".temperature-degree"
    );
    let locationTimezone = document.querySelector(
       ".location-timezone"
    );
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.indicator');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/54ae8a83bdc9ee1ce87f33f33fb3bbe9/${lat},${long}`;
        fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const{ temperature, summary, icon} = data.currently;
                //Set DOM elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                const date = new Date();
                locationTimezone.textContent = `${date.getDate()}th ${date.toString().split(' ')[1]} ${date.getFullYear()}, ${data.timezone.replace('/', ', ')}`;
                //Formula for Celsius
                let celsius = (temperature - 32) * (5 / 9);
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));
                setIcons1(icon, document.querySelector(".icon-1"));
                //Change temperature to Celsius/Furenheit
                temperatureSection.addEventListener('click', ()=>{
                   if(temperatureSpan.textContent === "F") {
                       temperatureSpan.textContent = "C";
                       temperatureDegree.textContent = Math.floor(celsius);
                   }else{
                       temperatureSpan.textContent = "F";
                       temperatureDegree.textContent = temperature;
                   }
                });
            });
        });
   }
function setIcons(icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

    function setIcons1(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});

let coll = document.getElementsByClassName('collapsible');
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener('click', function(){

        coll[i].lastElementChild.classList.toggle('display-block')
        coll[i].firstElementChild.classList.toggle('scale-img')
        this.classList.toggle('active');
    });
}

window.onscroll = function() {
    myFunction(

    )};

let header = document.getElementsByClassName('header')[0];
let scrollPrev = 0;

function myFunction() {

    let scrolled = window.pageYOffset || document.documentElement.scrollTop;

    if (scrolled > 100 && scrolled > scrollPrev) {
        header.classList.add('out');
    } else {
        header.classList.remove('out');
    }
    scrollPrev = scrolled;
}