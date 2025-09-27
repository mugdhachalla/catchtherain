import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap} from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points?.length) return;
    const bounds = L.latLngBounds(points.map(p => [p.lat, p.lon]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [points, map]);
  return null;
}
const INDIA_BOUNDS = [
  [6.5, 68],   // Southwest corner (lat, lon)
  [37.5, 97]   // Northeast corner
];

export default function ImpactMap({ points = [], height = "24rem" }) {
  const center = points[0] ? [points[0].lat, points[0].lon] : [22.97, 78.65];

  return (
    <div className="w-full rounded-xl border bg-white shadow-sm overflow-hidden" style={{ height }}>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        maxBounds={INDIA_BOUNDS}          
        maxBoundsViscosity={1.0} 
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />

        {/* ✅ Bubble overlay made non-interactive so tooltips work */}
        {points.map((p, i) => (
          <CircleMarker
            key={`c-${i}`}
            center={[p.lat, p.lon]}
            radius={Math.max(6, Math.sqrt(p.annualLiters) / 800)}
            interactive={false}  // ← prevents hover capture
            pathOptions={{ color: "#0ea5e9", fillColor: "#0ea5e9", fillOpacity: 0.25 }}
          />
        ))}

        {/* Dot with tooltip on top */}
        {points.map((p, i) => (
          <CircleMarker
            key={i}
            center={[p.lat, p.lon]}
            radius={6}
            pathOptions={{
              fillColor:
                p.implementedPct >= 50 ? "#16a34a" :
                p.implementedPct >= 30 ? "#f59e0b" : "#ef4444",
              fillOpacity: 0.9,
              color: "transparent",
            }}
          >
            <Tooltip>
              <div className="text-sm">
                <strong>{p.city}</strong><br />
                {p.annualLiters != null
                  ? `${Number(p.annualLiters).toLocaleString()} L harvested`
                  : "Annual harvest: —"}
                <br />
                {p.implementedPct != null
                  ? `${p.implementedPct}% implemented`
                  : "Implemented: —"}
              </div>
            </Tooltip>
          </CircleMarker>
        ))}

      </MapContainer>
    </div>
  );
}
