const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle' });
  
  const css = await page.evaluate(() => {
    const styles = Array.from(document.querySelectorAll('style'));
    const tw = styles.find(s => s.textContent.includes('tailwindcss'));
    return tw ? tw.textContent : '';
  });
  
  if (css) {
    fs.writeFileSync('c:/Users/victo/OneDrive/Documents/Politico/css/tailwind-compiled.css', css);
    console.log('Tailwind CSS compiled successfully! Size:', css.length);
  } else {
    console.log('Tailwind CSS not found in the DOM.');
  }
  
  await browser.close();
})();
