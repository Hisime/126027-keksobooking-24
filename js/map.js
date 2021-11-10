import {disablePage, activePage} from './form.js';
import {generateAdvert} from './card.js';
import { debounce } from './utils/debounce.js';

const MAP_CENTER = {
  lat: 35.68390,
  lng: 139.75323,
};

const LOW_PRICE = 0;
const MIDDLE_PRICE = 10000;
const HIGH_PRICE = 50000;

disablePage();

const markers = [];
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
const filterFormNode = document.querySelector('.map__filters');
const houseSelectNode = filterFormNode.querySelector('#housing-type');
const priceSelectNode = filterFormNode.querySelector('#housing-price');
const roomSelectNode = filterFormNode.querySelector('#housing-rooms');
const guestSelectNode = filterFormNode.querySelector('#housing-guests');

const filterByHouse = (advert) => {
  if (houseSelectNode.value === 'any') {
    return true;
  }
  return houseSelectNode.value === advert.offer.type;
};

const filterByPrice = (advert) => {
  if (priceSelectNode.value === 'any') {
    return true;
  }
  if (priceSelectNode.value === 'low' && advert.offer.price >= LOW_PRICE && advert.offer.price < MIDDLE_PRICE) {
    return true;
  }
  if (priceSelectNode.value === 'middle' && advert.offer.price >= MIDDLE_PRICE && advert.offer.price <= HIGH_PRICE) {
    return true;
  }
  return priceSelectNode.value === 'high' && advert.offer.price > HIGH_PRICE;
};

const filterByRooms = (advert) => {
  if (roomSelectNode.value === 'any') {
    return true;
  }
  return Number(roomSelectNode.value) === advert.offer.rooms;
};

const filterByGuests = (advert) => {
  if (guestSelectNode.value === 'any') {
    return true;
  }
  return Number(guestSelectNode.value) === advert.offer.guests;
};
const filterByFeatures = (advert) => {
  const features = advert.offer.features || [];
  const featuresListNode = filterFormNode.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = Array.from(featuresListNode).map((input) => input.value);
  return featuresSelected.every((element) => features.includes(element));
};

const addPinsToMap = (advertList) => {
  markers.forEach((marker) => {
    marker.remove();
  });
  advertList
    .slice()
    .filter(filterByHouse)
    .filter(filterByPrice)
    .filter(filterByRooms)
    .filter(filterByGuests)
    .filter(filterByFeatures)
    .slice(0, ADVERT_COUNT).forEach((advert) => {
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
      markers.push(marker);
      marker.addTo(map).bindPopup(generateAdvert(advert));
    });
};

const resetMap = () => {
  map.closePopup();
  map.setView(MAP_CENTER, 12);
  mainMarker.setLatLng(MAP_CENTER);
};

const setFilterForm = (advertList) => {
  filterFormNode.addEventListener('change', debounce(() => addPinsToMap(advertList)));
};

export { addPinsToMap, resetMap, setFilterForm, MAP_CENTER};
