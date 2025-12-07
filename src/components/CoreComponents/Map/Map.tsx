import { Button, Icon, Text } from "@chakra-ui/react";
import { PingPong } from "@phosphor-icons/react";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { Link } from "react-router-dom";

import L from "leaflet";
import ping from "./pin.png";
import "leaflet/dist/leaflet.css";

const customMarker = new L.Icon({
  iconUrl: ping, // مسیر عکس آیکون
  iconSize: [32, 32], // اندازه آیکون
  iconAnchor: [16, 32], // نقطه اتصال (پایین وسط)
});

const Map = ({
  height = "200px",
  lat = 35.72445859782193,
  lng = 51.47236884295126,
  setNewPin,
  mapBounds,
  showPointer = true,
  targets,
}: {
  height?: string;
  lat?: number;
  targets?: any;
  lng?: number;
  showPointer?: boolean;
  mapBounds?: ({
    minLat,
    maxLat,
    minLng,
    maxLng,
  }: {
    minLat?: number;
    maxLat?: number;
    minLng?: number;
    maxLng?: number;
  }) => void;
  setNewPin?: ({ lat, lng }: { lat: number; lng?: number }) => void;
}) => {
  const [position, setPosition] = useState({ lat, lng });
  const LocationMarker = () => {
    useMapEvents({
      click: (e: any) => {
        setPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
        setNewPin?.({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return <Marker position={position} icon={customMarker} />;
  };
  const MapBoundsLogger = ({ onBoundsChange }: any) => {
    const map = useMap();

    useEffect(() => {
      const updateBounds = () => {
        const bounds = map.getBounds();
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();

        const result = {
          minLat: southWest.lat,
          maxLat: northEast.lat,
          minLng: southWest.lng,
          maxLng: northEast.lng,
        };

        onBoundsChange?.(result);
      };
      const handleMove = () => {
        const bounds = map.getBounds();
        const southWest = bounds.getSouthWest();
        const northEast = bounds.getNorthEast();

        mapBounds?.({
          minLat: southWest.lat,
          maxLat: northEast.lat,
          minLng: southWest.lng,
          maxLng: northEast.lng,
        });
      };
      map.on("moveend", handleMove);
    }, [map, onBoundsChange]);

    return null;
  };
  return (
    <MapContainer
      center={[lat, lng] as LatLngExpression}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height, width: "100%", borderRadius: "8px", zIndex: 5 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {showPointer && <LocationMarker />}
      {targets?.map((item: any) => {
        return (
          <Marker
            key={item.id}
            position={{ lat: item.latitude, lng: item.longitude }}
          >
            <Popup>
              <Text>Event:{item.title}</Text>
              <Text>Category: {item.category.title}</Text>

              <Button w="full" size={"sm"} as={Link} to={`/event/${item.id}`}>
                join
              </Button>
            </Popup>
          </Marker>
        );
      })}
      <MapBoundsLogger
        onBoundsChange={(bounds: any) => {
          // You can do a search here or save bounds to state
          mapBounds?.(bounds);
        }}
      />
      {/* <Marker position={[lat, lng] as LatLngExpression}>
        // <Popup>مکان شما اینجاست!</Popup>
      </Marker> */}
    </MapContainer>
  );
};

export default Map;
