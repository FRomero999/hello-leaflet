function haversineDistance(coords1, coords2) {
    function toRad(x) {
      return x * Math.PI / 180;
    }
  
    var lon1 = coords1[0];
    var lat1 = coords1[1];
  
    var lon2 = coords2[0];
    var lat2 = coords2[1];
  
    var R = 6371; // km
  
    var x1 = lat2 - lat1;
    var dLat = toRad(x1);
    var x2 = lon2 - lon1;
    var dLon = toRad(x2)
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
  
    return d; // km
}

var map;

// Inicialización del mapa
function initMap(){
    map = L.map('mapa').setView([36.719332, -4.423457], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
};

function addToMap(data){
    let marker = L.marker([data.lat, data.lon]).addTo(map);
    marker.bindPopup(
        `<h3>${data.nombre}</h3>
        <p>${data.ciclos}</p>
        `);
    marker.addEventListener("click",()=>{
        console.log(data.nombre);
        document.querySelector("#info h3").textContent = data.nombre;
        document.querySelector("#info p").textContent = data.ciclos;
        document.querySelector("#info img").setAttribute("src",data.imagen  );
        document.querySelector("#info a").setAttribute("href",`url(${data.link})`);
    });
    console.log(marker);
}



//Inicializar el mapa
initMap();

//Carga de datos
fetch("static/datos.json")
.then( (res) => res.json() )
.then( (data) => {

    data.forEach(element => {
        console.log(element);
        addToMap(element);
    });
    
} )
.catch( (err)=>{
    console.log("Error en el fetch");
    console.log(err);
});

document.querySelector("#geolocator button").addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (pos) => {
            let marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
            marker.bindPopup("Aqui estoy").openPopup();
            map.setView([pos.coords.latitude, pos.coords.longitude], 18);
        });
    }
});


