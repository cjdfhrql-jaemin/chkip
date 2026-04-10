/** @jsx jsx */
export class StringUtil {
    /**
     * 입력된 텍스트를 SHA-256으로 해싱하여 짧은 키를 생성합니다.
     * @param {string} text - 원문 텍스트
     * @param {number} len - 반환할 키 길이 (기본값 8)
     * @returns {Promise<string>} 해시된 짧은 키
     */
    static async getShortKey(text, len = 8) {
        if (!text) return ""; // 텍스트가 없을 경우 방어 코드 추가

        const msgUint8 = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));

        const hashHex = hashArray
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        return hashHex.substring(0, len);
    }
}

export default StringUtil;