// 컴포넌트 관련 타입 정의
import { ParsedStrategyData, ParsedWeatherData } from './index';

export interface HeaderComponentProps {
    latitude: number;
    longitude: number;
    address: string;
}

export interface MapComponentProps {
    initialCenter?: [number, number];
    initialZoom?: number;
    showFireLocation?: boolean;
}

export interface LottieAnimationProps {
    animationData: object;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
}

export interface HelicopterDeploymentProps {
    isNecessary?: boolean;
}

export interface WeatherInformationProps {
    isStrategyExpanded: boolean;
    weatherData: ParsedWeatherData | null;
}

export interface FirefightingStrategyProps {
    onExpand: (expanded: boolean) => void;
    strategyData: ParsedStrategyData | null;
}
