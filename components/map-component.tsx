'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HeaderComponent from './header-component';
import Lottie from 'lottie-react';
import ReactDOM from 'react-dom/client';
import { LocationData, MapboxFeature, MapboxGeocodingResponse } from '../types';

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [animationData, setAnimationData] = useState(null);
    const [locationData, setLocationData] = useState<LocationData>({
        latitude: 35.85,
        longitude: 129.15,
        address: 'Loading...',
    });

    useEffect(() => {
        // Lottie 애니메이션 데이터 로드
        fetch('/lib/RedPulsingDot.json')
            .then((response) => response.json())
            .then((data) => setAnimationData(data))
            .catch((error) => console.error('Lottie 애니메이션 로드 실패:', error));
    }, []);

    // Mapbox Geocoding API로 주소 가져오기
    const getAddressFromCoordinates = async (lng: number, lat: number): Promise<string> => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&language=en&types=poi,place,neighborhood,address`
            );
            const data: MapboxGeocodingResponse = await response.json();

            if (data.features && data.features.length > 0) {
                // 영어 주소 우선, 없으면 기본 주소
                const englishFeature = data.features.find((feature: MapboxFeature) =>
                    feature.place_name.includes('Korea')
                );

                const address = englishFeature ? englishFeature.place_name : data.features[0].place_name;
                return address;
            }
            return 'Address not found';
        } catch (error) {
            console.error('주소 가져오기 실패:', error);
            return 'Unable to fetch address';
        }
    };

    useEffect(() => {
        if (map.current || !animationData) return; // 이미 지도가 초기화되었거나 애니메이션이 로드되지 않았다면 리턴

        // Mapbox 액세스 토큰 설정
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

        // 지도 초기화
        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/outdoors-v12', // outdoors 스타일 사용
            center: [129.15, 35.85], // 화재발생위치 중심으로 변경
            zoom: 15, // 화재발생위치에 줌인
            attributionControl: false, // 저작권 표시 제거
        });

        // 지도 로드 완료 후 화재발생위치 마커 추가
        map.current.on('load', async () => {
            if (map.current && animationData) {
                // 화재발생위치 - 마선산 정상 근처 좌표
                const fireLocation: [number, number] = [129.15, 35.85]; // 마선산 정상 근사 좌표

                // 주소 가져오기
                const address = await getAddressFromCoordinates(fireLocation[0], fireLocation[1]);
                setLocationData({
                    latitude: fireLocation[1],
                    longitude: fireLocation[0],
                    address: address,
                });

                // Lottie 애니메이션을 사용한 화재발생위치 마커
                const fireMarker = document.createElement('div');
                fireMarker.className = 'fire-marker';
                fireMarker.style.width = '100px';
                fireMarker.style.height = '100px';
                fireMarker.style.cursor = 'pointer';

                // Lottie 애니메이션 렌더링
                const root = ReactDOM.createRoot(fireMarker);
                root.render(
                    <Lottie animationData={animationData} loop={true} style={{ width: '100%', height: '100%' }} />
                );

                // 마커를 지도에 추가
                new mapboxgl.Marker(fireMarker)
                    .setLngLat(fireLocation)
                    .setPopup(new mapboxgl.Popup().setHTML('<h3>🔥 화재발생위치</h3><p>마선산 정상 근처</p>'))
                    .addTo(map.current);
            }
        });

        // 컴포넌트 언마운트 시 지도 정리
        return () => {
            if (map.current) {
                map.current.remove();
            }
        };
    }, [animationData]);

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
            <HeaderComponent
                latitude={locationData.latitude}
                longitude={locationData.longitude}
                address={locationData.address}
            />
        </div>
    );
}
