export function getLanguage(filename, country) {
	const json = require(`./languages/${filename}.json`);
	const lang = json[country];
	return lang;
}

export function getCountry(acceptLang) { 
    
    const supportedLangs = ['ko', 'ja', 'zh', 'fr', 'de', 'es', 'it', 'pt','ru', 'vi', 'th', 'id', 'tr', 'ar', 'pl', 'hi', 'en'];
    let targetLang = 'en';

    for (const lang of supportedLangs) {
        if (acceptLang.includes(lang)) {
            targetLang = lang;
            break;
        }
    }
    
    return targetLang;
}