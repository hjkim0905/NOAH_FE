import Image from 'next/image';

interface WeatherInformationProps {
    isStrategyExpanded?: boolean;
}

export default function WeatherInformation({ isStrategyExpanded = false }: WeatherInformationProps) {
    return (
        <div
            className={`absolute top-[737px] bg-white rounded-[15px] shadow-[2px_4px_30px_rgba(0,0,0,0.2)] transition-all duration-500 ease-in-out ${
                isStrategyExpanded ? 'left-[463px]' : 'left-[20px]'
            } w-[425px] h-[247px]`}
        >
            <div className="flex flex-col h-full pt-[18px] pl-[20px]">
                {/* 제목 */}
                <div
                    className="w-[169px] h-[26px] flex items-center text-[17px] font-medium leading-[150%] tracking-[-0.03em] text-[#303030]"
                    style={{ fontFamily: 'Gotham' }}
                >
                    Weather Information
                </div>

                {/* 날씨 정보 컨테이너들 */}
                <div className="mt-[18px] flex gap-[10px]">
                    {/* 첫 번째 컨테이너 */}
                    <div className="w-[266px] h-[160px] bg-[#2D3035] border border-[#2D3035] rounded-[12px] flex flex-col relative">
                        {/* 풍향 아이콘 */}
                        <div className="mt-[13px] ml-[15px]">
                            <Image
                                src="/images/Wind.png"
                                alt="Wind"
                                width={42}
                                height={17}
                                className="object-contain"
                            />
                        </div>

                        {/* 풍향 정보 */}
                        <div
                            className="mt-[30px] ml-[15px] w-[107px] h-[40px] flex items-center text-[14px] font-medium leading-[140%] tracking-[-0.03em] text-white"
                            style={{ fontFamily: 'Gotham' }}
                        >
                            Southwest wind 2-7 m/s
                        </div>

                        {/* 풍속계 이미지 */}
                        <div className="absolute right-[24px] top-1/2 transform -translate-y-1/2">
                            <div className="relative">
                                <Image
                                    src="/images/WindMeter.png"
                                    alt="Wind Meter"
                                    width={97}
                                    height={102}
                                    className="object-contain"
                                />

                                {/* 풍향 화살표 */}
                                <Image
                                    src="/images/WindMeterArrow.png"
                                    alt="Wind Direction Arrow"
                                    width={80}
                                    height={80}
                                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 object-contain"
                                />

                                {/* 풍속 숫자 */}
                                <div
                                    className="absolute w-[10px] h-[14px] left-[calc(50%+2px)] transform -translate-x-1/2 top-[35px] flex items-center justify-center text-[15px] font-normal leading-[14px] text-white text-center"
                                    style={{ fontFamily: 'Gotham' }}
                                >
                                    7
                                </div>
                            </div>
                        </div>

                        {/* 날씨 정보 내용이 들어갈 예정 */}
                    </div>

                    {/* 두 번째 컨테이너 */}
                    <div className="w-[109px] h-[160px] bg-[#F1F2F5] rounded-[15px] flex flex-col items-center">
                        {/* 습도 아이콘 */}
                        <div className="mt-[13px]">
                            <Image
                                src="/images/Humidity.png"
                                alt="Humidity"
                                width={64}
                                height={17}
                                className="object-contain"
                            />
                        </div>

                        {/* 습도 퍼센트 */}
                        <div
                            className="mt-[26px] w-[70px] h-[49px] flex items-center justify-center text-[35px] font-normal leading-[140%] tracking-[-0.03em] text-[#2D3035] text-center"
                            style={{ fontFamily: 'Gotham' }}
                        >
                            32%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
