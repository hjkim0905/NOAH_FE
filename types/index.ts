// 타입 정의 통합 export

// Mapbox 관련 타입
export interface MapboxFeature {
    id: string;
    type: string;
    place_type: string[];
    relevance: number;
    properties: {
        wikidata?: string;
        short_code?: string;
    };
    text: string;
    place_name: string;
    bbox: number[];
    center: [number, number];
    geometry: {
        type: string;
        coordinates: [number, number];
    };
}

export interface MapboxGeocodingResponse {
    type: string;
    query: string[];
    features: MapboxFeature[];
    attribution: string;
}

export interface FireLocation {
    longitude: number;
    latitude: number;
}

// 컴포넌트 관련 타입
export * from './component';

export interface WeatherData {
    lon: number;
    lat: number;
    WD_FRQ: number; // 풍향 (도)
    WS_DAVG: number; // 풍속 (m/s)
    elevation: number; // 고도 (m)
    RHM_DAVG: number; // 상대습도 (%)
    TA_DAVG: number; // 기온 (°C)
    slope: number; // 경사 (도)
    aspect: number; // 방향 (도)
}

export interface WeatherAPIResponse {
    data: WeatherData;
    instruction: string;
}

export interface MapboxTerrainFeature {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][];
    };
    properties: {
        ele?: number;
        level?: number;
        type?: string;
    };
}

export interface MapboxTerrainResponse {
    features: MapboxTerrainFeature[];
}
