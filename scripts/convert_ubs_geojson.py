#!/usr/bin/env python3
import json
import math
import os

def utm23s_to_latlon(easting, northing):
    a = 6378137.0
    f = 1 / 298.257223563
    b = a * (1 - f)
    e = math.sqrt((a**2 - b**2) / (a**2))
    e_prime_sq = (a**2 - b**2) / (b**2)
    k0 = 0.9996
    
    x = easting - 500000.0
    y = northing - 10000000.0
    
    m = y / k0
    mu = m / (a * (1 - e**2 / 4 - 3 * e**4 / 64 - 5 * e**6 / 256))
    e1 = (1 - math.sqrt(1 - e**2)) / (1 + math.sqrt(1 - e**2))
    
    phi1_rad = mu + (3 * e1 / 2 - 27 * e1**3 / 32) * math.sin(2 * mu) \
               + (21 * e1**2 / 16 - 55 * e1**4 / 32) * math.sin(4 * mu) \
               + (151 * e1**3 / 96) * math.sin(6 * mu)
               
    n1 = a / math.sqrt(1 - e**2 * math.sin(phi1_rad)**2)
    t1 = math.tan(phi1_rad)**2
    c1 = e_prime_sq * math.cos(phi1_rad)**2
    r1 = a * (1 - e**2) / (1 - e**2 * math.sin(phi1_rad)**2)**1.5
    d = x / (n1 * k0)
    
    lat_rad = phi1_rad - (n1 * math.tan(phi1_rad) / r1) * (
        d**2 / 2 - (5 + 3 * t1 + 10 * c1 - 4 * c1**2 - 9 * e_prime_sq) * d**4 / 24
        + (61 + 90 * t1 + 298 * c1 + 45 * t1**2 - 252 * e_prime_sq - 3 * c1**2) * d**6 / 720
    )
    
    lon_origin = -45.0
    lon_rad = (d - (1 + 2 * t1 + c1) * d**3 / 6 + (5 - 2 * c1 + 28 * t1 - 3 * c1**2 + 8 * e_prime_sq + 24 * t1**2) * d**5 / 120) / math.cos(phi1_rad)
    
    lat = math.degrees(lat_rad)
    lon = lon_origin + math.degrees(lon_rad)
    return round(lon, 6), round(lat, 6)

def convert_coords(coords):
    if isinstance(coords[0], (int, float)):
        return list(utm23s_to_latlon(coords[0], coords[1]))
    return [convert_coords(c) for c in coords]

def main():
    raw_geojson_path = os.path.join(os.path.dirname(__file__), "raw_ubs.json")
    with open(raw_geojson_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    converted_features = []
    ubs_points = []
    
    for feat in data.get("features", []):
        geom_type = feat["geometry"]["type"]
        raw_coords = feat["geometry"]["coordinates"]
        conv_coords = convert_coords(raw_coords)
        
        props = feat.get("properties", {})
        
        # Also compute lat/lon for UBS center point
        lat_deg = props.get("LATITUDE")
        lon_deg = props.get("LONGITUDE")
        
        center_lat = None
        center_lon = None
        if lat_deg and lon_deg:
            center_lat = lat_deg / 1000000.0 if abs(lat_deg) > 1000 else lat_deg
            center_lon = lon_deg / 1000000.0 if abs(lon_deg) > 1000 else lon_deg
        
        converted_features.append({
            "type": "Feature",
            "properties": {
                "nome": props.get("APELIDO") or f"UBS {props.get('UBS')}",
                "colegiado": props.get("COLEGIADO", "Sorocaba"),
                "regional": props.get("REGIONAL", "Sorocaba"),
                "endereco": props.get("END", ""),
                "pop2024": props.get("POP_2024", 0),
                "center": [center_lat, center_lon] if center_lat else None
            },
            "geometry": {
                "type": geom_type,
                "coordinates": conv_coords
            }
        })
        
        if center_lat and center_lon:
            ubs_points.append({
                "id": props.get("NOME_CURTO", props.get("UBS")),
                "nome": props.get("APELIDO") or f"UBS {props.get('UBS')}",
                "colegiado": props.get("COLEGIADO", "Sorocaba"),
                "regional": props.get("REGIONAL", "Sorocaba"),
                "lat": center_lat,
                "lng": center_lon,
                "endereco": props.get("END", ""),
                "populacao": props.get("POP_2024", 0)
            })

    output_content = f"""/**
 * Camadas de Abrangência Oficial das UBS e Colegiados de Sorocaba/SP
 * Convertidas de SIRGAS 2000 (EPSG:31983) para WGS84 (EPSG:4326)
 */

export const SOROCABA_UBS_POINTS = {json.dumps(ubs_points, ensure_ascii=False, indent=2)};

export const SOROCABA_COLEGIADOS_GEOJSON: GeoJSON.FeatureCollection = {json.dumps({
    "type": "FeatureCollection",
    "features": converted_features
}, ensure_ascii=False, indent=2)};
"""

    dest_ts = os.path.join(os.path.dirname(__file__), "..", "src", "data", "sorocabaGeoJson.ts")
    with open(dest_ts, "w", encoding="utf-8") as f:
        f.write(output_content)
    print("Successfully converted and wrote sorocabaGeoJson.ts with", len(converted_features), "official UBS polygons!")

if __name__ == "__main__":
    main()
