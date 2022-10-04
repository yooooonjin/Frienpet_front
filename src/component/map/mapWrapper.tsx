import React, { useEffect, useState } from 'react';
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

  //지도 클릭 시 마커 생성 // 글쓰기 페이지에서 사용
  const onClick = (e: google.maps.MapMouseEvent) => {
    onSetMarker && onSetMarker(e.latLng!.lat(), e.latLng!.lng());
  };

  const onIdle = (m: google.maps.Map) => {
    setZoom(m.getZoom()!);
    setCenter(m.getCenter()!.toJSON());
  };

  //현재 위치 좌표 불러오기 성공 시 현재 위치를 센터로 지정
  const success = (location: any) => {
    const lat = location.coords.latitude;
    const lng = location.coords.longitude;
    setCenter({ lat, lng });
  };
  const error = (error: any) => {
    console.log(error);
  };
  //현재 위치 좌표 불러오기
  useEffect(() => {
    const geoLocation = window.navigator.geolocation;
    geoLocation.getCurrentPosition(success, error, {
      enableHighAccuracy: true,
    });
  }, []);

  return (
    <Wrapper apiKey={process.env.REACT_APP_MAP_API_KEY!}>
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
