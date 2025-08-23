'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import HeaderComponent from './header-component';
import HelicopterDeployment from './helicopter-deployment';
import FirefightingStrategy from './firefighting-strategy';
import WeatherInformation from './weather-information';
import Lottie from 'lottie-react';
import ReactDOM from 'react-dom/client';
import { LocationData, MapboxFeature, MapboxGeocodingResponse } from '../types';
import Image from 'next/image';

export default function MapComponent() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [animationData, setAnimationData] = useState(null);
    const [locationData, setLocationData] = useState<LocationData>({
        latitude: 35.85,
        longitude: 129.15,
        address: '',
    });
    const [isStrategyExpanded, setIsStrategyExpanded] = useState(false);
    const [mapBearing, setMapBearing] = useState(0); // 지도 회전 각도 상태 추가
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 추가
    const [selectedOption, setSelectedOption] = useState('SEE ALL'); // 선택된 옵션 상태 추가

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

    const handleZoomIn = () => {
        if (map.current) {
            map.current.zoomIn();
        }
    };

    const handleZoomOut = () => {
        if (map.current) {
            map.current.zoomOut();
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);
        setIsDropdownOpen(false);
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

        // 지도 회전 이벤트 리스너 추가
        map.current.on('rotate', () => {
            if (map.current) {
                const bearing = map.current.getBearing();
                setMapBearing(bearing);
            }
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

            {/* 줌 컨트롤 버튼들 */}
            <div className="absolute right-[20px] bottom-[40px] flex flex-col pointer-events-auto">
                {/* 나침반 컨테이너 */}
                <div className="w-[57px] h-[137px] mb-[-60px] relative">
                    <Image
                        src="/images/CompassBorder.png"
                        alt="Compass Border"
                        width={57}
                        height={137}
                        className="object-contain"
                    />

                    {/* 나침반 화살표 - 지도 회전에 따라 회전 */}
                    <div
                        className="absolute left-[calc(50%+3px)] top-[calc(50%-30px)] w-[38px] h-[38px]"
                        style={{ transform: `translate(-50%, -50%) rotate(${-mapBearing}deg)` }}
                    >
                        <Image
                            src="/images/CompassArrow.png"
                            alt="Compass Arrow"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 줌 인 버튼 */}
                <div
                    onClick={handleZoomIn}
                    className="w-[57px] h-[57px] cursor-pointer transition-transform duration-300 hover:scale-110"
                >
                    <Image src="/images/ZoomIn.png" alt="Zoom In" width={57} height={57} className="object-contain" />
                </div>

                {/* 줌 아웃 버튼 */}
                <div
                    onClick={handleZoomOut}
                    className="w-[57px] h-[57px] cursor-pointer transition-transform duration-300 hover:scale-110 mt-[-15px]"
                >
                    <Image src="/images/ZoomOut.png" alt="Zoom Out" width={57} height={57} className="object-contain" />
                </div>
            </div>

            {/* 헤더 컴포넌트 */}
            <HeaderComponent
                latitude={locationData.latitude}
                longitude={locationData.longitude}
                address={locationData.address}
            />

            {/* Firefighter 드롭다운 버튼 */}
            <div className="absolute top-[118px] right-[20px] flex flex-col items-end">
                <div
                    className="w-[177px] h-[66px] bg-white rounded-[10px] shadow-[2px_4px_30px_rgba(0,0,0,0.2)] flex items-center justify-between px-[20px] cursor-pointer"
                    onClick={handleDropdownToggle}
                >
                    <div className="flex items-center">
                        <div
                            className="w-[99px] h-[24px] flex items-center text-[20px] font-normal leading-[24px] tracking-[-0.03em] text-black whitespace-nowrap"
                            style={{ fontFamily: 'Gotham' }}
                        >
                            {selectedOption}
                        </div>
                    </div>

                    {/* 드롭다운 화살표 */}
                    <div className="w-[20px] h-[20px] flex items-center justify-center flex-shrink-0 order-1 flex-grow-0">
                        <Image
                            src="/images/DropdownArrowDown.png"
                            alt="Dropdown Arrow"
                            width={10}
                            height={10}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* 드롭다운 메뉴 */}
                {isDropdownOpen && (
                    <div className="mt-[8px] w-[207px] h-[255px] bg-[#F8F8F8] rounded-[10px] shadow-[1.625px_3.25px_24.375px_rgba(0,0,0,0.2)] flex flex-col items-center pt-[20px] gap-[6px]">
                        {/* SEE ALL 옵션 */}
                        <div
                            className={`w-[188px] h-[54px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 ${
                                selectedOption === 'SEE ALL'
                                    ? 'bg-black text-[#F8F8F8]'
                                    : 'bg-transparent text-black hover:bg-black hover:text-[#F8F8F8]'
                            }`}
                            onClick={() => handleOptionSelect('SEE ALL')}
                        >
                            <div
                                className={`w-[64px] h-[19px] flex items-center justify-center text-[16px] font-normal leading-[19px] tracking-[-0.03em] whitespace-nowrap ${
                                    selectedOption === 'SEE ALL' ? 'font-medium' : 'font-normal'
                                }`}
                                style={{ fontFamily: 'Gotham' }}
                            >
                                SEE ALL
                            </div>
                        </div>

                        {/* Firefighter 옵션 */}
                        <div
                            className={`w-[188px] h-[54px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 ${
                                selectedOption === 'Firefighter'
                                    ? 'bg-black text-[#F8F8F8]'
                                    : 'bg-transparent text-black hover:bg-black hover:text-[#F8F8F8]'
                            }`}
                            onClick={() => handleOptionSelect('Firefighter')}
                        >
                            <div
                                className={`w-[81px] h-[19px] flex items-center justify-center text-[16px] font-normal leading-[19px] tracking-[-0.03em] whitespace-nowrap ${
                                    selectedOption === 'Firefighter' ? 'font-medium' : 'font-normal'
                                }`}
                                style={{ fontFamily: 'Gotham' }}
                            >
                                Firefighter
                            </div>
                        </div>

                        {/* Helicopter 옵션 */}
                        <div
                            className={`w-[188px] h-[54px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 ${
                                selectedOption === 'Helicopter'
                                    ? 'bg-black text-[#F8F8F8]'
                                    : 'bg-transparent text-black hover:bg-black hover:text-[#F8F8F8]'
                            }`}
                            onClick={() => handleOptionSelect('Helicopter')}
                        >
                            <div
                                className={`w-[81px] h-[19px] flex items-center justify-center text-[16px] font-normal leading-[19px] tracking-[-0.03em] whitespace-nowrap ${
                                    selectedOption === 'Helicopter' ? 'font-medium' : 'font-normal'
                                }`}
                                style={{ fontFamily: 'Gotham' }}
                            >
                                Helicopter
                            </div>
                        </div>

                        {/* Fire Engine 옵션 */}
                        <div
                            className={`w-[188px] h-[54px] flex items-center justify-center rounded-[8px] cursor-pointer transition-all duration-200 ${
                                selectedOption === 'Fire Engine'
                                    ? 'bg-black text-[#F8F8F8]'
                                    : 'bg-transparent text-black hover:bg-black hover:text-[#F8F8F8]'
                            }`}
                            onClick={() => handleOptionSelect('Fire Engine')}
                        >
                            <div
                                className={`w-[81px] h-[19px] flex items-center justify-center text-[16px] font-normal leading-[19px] tracking-[-0.03em] whitespace-nowrap ${
                                    selectedOption === 'Fire Engine' ? 'font-medium' : 'font-normal'
                                }`}
                                style={{ fontFamily: 'Gotham' }}
                            >
                                Fire Engine
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 헬기 배치 컴포넌트 */}
            <HelicopterDeployment />

            {/* 소방전략 컴포넌트 */}
            <FirefightingStrategy onExpand={setIsStrategyExpanded} />

            {/* 날씨 정보 컴포넌트 */}
            <WeatherInformation isStrategyExpanded={isStrategyExpanded} />
        </div>
    );
}
