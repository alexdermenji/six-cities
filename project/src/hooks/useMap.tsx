import {useEffect, useState, MutableRefObject} from 'react';
import leaflet from 'leaflet';
import { MapCoords} from '../types/offers-type';
import {Map} from 'leaflet';


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: MapCoords,
): Map | null {

  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && map === null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom,
      });


      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);


      setMap(instance);
    }

  }, [mapRef, map, city]);

  return map;
}

export default useMap;
