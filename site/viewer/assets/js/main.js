import TileLayer from 'ol/layer/Tile.js';
import {TileDebug} from 'ol/source.js';
import Overlay from 'ol/Overlay.js';
import {toLonLat, fromLonLat} from 'ol/proj.js';
import apply from 'ol-mapbox-style';
import 'normalize.css';
import '@fontsource/open-sans';
import {mapViewer} from './map-viewer.js'

const layer_url = import.meta.env.VITE_TILE_URL;
import {style} from "./map-style.js"

console.log(`Loaded url ${layer_url} from env`);

style.sources.vector_layer_.tiles = [layer_url];

const center = [9.93, 51.55]
const initialZoom = 6;

const map = mapViewer('map', style, [], layer_url, undefined, center, initialZoom, 15);

apply(map, style);
map.addLayer(
  new TileLayer({
    source: new TileDebug({'zDirection': 1, 'template': '{z}/{x}/{y}'}),
  })
);

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};
map.addOverlay(overlay);

map.on('pointermove', function (evt) {
  if (evt.dragging) {
    return;
  }
  const coordinate = evt.coordinate;
  const pixel = map.getEventPixel(evt.originalEvent);
  const features = map.getFeaturesAtPixel(pixel);

  console.group("features at " + toLonLat(coordinate) + ', pixel coordinates: ' + pixel + '');
  if (features.length > 0) {
    const properties = features.map(function(feature) {
      return feature.getProperties();
    });

    const lineTemplate = function(key, value) {
      return `<tr><td class="key">${key}</td><td class="value">${value}</td></tr>`
    }

    var info = '<table class="info-table">';
    properties.forEach(function(property){
      console.log(`layer ${property.layer}, class ${property.class}`);
      info += lineTemplate('Layer:', property.layer);
      info += lineTemplate('Class:', property.class);

      for (const [key, value] of Object.entries(property)) {
        if (key != 'class' && key != 'layer') {
          info += lineTemplate(key + ':', value);
        }
      };

    });

    info += '</table>';

    content.innerHTML = '<h1>Layer info:</h1><hr><p>' + info + '</p>';
  }
  overlay.setPosition(coordinate);
  console.groupEnd();
});


export default map;
