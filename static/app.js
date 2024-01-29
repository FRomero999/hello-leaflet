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



