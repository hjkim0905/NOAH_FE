'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ParsedStrategyData } from '../types';

interface FirefightingStrategyProps {
    onExpand?: (isExpanded: boolean) => void;
    strategyData: ParsedStrategyData | null;
}

export default function FirefightingStrategy({ onExpand, strategyData }: FirefightingStrategyProps) {
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
                        src="/images/Strategy.png"
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
                    {strategyData ? (
                        // 파싱된 전략 데이터가 있을 때
                        <p className="text-left whitespace-pre-line">{strategyData.strategyText}</p>
                    ) : (
                        // 기본 텍스트 (데이터가 없을 때)
                        <p className="text-left">
                            <span className="font-semibold mb-[8px] block">Loading strategy data...</span>
                            <span className="mb-[24px] block">
                                Please wait while we analyze the fire suppression plan...
                            </span>
                        </p>
                    )}
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
