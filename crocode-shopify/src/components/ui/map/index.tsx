'use client'

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';

import styles from './styles.module.scss';

type TMarker = {
  className?: string;
  icon?: string;
  popup: string;
  coordinates: [number, number];
};

type TProps = {
  className?: string;
  map: {
    style: string;
    center: [number, number];
    zoom: number;
    markers?: TMarker[];
  };
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

const PopupContent = ({ text }: { text: string }) => (
  <div className={styles.popup__content}>
    <p className={styles.popup__text}>{text}</p>
  </div>
);

const MapboxMap = ({ className, map }: TProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);

  const setMarker = ({
    className = '',
    icon = '/images/marker.svg',
    coordinates,
    popup = '',
  }: TMarker) => {
    if (mapInstance.current) {
      mapInstance.current.on('load', () => {
        const el = document.createElement('div');
        el.className = `${styles['map__marker']} ${className}`;
        el.style.backgroundImage = `url(${icon})`;

        const popupHtml = renderToString(<PopupContent text={popup} />);

        const popupMarker = new mapboxgl.Popup({
          className: styles.popup,
          anchor: 'left',
          offset: 20,
          closeButton: false,
          closeOnClick: false,
        }).setHTML(popupHtml);

        new mapboxgl.Marker(el, { anchor: 'bottom' })
          .setLngLat(coordinates)
          .addTo(mapInstance.current!);

        el.addEventListener('mouseenter', () => {
          popupMarker.setLngLat(coordinates).addTo(mapInstance.current!);
        });

        el.addEventListener('mouseleave', () => {
          popupMarker.remove();
        });
      });
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    mapInstance.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: map.style,
      center: map.center,
      zoom: map.zoom,
    });

    if (map.markers) map.markers.map((marker) => setMarker(marker));

    return () => {
      mapInstance.current?.remove();
    };
  }, []);

  return <div className={`${styles.map} ${className}`} ref={mapContainer} />;
};

export default MapboxMap;