const fs = require('fs');
let html = fs.readFileSync('c:/Users/victo/OneDrive/Documents/Politico/index.html', 'utf8');

const search = '<div class="sticky top-14 z-30 py-1.5 flex justify-center px-4">';
const replace = '<div class="sticky top-14 z-30 py-1.5 flex justify-start sm:justify-center overflow-x-auto no-scrollbar px-4 w-full">';
if (html.includes(search)) {
    html = html.replace(search, replace);
}

const search2 = '<div role="tablist" class="apple-segmented-container shadow-xs">';
const replace2 = '<div role="tablist" class="apple-segmented-container shadow-xs flex-shrink-0">';
if (html.includes(search2)) {
    html = html.replace(search2, replace2);
}

fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/index.html', html, 'utf8');
console.log('Fixed mobile tabs scroll in index.html');
