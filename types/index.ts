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

export interface LocationData {
    latitude: number;
    longitude: number;
    address: string;
}

// 컴포넌트 관련 타입
export * from './component';

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

// 진입점 방향 정보
export interface EntryPoint {
    name: string;
    direction: string; // North, South, East, West, Northeast, Northwest, Southeast, Southwest
    type: 'firefighter' | 'helicopter' | 'fireengine';
}

// 백엔드 API 응답 타입
export interface BackendAPIResponse {
    output: string;
}

// Gemini API 응답 타입
export interface GeminiAPIResponse {
    candidates: Array<{
        content: {
            parts: Array<{
                text: string;
            }>;
        };
    }>;
}

// 파싱된 전략 데이터 타입
export interface ParsedStrategyData {
    helicopterDeployed: boolean;
    slope: number;
    elevation: number;
    windSpeed: number;
    windDirection: number;
    entryPoints: string[];
    strategyText: string;
}

// 파싱된 날씨 데이터 타입
export interface ParsedWeatherData {
    windDirection: number;
    windSpeed: number;
    humidity: number;
}
