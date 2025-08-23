'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HeaderComponent from './header-component';

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    useEffect(() => {
        if (map.current) return; // 이미 지도가 초기화되었다면 리턴

        // Mapbox 액세스 토큰 설정
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        // 지도 초기화
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/outdoors-v12', // outdoors 스타일 사용
            center: [129.2, 35.8], // 경주 중심 좌표 [경도, 위도]
            zoom: 12, // 줌 레벨
            attributionControl: false, // 저작권 표시 제거
        });

        // 컴포넌트 언마운트 시 지도 정리
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    return (
        <div className="min-h-screen relative">
            <div className="h-screen w-full" ref={mapContainer} />

            {/* 상단 그라데이션 오버레이 */}
            <div
                className="absolute top-0 left-0 w-full h-[489px] pointer-events-none"
                style={{
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 100%)',
                }}
            />

            {/* 헤더 컴포넌트 */}
            <HeaderComponent />
        </div>
    );
}
