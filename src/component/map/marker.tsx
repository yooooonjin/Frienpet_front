import React, { useEffect, useState } from 'react';

const Marker: React.FunctionComponent<google.maps.MarkerOptions> = (
  options
) => {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);

  useEffect(() => {
    const newOptions = { ...options, icon: 'markerIcon.png' };
    if (marker) {
      marker.setOptions(newOptions);
    }
  }, [marker, options]);
  return null;
};

export default Marker;
