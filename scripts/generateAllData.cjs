// Script to process all 4 disease datasets into src/data/initialData.ts
const fs = require('fs');
const path = require('path');

// Helper to parse CSV lines with quoted strings
function parseCSV(text) {
  const lines = [];
  let currentLine = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === '"') {
      inQuotes = !inQuotes;
      currentLine += char;
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (currentLine.trim().length > 0) {
        lines.push(currentLine);
      }
      currentLine = '';
      if (char === '\r' && text[i + 1] === '\n') {
        i++;
      }
    } else {
      currentLine += char;
    }
  }
  if (currentLine.trim().length > 0) {
    lines.push(currentLine);
  }

  return lines.map(line => {
    const cells = [];
    let cell = '';
    let inQ = false;
    for (let j = 0; j < line.length; j++) {
      const c = line[j];
      if (c === '"') {
        inQ = !inQ;
      } else if (c === ',' && !inQ) {
        cells.push(cell.trim().replace(/^"|"$/g, '').trim());
        cell = '';
      } else {
        cell += c;
      }
    }
    cells.push(cell.trim().replace(/^"|"$/g, '').trim());
    return cells;
  });
}

// Bairros geo coordinates mapping for Sorocaba
const BAIRRO_COORDS = {
  'vila barao': [-23.4912, -47.4725],
  'vila barão': [-23.4912, -47.4725],
  'jardim zulmira': [-23.4965, -47.4682],
  'nova esperanca': [-23.4880, -47.4820],
  'nova esperança': [-23.4880, -47.4820],
  'jardim nova esperança': [-23.4880, -47.4820],
  'lopes de oliveira': [-23.4735, -47.4750],
  'habiteto': [-23.4420, -47.4890],
  'vila angelica': [-23.4830, -47.4620],
  'vila angélica': [-23.4830, -47.4620],
  'jardim itangua': [-23.4940, -47.4810],
  'jardim itanguá': [-23.4940, -47.4810],
  'parque sao bento': [-23.4460, -47.4690],
  'parque são bento': [-23.4460, -47.4690],
  'jardim betania': [-23.4750, -47.4710],
  'jardim betânia': [-23.4750, -47.4710],
  'vila nova sorocaba': [-23.4740, -47.4610],
  'nova sorocaba': [-23.4740, -47.4610],
  'jardim paulista': [-23.4780, -47.4580],
  'jardim simus': [-23.5040, -47.4850],
  'vila helena': [-23.4760, -47.4670],
  'santa marina': [-23.4690, -47.4730],
  'jardim santa marina': [-23.4690, -47.4730],
  'jardim santa cecilia': [-23.4650, -47.4710],
  'jardim santa cecília': [-23.4650, -47.4710],
  'santa cecilia': [-23.4650, -47.4710],
  'brigadeiro tobias': [-23.5050, -47.3620],
  'eden': [-23.4410, -47.3850],
  'éden': [-23.4410, -47.3850],
  'aparecidinha': [-23.4720, -47.3750],
  'centro': [-23.5015, -47.4580],
  'vila fiori': [-23.4820, -47.4520],
  'wanel ville': [-23.4990, -47.5020],
  'parque esmeralda': [-23.4910, -47.4980],
  'jardim guaiba': [-23.4710, -47.4650],
  'jardim guaíba': [-23.4710, -47.4650],
  'jardim magnolia': [-23.5180, -47.4750],
  'jardim magnólia': [-23.5180, -47.4750],
  'vila haro': [-23.5080, -47.4350],
  'vila barcelona': [-23.5120, -47.4410],
  'trujilo': [-23.4970, -47.4610],
  'jardim trujilo': [-23.4970, -47.4610],
  'paineiras': [-23.4350, -47.4710],
  'cidade jardim': [-23.5220, -47.4790],
  'piazza di roma': [-23.5150, -47.5120],
  'mineirao': [-23.4680, -47.4520],
  'mineirão': [-23.4680, -47.4520],
  'jardim sao guilherme': [-23.4580, -47.4650],
  'jardim são guilherme': [-23.4580, -47.4650],
  'hebert de souza': [-23.4520, -47.4710],
  'vitoria regia': [-23.4420, -47.4510],
  'vitória régia': [-23.4420, -47.4510]
};

function getCoordsForBairro(bairro) {
  if (!bairro) return [-23.5015, -47.4580];
  const clean = bairro.toLowerCase().trim();
  for (const [key, coords] of Object.entries(BAIRRO_COORDS)) {
    if (clean.includes(key) || key.includes(clean)) {
      // Add slight jitter so overlapping points are visible
      const jitterLat = (Math.random() - 0.5) * 0.004;
      const jitterLng = (Math.random() - 0.5) * 0.004;
      return [coords[0] + jitterLat, coords[1] + jitterLng];
    }
  }
  // Sorocaba center with jitter
  return [-23.5015 + (Math.random() - 0.5) * 0.02, -47.4580 + (Math.random() - 0.5) * 0.02];
}

console.log("Helper loaded.");
