import React, { useEffect, useRef, useState } from "react";
import H from "@here/maps-api-for-javascript";

const Map = (props) => {
  const mapRef = useRef(null);
  const map = useRef(null);
  const platform = useRef(null);
  const { apiKey } = props;

  useEffect(() => {
    if (!map.current) {
      platform.current = new H.service.Platform({ apiKey });

      const rasterTileService = platform.current.getRasterTileService({
        queryParams: {
          style: "explore.day",
          size: 512,
        },
      });
      const rasterTileProvider = new H.service.rasterTile.Provider(
        rasterTileService
      );
      const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
      const newMap = new H.Map(mapRef.current, rasterTileLayer, {
        pixelRatio: window.devicePixelRatio,
        center: {
          lat: 6.700071,
          lng: -1.630783,
        },
        zoom: 14,
      });

      const behaviour = new H.mapevents.Behavior(
        new H.mapevents.MapEvents(newMap)
      );
      map.current = newMap;
    }
  }, [apiKey]);

  return <div style={{ width: "100%", height: "500px" }} ref={mapRef}></div>;
};

export default Map;
