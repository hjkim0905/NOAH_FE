// 컴포넌트 관련 타입 정의

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
    animationData: any;
    loop?: boolean;
    autoplay?: boolean;
    style?: React.CSSProperties;
}
