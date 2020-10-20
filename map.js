
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
const mymap = L.map('mapid').setView([20, 0], 1);
const attribution = 
    `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
const tileUrl = `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
const tiles = L.tileLayer(tileUrl,{attribution})
tiles.addTo(mymap)

//mymap.addControl(new L.Control.SearchMarker({toggleFullscreen: true}));
 mymap.addControl(new L.Control.Fullscreen({fullscreenControl: {
    pseudoFullscreen: true 
}}));



const markers=[]

listOfLocations.forEach((location)=>{
    const length = markers.push(L.marker(location.cords, {name: location.name}).addTo(mymap));
    const index = length -1;
    console.log(markers[index]);
    L.DomUtil.addClass(markers[index]._icon, 'fullscreenMarker');
    const item = document.querySelector(`#${location.name}Trip`);
    if(item){
        var clone = item.cloneNode(true)
        markers[index].bindPopup(clone,{ maxWidth: 300, minWidth: 200, className:"fullscreenContent"});
    }
})


listOfLocations.forEach((location)=>{
    let length = markers.push(L.marker(location.cords, {name: location.name}).addTo(mymap));
    const index = length-1;
    L.DomUtil.addClass(markers[index]._icon, 'normalMarker');
    markers[index].bindPopup(`${location.name}`,{closeButton: false});
    markers[index].on('mouseover', function (e) {
        this.openPopup();
    });
    markers[index].on('mouseout', function (e) {
        this.closePopup();
    });
    markers[index].on('click', function(ev) {
        const yOffset = -100; 
        const element = document.getElementById(`${location.name}Trip`);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({top: y});
    });
})


layerGroup = L.layerGroup(markers);
const searchController = new L.Control.SearchMarker({layer:layerGroup});
mymap.addControl(searchController);
searchController.startSearch();

const fullscreenMarkers = document.querySelectorAll('.fullscreenMarker');
const minimizedMarkers = document.querySelectorAll('.normalMarker')

// // `fullscreenchange` Event that's fired when entering or exiting fullscreen.
mymap.on('fullscreenchange', function () {
    if (mymap.isFullscreen()) {
        fullscreenMarkers.forEach(el=>el.style.display = 'block');
        minimizedMarkers.forEach(el=>el.style.display = 'none');
        mymap.setView([30,mymap.getCenter().lng],2)
        console.log('fullscreen')
    } else {
        fullscreenMarkers.forEach(el=>el.style.display = 'none');
        minimizedMarkers.forEach(el=>el.style.display = 'block');
        mymap.closePopup();
        mymap.setView([30,mymap.getCenter().lng],0)
        console.log('minimized')
    }
});
mymap.on('popupopen', ()=>{
    M.AutoInit();
})

mymap.on('drag', ()=>{
    let {lng} = mymap.getCenter();
    let x = Math.trunc(lng);
    markers.forEach((marker)=>{
        const {lat:markerLat, lng:markerLng}= marker.getLatLng();
        if(x - markerLng > 180){
            var newLatLng = new L.LatLng( markerLat, markerLng+360);
            marker.setLatLng(newLatLng); 
        }else if(lng - markerLng < -180){
            var newLatLng = new L.LatLng(markerLat, markerLng-360);
            marker.setLatLng(newLatLng); 
        }
    })
})