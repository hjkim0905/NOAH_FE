import { BackendAPIResponse, GeminiAPIResponse, ParsedStrategyData, ParsedWeatherData } from '../types';

// 백엔드 API에서 화재 진압 계획 가져오기
export const fetchFireSuppressionPlan = async (lat: number, lon: number): Promise<BackendAPIResponse | null> => {
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
        if (!backendUrl) {
            console.error('백엔드 API URL이 설정되지 않았습니다.');
            return null;
        }

        console.log('백엔드 API 호출 URL:', backendUrl);
        console.log('전송할 데이터:', { lon, lat });

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lon: lon,
                lat: lat,
            }),
        });

        console.log('백엔드 API 응답 상태:', response.status, response.statusText);
        console.log('백엔드 API 응답 헤더:', response.headers);

        if (!response.ok) {
            // 응답 본문을 텍스트로 읽어서 에러 내용 확인
            const errorText = await response.text();
            console.error('백엔드 API 에러 응답:', errorText);
            throw new Error(`백엔드 API 호출 실패: ${response.status} - ${errorText}`);
        }

        const data: BackendAPIResponse = await response.json();
        console.log('백엔드 API 응답:', data);
        return data;
    } catch (error) {
        console.error('화재 진압 계획 가져오기 실패:', error);
        return null;
    }
};

// Gemini API를 사용하여 백엔드 응답 파싱
export const parseBackendResponseWithGemini = async (
    backendResponse: string
): Promise<{
    strategyData: ParsedStrategyData;
    weatherData: ParsedWeatherData;
} | null> => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        if (!apiKey) {
            console.error('Gemini API 키가 설정되지 않았습니다.');
            return null;
        }

        const prompt = `
Analyze the following fire suppression plan report and convert it into a detailed and organized strategy text:

${backendResponse}

Please respond in the following format:
{
  "strategyData": {
    "helicopterDeployed": boolean,
    "slope": number,
    "elevation": number,
    "windSpeed": number,
    "windDirection": number,
    "entryPoints": [string],
    "strategyText": string
  },
  "weatherData": {
    "windDirection": number,
    "windSpeed": number,
    "humidity": number
  }
}

**Requirements:**
1. strategyText should be detailed content for the Firefighting Strategy component
2. Include helicopter deployment decision, terrain conditions, entry points, wind direction/speed analysis
3. Write professionally but understandably
4. Write in English
5. Parse actual values for numbers, true/false for booleans, and actual text for strings

**Example strategyText format:**
"Based on the analysis of the current fire incident location, the terrain conditions show a slope of 4.5 degrees and elevation of 573.0m, which allows for helicopter landing. Considering the weather conditions of 2.3 m/s wind speed and 180 degrees (south) wind direction, we have established the following entry strategy.

**Helicopter Deployment Decision:**
- Helicopter Deployment: Not Required (Ground Response Possible)
- Decision Basis: Slope and elevation are suitable for ground entry, and wind speed is within safe range

**Ground Entry Strategy:**
- East Entry Point: East Point 1 (Shortest distance, excellent accessibility)
- West Entry Point: West Point 2 (Alternative route, safety consideration)
- North Entry Point: North Point 3 (Wind direction consideration, smoke spread direction)

**Weather Condition Analysis:**
- Wind Direction: South (180 degrees) - Smoke expected to spread northward
- Wind Speed: 2.3 m/s - Slow fire spread rate favorable for ground entry
- Recommended Entry Direction: Enter from south to north, considering smoke spread direction for effective suppression operations"
`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt,
                                },
                            ],
                        },
                    ],
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Gemini API 호출 실패: ${response.status}`);
        }

        const data: GeminiAPIResponse = await response.json();
        const responseText = data.candidates[0]?.content?.parts[0]?.text;

        if (!responseText) {
            throw new Error('Gemini API 응답 텍스트가 없습니다.');
        }

        // JSON 응답 추출 (```json과 ``` 사이의 내용)
        const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
        const jsonText = jsonMatch ? jsonMatch[1] : responseText;

        const parsedData = JSON.parse(jsonText);
        console.log('Gemini API 파싱 결과:', parsedData);

        return parsedData;
    } catch (error) {
        console.error('Gemini API 파싱 실패:', error);
        return null;
    }
};

// 화재 진압 데이터 전체 프로세스
export const getFireSuppressionData = async (lat: number, lon: number) => {
    try {
        // 1. 백엔드 API에서 화재 진압 계획 가져오기
        const backendResponse = await fetchFireSuppressionPlan(lat, lon);
        if (!backendResponse) {
            return null;
        }

        // 2. Gemini API로 응답 파싱
        const parsedData = await parseBackendResponseWithGemini(JSON.stringify(backendResponse));
        return parsedData;
    } catch (error) {
        console.error('화재 진압 데이터 가져오기 실패:', error);
        return null;
    }
};
