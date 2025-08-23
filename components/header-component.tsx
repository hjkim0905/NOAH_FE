import Image from 'next/image';
import { HeaderComponentProps } from '../types';

export default function HeaderComponent({ latitude, longitude, address }: HeaderComponentProps) {
    return (
        <div className="absolute top-[18px] left-[20px] right-[20px] h-[75px] bg-white rounded-[10px] shadow-[2px_4px_20px_rgba(0,0,0,0.2)] pointer-events-auto">
            {/* 중앙 주소 - 헤더 전체 중앙에 배치 */}
            <div className="absolute inset-0 flex justify-center items-center">
                <div
                    className="w-[597px] h-[26px] flex items-center justify-center text-center text-[22px] font-medium leading-[26px] tracking-[-0.03em] text-black"
                    style={{ fontFamily: 'Gotham' }}
                >
                    {address}
                </div>
            </div>

            <div className="flex justify-between items-ceb h-full">
                {/* 로고 */}
                <div className="flex items-center pl-[28px]">
                    <div className="w-[122px] h-[38px]">
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={122}
                            height={38}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* 오른쪽 위도/경도 컨테이너들 */}
                <div className="flex gap-[15px] items-center pr-[28px]">
                    {/* 경도 컨테이너 */}
                    <div className="flex justify-center items-center px-[10px] py-[4px] w-[123px] h-[34px] bg-[#EFF5F9] rounded-[10px]">
                        <div
                            className="w-[103px] h-[26px] flex items-center justify-center text-center text-[14px] font-medium leading-[160%] tracking-[-0.02em] text-[#3F6B88] whitespace-nowrap overflow-hidden"
                            style={{ fontFamily: 'Gotham' }}
                        >
                            E{longitude.toFixed(2)}°
                        </div>
                    </div>

                    {/* 위도 컨테이너 */}
                    <div className="flex justify-center items-center px-[10px] py-[4px] w-[115px] h-[34px] bg-[#EFF5F9] rounded-[10px]">
                        <div
                            className="w-[95px] h-[26px] flex items-center justify-center text-center text-[14px] font-medium leading-[160%] tracking-[-0.02em] text-[#3F6B88] whitespace-nowrap overflow-hidden"
                            style={{ fontFamily: 'Gotham' }}
                        >
                            N{latitude.toFixed(2)}°
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
