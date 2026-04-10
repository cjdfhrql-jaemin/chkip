import StringUtil from './string-util.js';

export async function geminiTranslation(c, key, content, targetLang) {
    const KV = c.env.AT_KV; 
    const apiKey = c.env.GEMINI_API_KEY; // Secret에서 가져온 키

	// 1. 키 생성 (보안 및 길이 최적화)
    const cacheKey = `tr:${targetLang}:${key}`;

    // 2. KV 캐시 확인
    const cached = await KV.get(cacheKey);
    if (cached) {
        console.log('KV Cache Hit! ⚡');
        return cached;
    }

    // 3. Gemini API 호출용 프롬프트 (군더더기 제거 지시)
    const prompt = `Translate the following text to ${targetLang}. 
Return ONLY the translated text without any explanations or conversational fillers.

Text: ${content}`;

    // 4. API 호출 (apiKey 변수 사용 확인!)
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!res.ok) {
        const errorData = await res.text();
        console.error("Gemini API Details:", errorData);
        throw new Error(`Gemini API Error: ${res.status}`);
    }

    const data = await res.json();
    
    // 안전한 데이터 추출
    const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "번역 실패";

    // 5. KV에 저장
    await KV.put(cacheKey, translatedText);

    return translatedText;
}