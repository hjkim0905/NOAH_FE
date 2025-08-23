'use client';

import Image from 'next/image';
import { useState } from 'react';

interface FirefightingStrategyProps {
    onExpand?: (isExpanded: boolean) => void;
}

export default function FirefightingStrategy({ onExpand }: FirefightingStrategyProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        const newExpanded = !isExpanded;
        setIsExpanded(newExpanded);
        onExpand?.(newExpanded);
    };

    return (
        <div
            className={`absolute top-[243px] left-[20px] bg-white rounded-[15px] shadow-[2px_4px_30px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out ${
                isExpanded ? 'w-[425px] h-[741px]' : 'w-[425px] h-[474px]'
            }`}
        >
            <div className="flex flex-col h-full pt-[23px] pl-[20px]">
                {/* 컨테이너 */}
                <div className="w-[243px] h-[41px] bg-[#F8F8F8] rounded-[100px] flex items-center pl-[20px] gap-[8px]">
                    <Image
                        src="/images/strategy.png"
                        alt="Strategy"
                        width={20}
                        height={14.18}
                        className="object-contain"
                    />
                    <div
                        className="w-[179px] h-[27px] flex items-center text-[18px] font-medium leading-[150%] tracking-[-0.03em] text-black"
                        style={{ fontFamily: 'Gotham' }}
                    >
                        Firefighting Strategy
                    </div>
                </div>

                {/* 본문 텍스트 */}
                <div
                    className={`mt-[17px] pl-[20px] flex items-start text-[20px] font-medium leading-[160%] tracking-[-0.03em] text-black transition-all duration-500 ease-in-out overflow-y-auto scrollbar-hide ${
                        isExpanded ? 'w-[349px] h-[637px]' : 'w-[349px] h-[348px]'
                    }`}
                    style={{
                        fontFamily: 'Gotham',
                        background: isExpanded ? 'transparent' : 'linear-gradient(180deg, #000000 0%, #FFFFFF 100%)',
                        WebkitBackgroundClip: isExpanded ? 'border-box' : 'text',
                        WebkitTextFillColor: isExpanded ? '#000000' : 'transparent',
                        backgroundClip: isExpanded ? 'border-box' : 'text',
                        color: isExpanded ? '#000000' : 'transparent',
                    }}
                >
                    <p className="text-left">
                        <span className="font-semibold mb-[8px] block">Helicopter dispatch status: Dispatched</span>

                        <span className="mb-[24px] block">
                            The fire broke out at a location above the 7th ridge (latitude: 37.123, longitude: 128.456),
                            making it difficult for people to access, and it was expected that the flames would spread
                            rapidly, so we decided to dispatch a helicopter.
                        </span>
                        <br />

                        <span className="font-semibold mb-[8px] block">
                            Helicopter Approach Direction: Northeast of the Fire Site
                        </span>

                        <span className="mb-[24px] block">
                            The helicopter approached from the northeast of the fire site. Given the current southwest
                            wind direction, it was judged that the fire would spread northeastward. Additionally, the
                            helicopter approached from the opposite direction of the smoke movement to ensure the pilots
                            visibility.
                        </span>

                        <br />

                        <span className="font-semibold mb-[8px] block">
                            Fire truck deployment and firefighting departure location
                        </span>

                        <span>
                            Since the fire occurred at an elevation of 700 meters or higher, making human access
                            difficult, fire trucks were deployed near residential areas to protect them.
                        </span>
                    </p>
                </div>

                {/* StrategyArrow 버튼 - 상태에 따라 위치 변경 */}
                {isExpanded ? (
                    // 열려있을 때: bottom anchor를 반 걸쳐서 위에 위치
                    <div className="absolute -bottom-[20px] left-1/2 transform -translate-x-1/2">
                        <button
                            onClick={handleToggle}
                            className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                        >
                            <Image
                                src="/images/StrategyArrowUp.png"
                                alt="Strategy Arrow Up"
                                width={45}
                                height={45}
                                className="object-contain transition-all duration-300"
                            />
                        </button>
                    </div>
                ) : (
                    // 닫혀있을 때: 컴포넌트 내부 하단에 위치
                    <div className="mt-auto mb-[20px] flex justify-center">
                        <button
                            onClick={handleToggle}
                            className="w-[40px] h-[40px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
                        >
                            <Image
                                src="/images/StrategyArrowDown.png"
                                alt="Strategy Arrow Down"
                                width={40}
                                height={40}
                                className="object-contain transition-all duration-300"
                            />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
