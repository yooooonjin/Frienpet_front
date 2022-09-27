import React, {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './map.module.css';

interface MapProps extends google.maps.MapOptions {
  panToPosition?: { lat: number; lng: number };
  onClick?: (e: google.maps.MapMouseEvent) => void;
  onIdle?: (map: google.maps.Map) => void;
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
}

const Map: React.FunctionComponent<MapProps> = ({
  panToPosition,
  onClick,
  onIdle,
  children,
  ...options
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map && options.center) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: options.center,
          zoom: 16,
        })
      );
    }
  }, [ref, map, options.center]);

  useEffect(() => {
    if (map) {
      ['click', 'idle'].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener('click', onClick);
      }

      if (onIdle) {
        map.addListener('idle', () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  useEffect(() => {
    if (map) {
      if (panToPosition) {
        map.panTo(panToPosition);
      }
    }
  }, [panToPosition]);

  return (
    <>
      <div ref={ref} className={styles.map}></div>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Map;
