const fs = require('fs');

async function testServing() {
  try {
    const resV2 = await fetch('http://localhost:8080/index_v2.html');
    console.log('index_v2.html HTTP Status:', resV2.status);
    const textV2 = await resV2.text();
    console.log('index_v2.html Size:', textV2.length);
    console.log('Contains export-modal:', textV2.includes('id="export-modal"'));
    console.log('Contains candidates-grid:', textV2.includes('id="candidates-grid"'));
    console.log('Contains ranking-podium:', textV2.includes('id="ranking-podium"'));
    console.log('Contains ranking-table-body:', textV2.includes('id="ranking-table-body"'));
    console.log('Contains compare-radar-chart:', textV2.includes('id="compare-radar-chart"'));
    console.log('Contains quiz-container:', textV2.includes('id="quiz-container"'));
    console.log('Contains incumbents-grid:', textV2.includes('id="incumbents-grid"'));
    console.log('Contains apple_v2.js:', textV2.includes('js/apple_v2.js'));
    console.log('Contains stickers.js:', textV2.includes('js/stickers.js'));

    const resV1 = await fetch('http://localhost:8080/index.html');
    console.log('index.html HTTP Status:', resV1.status);
    const textV1 = await resV1.text();
    console.log('Contains link to index_v2.html:', textV1.includes('index_v2.html'));

    const resJs = await fetch('http://localhost:8080/js/apple_v2.js');
    console.log('js/apple_v2.js HTTP Status:', resJs.status);
    const textJs = await resJs.text();
    console.log('js/apple_v2.js Size:', textJs.length);
    console.log('js/apple_v2.js defines renderAppleCandidatesFeed:', textJs.includes('function renderAppleCandidatesFeed'));
    console.log('js/apple_v2.js defines attach3DTiltToCards:', textJs.includes('function attach3DTiltToCards'));
    console.log('js/apple_v2.js defines switchAppleTab:', textJs.includes('function switchAppleTab'));
  } catch (err) {
    console.error('Error in testServing:', err);
  }
}

testServing();
