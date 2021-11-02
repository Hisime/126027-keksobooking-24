import {disablePage, activePage} from './form.js';
import {generateAdvert, advertList} from './card.js';

disablePage();

const addressNode = document.querySelector('#address');
const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: 35.4200,
    lng: 139.2530,
  }, 10);

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
  {
    lat: 35.4200,
    lng: 139.2530,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

addressNode.value = '35.4200, 139.2530';

mainMarker.on('drag', (evt) => {
  const coordinates = evt.target.getLatLng();
  const coodinateLat = coordinates.lat.toFixed(5);
  const coordinateLng = coordinates.lng.toFixed(5);
  addressNode.value = `${coodinateLat}, ${coordinateLng}`;
});

advertList.forEach((advert) => {
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

