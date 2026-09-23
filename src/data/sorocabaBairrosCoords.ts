/**
 * Coordenadas Centróides dos Bairros Oficiais de Sorocaba/SP
 * Utilizadas para plotagem espacial precisa dos focos e casos epidemiológicos.
 */

export const SOROCABA_BAIRROS_COORDS: Record<string, [number, number]> = {
  // Zona Norte / Noroeste
  'Vila Angélica': [-23.4821, -47.4720],
  'Vila Barão': [-23.4912, -47.4851],
  'Jardim Zulmira': [-23.4865, -47.4789],
  'Lopes de Oliveira': [-23.4735, -47.4812],
  'Vila Nova Sorocaba': [-23.4690, -47.4760],
  'Vila Fiori': [-23.4780, -47.4610],
  'Vila Leopoldina': [-23.4760, -47.4560],
  'Vila Elza': [-23.4840, -47.4765],
  'Vila Almeida': [-23.4870, -47.4730],
  'Vila Helena': [-23.4680, -47.4860],
  'Jardim Maria Eugênia': [-23.4580, -47.4680],
  'Jardim Santa Marina': [-23.4320, -47.4640],
  'Habiteto': [-23.4215, -47.4580],
  'Ana Paula Eleutério': [-23.4215, -47.4580],
  'Parque São Bento': [-23.4350, -47.4890],
  'Parque Esmeralda': [-23.4410, -47.4920],
  'Altos do Itavuvu': [-23.4490, -47.4820],
  'Vitória Régia': [-23.4380, -47.4720],
  'Parque Vitória Régia': [-23.4380, -47.4720],
  'Jardim São Guilherme': [-23.4530, -47.4790],
  'Jardim Santa Cecília': [-23.4450, -47.4700],
  'Jardim Paraná': [-23.4620, -47.4620],
  'Vila Carvalho': [-23.4880, -47.4590],

  // Zona Oeste
  'Jardim Simus': [-23.5020, -47.4915],
  'Jardim Sol Nascente': [-23.5050, -47.4980],
  'Nova Esperança': [-23.4981, -47.5012],
  'Jardim Nova Esperança': [-23.4981, -47.5012],
  'Jardim Itapuã': [-23.5110, -47.4950],
  'Jardim Califórnia': [-23.5070, -47.4880],
  'Jardim São Carlos': [-23.5140, -47.4990],
  'Jardim Vera Cruz': [-23.5090, -47.4840],
  'Jardim Montreal': [-23.5120, -47.5190],
  'Piazza Di Roma': [-23.5160, -47.5140],
  'Piazza di Roma': [-23.5160, -47.5140],
  'Wanel Ville': [-23.5080, -47.5120],
  'Jardim Itanguá': [-23.5040, -47.5050],
  'Itanguá': [-23.5040, -47.5050],
  'Jardim Humberto de Campos': [-23.4930, -47.4950],
  'Humberto de Campos': [-23.4930, -47.4950],
  'Jardim São Paulo': [-23.5090, -47.4780],
  'Vila São João': [-23.4940, -47.4710],
  'Vila São Jorge': [-23.4890, -47.4680],
  'Vila Lucy': [-23.5010, -47.4810],
  'Jardim Betânia': [-23.4610, -47.4740],
  'Jardim Los Angeles': [-23.4690, -47.4920],
  'Villagio Torino': [-23.5190, -47.5180],
  'Jardim Renascer': [-23.4470, -47.4610],
  'Renascer': [-23.4470, -47.4610],
  'Jardim Aeroporto': [-23.4830, -47.4910],
  'Jardim Magnólia': [-23.5130, -47.4790],

  // Centro e Zona Sul
  'Centro': [-23.5010, -47.4580],
  'Jardim Paulistano': [-23.5120, -47.4590],
  'Jardim Vergueiro': [-23.5090, -47.4520],
  'Vila Jardini': [-23.5170, -47.4680],
  'Vila Independência': [-23.5220, -47.4710],
  'Campolim': [-23.5340, -47.4640],
  'Parque Campolim': [-23.5340, -47.4640],
  'Jardim América': [-23.5250, -47.4620],
  'Jardim Pagliato': [-23.5290, -47.4750],
  'Pagliato': [-23.5290, -47.4750],
  'Vila Santa Rosália': [-23.4920, -47.4470],
  'Jardim Santa Rosália': [-23.4920, -47.4470],
  'Trujillo': [-23.4960, -47.4660],
  'Jardim Trujillo': [-23.4960, -47.4660],

  // Zona Leste e Industrial
  'Vila Barcelona': [-23.5150, -47.4350],
  'Barcelona': [-23.5150, -47.4350],
  'Vila Haro': [-23.5180, -47.4280],
  'Jardim Piratininga': [-23.5110, -47.4210],
  'Vila Hortência': [-23.5080, -47.4390],
  'Vila Assis': [-23.5050, -47.4320],
  'Além Ponte': [-23.5020, -47.4420],
  'Brigadeiro Tobias': [-23.5280, -47.3450],
  'Éden': [-23.4150, -47.3820],
  'Eden': [-23.4150, -47.3820],
  'Aparecidinha': [-23.4780, -47.3620],
  'Zona Industrial': [-23.4290, -47.4010],
  'Jardim Guaíba': [-23.4860, -47.4430],
  'Guaíba': [-23.4860, -47.4430],
  'Cajuru': [-23.3980, -47.3540],
  'Vila Colorau': [-23.5290, -47.4290],
  'Jardim Gutierres': [-23.5240, -47.4350],
  'Jardim Nogueira': [-23.4740, -47.4890],
  'Jardim Planalto': [-23.4920, -47.4910],
  'Jardim Paulista': [-23.4690, -47.4810]
};

// Fallback Sorocaba City Center
export const SOROCABA_CENTER: [number, number] = [-23.5015, -47.4526];

export function getCoordinatesForAddress(bairro?: string, seedStr: string = ''): [number, number] {
  if (!bairro) return SOROCABA_CENTER;
  
  // Normalization
  const bClean = bairro.trim();
  let baseCoords = SOROCABA_BAIRROS_COORDS[bClean];
  
  if (!baseCoords) {
    // Fuzzy matching
    for (const [key, coords] of Object.entries(SOROCABA_BAIRROS_COORDS)) {
      if (bClean.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(bClean.toLowerCase())) {
        baseCoords = coords;
        break;
      }
    }
  }

  if (!baseCoords) {
    baseCoords = SOROCABA_CENTER;
  }

  // Consistent deterministic pseudo-random jitter around the neighborhood centroid
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
    hash |= 0;
  }
  const latOffset = (((hash % 1000) - 500) / 1000) * 0.007; // ~300-500 meters
  const lngOffset = ((((hash >> 3) % 1000) - 500) / 1000) * 0.007;

  return [baseCoords[0] + latOffset, baseCoords[1] + lngOffset];
}
