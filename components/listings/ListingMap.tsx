"use client";

import { useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import { MapPin } from "lucide-react";
import "mapbox-gl/dist/mapbox-gl.css";

interface ListingMapProps {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

export function ListingMap({ latitude, longitude, city, country }: ListingMapProps) {
  const [viewState, setViewState] = useState({
    latitude,
    longitude,
    zoom: 13,
  });

  // If coords are missing / zero, fall back to placeholder
  if (!latitude || !longitude) {
    return (
      <div className="h-64 bg-muted rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
          <p className="font-semibold">{city}, {country}</p>
          <p className="text-sm text-muted-foreground">Exact location shared after booking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-64 rounded-2xl overflow-hidden relative">
      <Map
        {...viewState}
        onMove={(e) => setViewState(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        <NavigationControl position="top-right" showCompass={false} />
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <div className="bg-primary text-white rounded-full p-2 shadow-lg border-2 border-white">
            <MapPin className="h-4 w-4" />
          </div>
        </Marker>
      </Map>
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-sm font-medium shadow">
        {city}, {country}
      </div>
    </div>
  );
}
