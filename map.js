const mymap = L.map('mapid').setView([30, 0], 0);
const attribution = 
    `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
const tiles = L.tileLayer(tileUrl,{attribution})
tiles.addTo(mymap)

 mymap.addControl(new L.Control.Fullscreen());

// // `fullscreenchange` Event that's fired when entering or exiting fullscreen.
mymap.on('fullscreenchange', function () {
    console.log('test')
    if (mymap.isFullscreen()) {
        console.log('entered fullscreen');
        mymap.setZoom(2)
        mymap.fitWorld();
        
    } else {
        console.log('exited fullscreen');
        mymap.setView([30,0],0)
    }
});



listOfLocations=[
    {
        name:'capeTown',
        cords:[-33.9249, 18.4241],
    },
    {
        name:'switzerland',
        cords:[45.9766, 7.6585],
    },
    {
        name:'australia',
        cords:[-25.3444, 131.0369],
    },
    {
        name:'canada',
        cords:[50, -110],
    },
    {
        name:'japan',
        cords:[35.7, 139.75],
    },
    {
        name:'venice',
        cords:[45.4408, 12.3155],
    },
    {
        name:'egypt',
        cords:[26.8206, 30.8025],
    },
    {
        name:'hawaii',
        cords:[19.8968, -155.5828],
    }
]

marker={}

const test = (()=>{
    listOfLocations.forEach((location)=>{
        marker[location.name] = L.marker(location.cords).addTo(mymap);
        console.log(marker[location.name]);
        L.DomUtil.addClass(marker[location.name]._icon, location.name);
        L.DomUtil.addClass(marker[location.name]._icon, 'normal');
        marker[location.name].bindPopup(`${location.name}`,{closeButton: false});
        marker[location.name].on('mouseover', function (e) {
            this.openPopup();
        });
        marker[location.name].on('mouseout', function (e) {
            this.closePopup();
        });
        marker[location.name].on('click', function(ev) {
            const yOffset = -300; 
            const element = document.getElementById(`${location.name}Trip`);
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({top: y});
        });
        
        
    })
})();

//add filter
function checkMap(e){
    let places = document.querySelectorAll('.leaflet-marker-icon');
    const shadows = document.querySelector('.leaflet-shadow-pane');
    if(e.target.value === ''){
        shadows.style.display = "block";
    }else{
        shadows.style.display = "none";
        
    }     
   const value = e.target.value.toLowerCase();
        places.forEach(place=>{
            if(place.classList[3].includes(value)){
                place.style.display = "block";
            }else{
                place.style.display = "none";
            }
        })
}

