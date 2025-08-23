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
            {/* 날씨 정보 내용이 들어갈 예정 */}
        </div>
    );
}
