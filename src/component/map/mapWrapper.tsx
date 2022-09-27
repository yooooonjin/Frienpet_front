import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import Map from './map';
import Marker from './marker';
interface MapWrapperProps {
  markers?: Array<{ lat: number; lng: number }>;
  onSetMarker?(lat: number, lng: number): void;
  panToPosition?: { lat: number; lng: number };
}

const MapWrapper: React.FunctionComponent<MapWrapperProps> = ({
  markers,
  onSetMarker,
  panToPosition,
}) => {
  const [zoom, setZoom] = useState(3);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>();

  const render = (status: Status) => {
    return <h1>{status}</h1>;
  };

  const onClick = (e: google.maps.MapMouseEvent) => {
    onSetMarker && onSetMarker(e.latLng!.lat(), e.latLng!.lng());
  };
  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  const success = (location: any) => {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    setCenter({ lat, lng });
  };
  const error = (error: any) => {
    console.log(error);
  };
  useEffect(() => {
    const geoLocation = window.navigator.geolocation;
    geoLocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <Wrapper apiKey='AIzaSyDXtOZ_LoGxzIuADsnCMQr6S8fmxw__j88' render={render}>
      <Map
        center={center}
        onClick={onClick}
        onIdle={onIdle}
        zoom={zoom}
        panToPosition={panToPosition}
      >
        {markers &&
          markers.map((latLng, idx) => {
            return <Marker position={latLng} key={idx} />;
          })}
      </Map>
    </Wrapper>
  );
};

export default MapWrapper;
