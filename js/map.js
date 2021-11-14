import {disablePage, activateMainForm} from './form.js';
import {generateAdvert} from './card.js';
import {debounce} from './utils.js';

const MAP_CENTER = {
  lat: 35.68390,
  lng: 139.75323,
};

const LOW_PRICE = 0;
const MIDDLE_PRICE = 10000;
const HIGH_PRICE = 50000;
const ZOOM_MAP = 12;
const MAIN_MARKER_SIZES = [52, 52];
const MAIN_MARKER_ANCHORS = [26, 52];
const MAIN_MARKER_URL = 'img/main-pin.svg';
const MARKER_SIZES = [40, 40];
const MARKER_ANCHORS = [20, 40];
const MARKER_URL = 'img/pin.svg';

disablePage();

const addressNode = document.querySelector('#address');
const mainMarkerIcon = L.icon({
  iconUrl: MAIN_MARKER_URL,
  iconSize: MAIN_MARKER_SIZES,
  iconAnchor: MAIN_MARKER_ANCHORS,
});
let map;
let markerGroup;
let mainMarker;

const createMainMarker = () => {
  mainMarker = L.marker(
    MAP_CENTER,
    {
      draggable: true,
      icon: mainMarkerIcon,
    },
  );
  mainMarker.on('drag', (evt) => {
    const coordinates = evt.target.getLatLng();
    const coodinateLat = coordinates.lat.toFixed(5);
    const coordinateLng = coordinates.lng.toFixed(5);
    addressNode.value = `${coodinateLat}, ${coordinateLng}`;
  });

  mainMarker.addTo(map);
};

const loadMap = (onLoad) => {
  map = L.map('map-canvas')
    .on('load', () => {
      onLoad();
      activateMainForm();
    })
    .setView(MAP_CENTER, ZOOM_MAP);
  markerGroup = L.layerGroup().addTo(map);
  createMainMarker();
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};


addressNode.value = `${MAP_CENTER.lat}, ${MAP_CENTER.lng}`;


const ADVERT_COUNT = 10;
const filterFormNode = document.querySelector('.map__filters');
const houseSelectNode = filterFormNode.querySelector('#housing-type');
const priceSelectNode = filterFormNode.querySelector('#housing-price');
const roomSelectNode = filterFormNode.querySelector('#housing-rooms');
const guestSelectNode = filterFormNode.querySelector('#housing-guests');

const filterByHouse = (advert) => houseSelectNode.value === 'any' || houseSelectNode.value === advert.offer.type;

const filterByPrice = (advert) => priceSelectNode.value === 'any'
   || (priceSelectNode.value === 'low' && advert.offer.price >= LOW_PRICE && advert.offer.price < MIDDLE_PRICE)
   || (priceSelectNode.value === 'middle' && advert.offer.price >= MIDDLE_PRICE && advert.offer.price <= HIGH_PRICE)
   || (priceSelectNode.value === 'high' && advert.offer.price > HIGH_PRICE);

const filterByRooms = (advert) => roomSelectNode.value === 'any' || Number(roomSelectNode.value) === advert.offer.rooms;

const filterByGuests = (advert) => guestSelectNode.value === 'any' || Number(guestSelectNode.value) === advert.offer.guests;
const filterByFeatures = (advert) => {
  const features = advert.offer.features || [];
  const featuresListNode = filterFormNode.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = Array.from(featuresListNode).map((input) => input.value);
  return featuresSelected.every((element) => features.includes(element));
};

const filterAdverts = (advert) => filterByHouse(advert) && filterByPrice(advert) && filterByRooms(advert) && filterByGuests(advert) && filterByFeatures(advert);

const createMarker = (advert) => {
  const icon = L.icon({
    iconUrl: MARKER_URL,
    iconSize: MARKER_SIZES,
    iconAnchor: MARKER_ANCHORS,
  });
  const { location: {lat,lng}} = advert;
  return L.marker({
    lat,
    lng,
  },
  {
    icon,
  });
};

const addPinsToMap = (advertList) => {
  markerGroup.clearLayers();
  advertList
    .filter(filterAdverts)
    .slice(0, ADVERT_COUNT).forEach((advert) => {
      const marker = createMarker(advert);
      marker.addTo(markerGroup);
      marker.addTo(map).bindPopup(generateAdvert(advert));
    });
};

const resetMap = () => {
  map.closePopup();
  map.setView(MAP_CENTER, ZOOM_MAP);
  mainMarker.setLatLng(MAP_CENTER);
};

const setFilterForm = (advertList) => {
  filterFormNode.addEventListener('change', debounce(() => addPinsToMap(advertList)));
};

export { addPinsToMap, resetMap, setFilterForm, MAP_CENTER, loadMap};
