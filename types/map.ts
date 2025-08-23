// Mapbox 관련 타입 정의

export interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
}

export interface MapboxFeature {
    id: string;
    type: string;
    place_name: string;
    center: [number, number];
    geometry: {
        type: string;
        coordinates: number[][];
    };
    properties: {
        ele?: number;
        elevation?: number;
        height?: number;
        [key: string]: any;
    };
}

export interface MapboxGeocodingResponse {
    type: string;
    features: MapboxFeature[];
    query: number[];
    attribution: string;
}

export interface FireLocation {
    coordinates: [number, number];
    elevation?: number;
    address: string;
}
