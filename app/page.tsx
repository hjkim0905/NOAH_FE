'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
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
            attributionControl: true,
        });

        // 지도 로드 완료 후 마커 추가
        map.current.on('load', () => {
            if (map.current) {
                // 경주 중심에 마커 추가
                new mapboxgl.Marker({ color: '#FF6B6B' })
                    .setLngLat([129.2, 35.8])
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>경주</h3><p>한국의 고도시</p>'))
                    .addTo(map.current);
            }
        });

        // 컴포넌트 언마운트 시 지도 정리
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, []);

    return (
        <div className="min-h-screen">
            <div className="h-screen w-full" ref={mapContainer} />
        </div>
    );
}
