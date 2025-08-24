import Image from 'next/image';
import { ParsedStrategyData } from '../types';

interface HelicopterDeploymentProps {
    strategyData: ParsedStrategyData | null;
}

export default function HelicopterDeployment({ strategyData }: HelicopterDeploymentProps) {
    // helicopterDeployed가 true면 necessary, false면 unnecessary
    const isNecessary = strategyData ? strategyData.helicopterDeployed : null;
    return (
        <div className="absolute top-[118px] left-[20px] w-[425px] h-[115px] bg-white rounded-[15px] shadow-[2px_4px_30px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between h-full px-[20px]">
                <div className="flex items-center gap-[12px]">
                    <Image
                        src="/images/HelicopterDeployment.png"
                        alt="Helicopter Deployment"
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                    <div
                        className="w-[118px] h-[52px] flex items-center text-[20px] font-medium leading-[130%] tracking-[-0.03em] text-[#303030]"
                        style={{ fontFamily: 'Gotham' }}
                    >
                        Helicopter Deployment
                    </div>
                </div>

                {/* Status 표시 - 서버 값에 따라 스타일 변경 */}
                <div
                    className={`flex items-center justify-center rounded-[100px] ${
                        isNecessary === null
                            ? 'w-[145px] h-[49.3px] bg-[#F1F2F5]'
                            : isNecessary
                            ? 'w-[145px] h-[49.3px] bg-[#FFF0F0]'
                            : 'w-[153px] h-[49px] bg-[#F1F2F5]'
                    }`}
                >
                    <div
                        className={`flex items-center justify-center text-center text-[21px] font-medium leading-[160%] tracking-[-0.02em] ${
                            isNecessary === null
                                ? 'w-[116px] h-[23.2px] text-[#838E95]'
                                : isNecessary
                                ? 'w-[116px] h-[23.2px] text-[#F44336]'
                                : 'w-[130px] h-[34px] text-[#838E95]'
                        }`}
                        style={{ fontFamily: 'Gotham' }}
                    >
                        {isNecessary === null ? 'Loading...' : isNecessary ? 'Necessary' : 'Unnecessary'}
                    </div>
                </div>
            </div>
        </div>
    );
}
