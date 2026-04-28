const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'modules', 'patient');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace window.location.hash = 'xxx' -> window.location.href = '/xxx'
    content = content.replace(/window\.location\.hash\s*=\s*'([^']+)'/g, (match, p1) => {
        if (p1 === '') return `window.location.href = '/'`;
        // Handle ordonnances?id=...
        if (p1.includes('?')) {
            return `window.location.href = '/${p1}'`;
        }
        return `window.location.href = '/${p1}'`;
    });

    // Replace window.location.hash = `xxx` -> window.location.href = `/xxx`
    content = content.replace(/window\.location\.hash\s*=\s*`([^`]+)`/g, (match, p1) => {
        return `window.location.href = \`/${p1}\``;
    });

    // Replace window.location.hash = item.id -> window.location.href = '/' + item.id
    content = content.replace(/window\.location\.hash\s*=\s*item\.id/g, "window.location.href = '/' + item.id");

    // Replace href="#xxx" -> href="/xxx"
    content = content.replace(/href="#([^"]+)"/g, (match, p1) => {
        // if it's an anchor on the landing page, we shouldn't change it if it's just scrolling.
        // The landing page anchors: fonctionnalites, pour-qui, temoignages
        if (['fonctionnalites', 'pour-qui', 'temoignages'].includes(p1)) {
            return `href="/#${p1}"`;
        }
        return `href="/${p1}"`;
    });
    
    // In Ordonnances.tsx: const hash = window.location.hash;
    // Replace with const hash = window.location.search or pathname?
    // Actually, in Ordonnances: const hash = window.location.hash; if(hash.includes('?id='))
    // We should change it to use window.location.search
    content = content.replace(/const hash = window\.location\.hash;/g, "const hash = window.location.search;");

    // FloatingNav.tsx specifics
    content = content.replace(/useState\(window\.location\.hash \|\| '#patient-dashboard'\)/g, "useState(window.location.pathname || '/patient-dashboard')");
    content = content.replace(/const onLocationChange = \(\) => setCurrentPath\(window\.location\.hash\);/g, "const onLocationChange = () => setCurrentPath(window.location.pathname);");
    content = content.replace(/window\.addEventListener\('hashchange'/g, "window.addEventListener('popstate'");
    content = content.replace(/window\.removeEventListener\('hashchange'/g, "window.removeEventListener('popstate'");
    content = content.replace(/setCurrentPath\(window\.location\.hash \|\| '#patient-dashboard'\);/g, "setCurrentPath(window.location.pathname || '/patient-dashboard');");

    // FloatingNav uses item.id for active state. The path is now /item.id
    // It checks `currentPath === '#' + item.id` -> change to `currentPath === '/' + item.id`
    content = content.replace(/currentPath === '#' \+ item\.id/g, "currentPath === '/' + item.id");
    content = content.replace(/currentPath === '#patient-dashboard'/g, "currentPath === '/patient-dashboard'");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated', filePath);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            walkDir(filePath);
        } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
            replaceInFile(filePath);
        }
    }
}

walkDir(directoryPath);
console.log('Done');
