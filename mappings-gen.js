const fs = require('fs');
const path = require('path');

const htmlDir = path.join(__dirname, 'src/html');
const mappingFile = path.join(__dirname, 'src/mappings.js');

try {
    const files = fs.readdirSync(htmlDir).filter(f => f.endsWith('.js'));
    const names = files.map(f => f.replace('.js', ''));

    let content = `// ⚠️ 자동 생성됨 (수정 금지!)\n`;
    content += `export * from './pages/base.js';\n\n`;

    // 1. 각 페이지 모듈 임포트
    names.forEach(name => {
        content += `import * as ${name}Module from './html/${name}.js';\n`;
    });

    // 2. 개별 export (mappings.index 등으로 접근 가능)
    content += `\n`;
    names.forEach(name => {
        content += `export const ${name} = ${name}Module;\n`;
    });

    // 3. pages 객체 생성 (index.js에서 동적 라우팅용)
    content += `\nexport const pages = {\n`;
    names.forEach(name => {
        content += `    ${name}: ${name}Module,\n`;
    });
    content += `};\n`;

    fs.writeFileSync(mappingFile, content);
    console.log('✅ [성공] src/mappings.js 업데이트 완료!');
} catch (err) {
    console.error('❌ [에러] mappings-gen 실행 중 문제 발생:', err.message);
}