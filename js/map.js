import {disablePage, activePage} from './form.js';
import {generateAdvert} from './card.js';

disablePage();

const MAP_CENTER = {
  lat: 35.68390,
  lng: 139.75323,
};

const addressNode = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView(MAP_CENTER, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});


const mainMarker = L.marker(
  MAP_CENTER,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

addressNode.value = `${MAP_CENTER.lat}, ${MAP_CENTER.lng}`;

mainMarker.on('drag', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coodinateLat = coordinates.lat.toFixed(5);
  const coordinateLng = coordinates.lng.toFixed(5);
  addressNode.value = `${coodinateLat}, ${coordinateLng}`;
});

const ADVERT_COUNT = 10;
const addPinsToMap = (advertList) => {
  advertList.slice(0, ADVERT_COUNT).forEach((advert) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const { location: {lat,lng}} = advert;
    const marker = L.marker({
      lat,
      lng,
    },
    {
      icon,
    });
    marker.addTo(map).bindPopup(generateAdvert(advert));
  });
};

const resetMap = () => {
  map.closePopup();
  map.setView(MAP_CENTER, 12);
  mainMarker.setLatLng(MAP_CENTER);
};


export { addPinsToMap, resetMap, MAP_CENTER};
