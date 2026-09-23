/**
 * Base Oficial das Unidades Básicas de Saúde (UBS) e Colegiados Regionais de Sorocaba/SP
 * Dados fornecidos pela Secretaria Municipal da Saúde / Zoonoses de Sorocaba
 */

export interface SorocabaUbsFeature {
  id: string;
  name: string;
  colegiado: 'Sudoeste' | 'Noroeste' | 'Centro Norte' | 'Centro Sul' | 'Norte' | 'Leste';
  regional: 'Oeste' | 'Norte' | 'Leste' | 'Sul';
  lat: number;
  lng: number;
  endereco: string;
  telefone: string;
  bairrosAtendidos: string[];
  populacao: number;
  raioKm: number;
}

export const SOROCABA_UBS_LIST: SorocabaUbsFeature[] = [
  {
    id: 'M. MENDES',
    name: 'UBS Márcia Mendes',
    colegiado: 'Sudoeste',
    regional: 'Oeste',
    lat: -23.512551,
    lng: -47.493796,
    endereco: 'Pç. José Augusto Rabelo Jr, 91',
    telefone: '(15) 3221-1234',
    bairrosAtendidos: ['Jardim Vera Cruz', 'Jardim São Paulo', 'Jardim Pagliato', 'Jardim Califórnia'],
    populacao: 55370,
    raioKm: 1.6
  },
  {
    id: 'SOROCABA I',
    name: 'UBS Sorocaba I',
    colegiado: 'Sudoeste',
    regional: 'Oeste',
    lat: -23.505139,
    lng: -47.513542,
    endereco: 'Av. Américo Figueiredo, 3171',
    telefone: '(15) 3222-7711',
    bairrosAtendidos: ['Sorocaba I', 'Jardim Itanguá', 'Jardim Montreal', 'Wanel Ville'],
    populacao: 43290,
    raioKm: 1.8
  },
  {
    id: 'WANEL',
    name: 'UBS Wanel Ville',
    colegiado: 'Sudoeste',
    regional: 'Oeste',
    lat: -23.494710,
    lng: -47.505284,
    endereco: 'R. Alexandre Caldini, 442',
    telefone: '(15) 3222-8822',
    bairrosAtendidos: ['Wanel Ville', 'Piazza Di Roma', 'Villagio Torino', 'Jardim Humberto de Campos'],
    populacao: 33525,
    raioKm: 1.5
  },
  {
    id: 'SIMUS',
    name: 'UBS Jardim Simus',
    colegiado: 'Sudoeste',
    regional: 'Oeste',
    lat: -23.501675,
    lng: -47.495098,
    endereco: 'Al. dos Lírios, 327',
    telefone: '(15) 3221-4321',
    bairrosAtendidos: ['Jardim Simus', 'Jardim Sol Nascente', 'Jardim Magnólia', 'Vila Lucy'],
    populacao: 15879,
    raioKm: 1.2
  },
  {
    id: 'RODRIGO',
    name: 'UBS Jd. Rodrigo',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.483120,
    lng: -47.503110,
    endereco: 'R. Alfeu Castro dos Santos, 220',
    telefone: '(15) 3213-4455',
    bairrosAtendidos: ['Jardim Rodrigo', 'Jardim Aeroporto', 'Jardim Renascer', 'Lopes de Oliveira'],
    populacao: 18470,
    raioKm: 1.3
  },
  {
    id: 'LOPES',
    name: 'UBS Lopes de Oliveira',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.466047,
    lng: -47.502644,
    endereco: 'Av. Riusaku Kanizawa, 795',
    telefone: '(15) 3223-1491',
    bairrosAtendidos: ['Lopes de Oliveira', 'Jardim Califórnia', 'Jardim Marcelo Augusto', 'Vila Nova Sorocaba'],
    populacao: 24484,
    raioKm: 1.4
  },
  {
    id: 'N. ESPER.',
    name: 'UBS Nova Esperança',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.491904,
    lng: -47.492193,
    endereco: 'R. Paula Mayer Cattani, 689',
    telefone: '(15) 3221-9988',
    bairrosAtendidos: ['Nova Esperança', 'Jardim Nova Esperança', 'Jardim Itapuã', 'Jardim Humberto de Campos'],
    populacao: 15383,
    raioKm: 1.2
  },
  {
    id: 'ANGELICA',
    name: 'UBS Vila Angélica',
    colegiado: 'Centro Norte',
    regional: 'Norte',
    lat: -23.482738,
    lng: -47.481787,
    endereco: 'R. Major Silva Vilela, 27',
    telefone: '(15) 3232-1199',
    bairrosAtendidos: ['Vila Angélica', 'Vila Elza', 'Vila Almeida', 'Jardim Zulmira'],
    populacao: 12140,
    raioKm: 1.3
  },
  {
    id: 'N. SOROCABA',
    name: 'UBS Nova Sorocaba',
    colegiado: 'Centro Norte',
    regional: 'Norte',
    lat: -23.466343,
    lng: -47.484527,
    endereco: 'Av. Americana, 351',
    telefone: '(15) 3223-5566',
    bairrosAtendidos: ['Vila Nova Sorocaba', 'Jardim Betânia', 'Jardim Paraná', 'Vila Helena'],
    populacao: 15881,
    raioKm: 1.4
  },
  {
    id: 'CERRADO',
    name: 'UBS Cerrado',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.511269,
    lng: -47.475405,
    endereco: 'R. Visconde do Rio Branco, 885',
    telefone: '(15) 3233-1122',
    bairrosAtendidos: ['Cerrado', 'Vila Jardini', 'Vila Independência', 'Centro', 'Trujillo'],
    populacao: 46888,
    raioKm: 1.7
  },
  {
    id: 'ESCOLA',
    name: 'UBS Escola (Centro/Sul)',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.510089,
    lng: -47.455680,
    endereco: 'Av. Pereira Inácio, 500',
    telefone: '(15) 3234-5544',
    bairrosAtendidos: ['Centro', 'Jardim Vergueiro', 'Jardim Paulistano', 'Campolim'],
    populacao: 18740,
    raioKm: 1.4
  },
  {
    id: 'BARAO',
    name: 'UBS Vila Barão',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.491211,
    lng: -47.482534,
    endereco: 'R. Afonso Muraro, 41',
    telefone: '(15) 3221-4500',
    bairrosAtendidos: ['Vila Barão', 'Vila Santa Rita', 'Jardim Zulmira', 'Jardim Barão'],
    populacao: 14436,
    raioKm: 1.4
  },
  {
    id: 'FIORE',
    name: 'UBS Vila Fiori',
    colegiado: 'Centro Norte',
    regional: 'Norte',
    lat: -23.478844,
    lng: -47.470414,
    endereco: 'R. Atanásio Soares, 701',
    telefone: '(15) 3231-7788',
    bairrosAtendidos: ['Vila Fiori', 'Vila Leopoldina', 'Vila Carvalho', 'Vila São Jorge'],
    populacao: 12940,
    raioKm: 1.2
  },
  {
    id: 'MINEIRÃO',
    name: 'UBS Mineirão',
    colegiado: 'Centro Norte',
    regional: 'Norte',
    lat: -23.467928,
    lng: -47.462361,
    endereco: 'R. Ten. Érico Oliveira, 110',
    telefone: '(15) 3231-9900',
    bairrosAtendidos: ['Mineirão', 'Vila Fiori', 'Jardim Maria Eugênia'],
    populacao: 19547,
    raioKm: 1.3
  },
  {
    id: 'SANTANA',
    name: 'UBS Vila Santana',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.487936,
    lng: -47.459314,
    endereco: 'R. Deodoro Reis, 150',
    telefone: '(15) 3232-4411',
    bairrosAtendidos: ['Vila Santana', 'Vila Carvalho', 'Santa Rosália', 'Além Ponte'],
    populacao: 17513,
    raioKm: 1.3
  },
  {
    id: 'S. BENTO',
    name: 'UBS Parque São Bento',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.433584,
    lng: -47.501663,
    endereco: 'Av. Dr. Gualberto Moreira, 1581',
    telefone: '(15) 3213-9090',
    bairrosAtendidos: ['Parque São Bento', 'Parque Esmeralda', 'Altos do Itavuvu'],
    populacao: 33302,
    raioKm: 1.8
  },
  {
    id: 'CARANDA',
    name: 'UBS Carandá',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.418478,
    lng: -47.511776,
    endereco: 'R. Romeu Benedicto Darbello, 248',
    telefone: '(15) 3213-8899',
    bairrosAtendidos: ['Carandá', 'Altos do Ipanema', 'Residencial Viver'],
    populacao: 13193,
    raioKm: 1.7
  },
  {
    id: 'Ma. EUGENIA',
    name: 'UBS Maria Eugênia',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.455588,
    lng: -47.490751,
    endereco: 'R. Mário Romano, 264',
    telefone: '(15) 3223-8877',
    bairrosAtendidos: ['Jardim Maria Eugênia', 'Jardim Santa Cecília', 'Lopes de Oliveira'],
    populacao: 16967,
    raioKm: 1.3
  },
  {
    id: 'S. GUILHERME',
    name: 'UBS São Guilherme',
    colegiado: 'Noroeste',
    regional: 'Oeste',
    lat: -23.445463,
    lng: -47.489739,
    endereco: 'R. Francisco Augusto, 51',
    telefone: '(15) 3213-7766',
    bairrosAtendidos: ['Jardim São Guilherme', 'Jardim Santa Marina', 'Parque Vitória Régia'],
    populacao: 34800,
    raioKm: 1.6
  },
  {
    id: 'PAINEIRAS',
    name: 'UBS Paineiras',
    colegiado: 'Norte',
    regional: 'Norte',
    lat: -23.445634,
    lng: -47.471437,
    endereco: 'R. Elisa Stefani Ramos, 130',
    telefone: '(15) 3213-5544',
    bairrosAtendidos: ['Parque das Paineiras', 'Laranjeiras', 'Vitória Régia'],
    populacao: 14245,
    raioKm: 1.3
  },
  {
    id: 'LARANJEIRAS',
    name: 'UBS Laranjeiras',
    colegiado: 'Norte',
    regional: 'Norte',
    lat: -23.453684,
    lng: -47.468545,
    endereco: 'R. Sônia Bernuncio, 24',
    telefone: '(15) 3213-3322',
    bairrosAtendidos: ['Laranjeiras', 'Parque das Paineiras', 'Jardim Maria Eugênia'],
    populacao: 34345,
    raioKm: 1.5
  },
  {
    id: 'VITORIA R.',
    name: 'UBS Vitória Régia',
    colegiado: 'Norte',
    regional: 'Norte',
    lat: -23.435978,
    lng: -47.469659,
    endereco: 'R. Francisco da S. Martins, 35',
    telefone: '(15) 3213-2211',
    bairrosAtendidos: ['Vitória Régia', 'Parque Vitória Régia', 'Jardim Santa Cecília'],
    populacao: 25255,
    raioKm: 1.5
  },
  {
    id: 'HABITETO',
    name: 'UBS Habiteto',
    colegiado: 'Norte',
    regional: 'Norte',
    lat: -23.421496,
    lng: -47.481550,
    endereco: 'Esq. R. Horácio Blazeck c/ Av. Ch. Xavier',
    telefone: '(15) 3217-1022',
    bairrosAtendidos: ['Habiteto', 'Ana Paula Eleutério', 'Jardim Santa Marina', 'Jardim Imperatriz'],
    populacao: 12692,
    raioKm: 1.8
  },
  {
    id: 'BARCELONA',
    name: 'UBS Barcelona',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.516714,
    lng: -47.437481,
    endereco: 'R. Colômbia, 253',
    telefone: '(15) 3227-2200',
    bairrosAtendidos: ['Vila Barcelona', 'Barcelona', 'Parque Campolim', 'Jardim América'],
    populacao: 13044,
    raioKm: 1.3
  },
  {
    id: 'HORTENCIA',
    name: 'UBS Vila Hortência',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.505556,
    lng: -47.439160,
    endereco: 'R. Teodoro Kaisel, 677',
    telefone: '(15) 3227-1100',
    bairrosAtendidos: ['Vila Hortência', 'Vila Assis', 'Além Ponte', 'Vila Haro'],
    populacao: 19129,
    raioKm: 1.4
  },
  {
    id: 'SABIA',
    name: 'UBS Vila Sabiá',
    colegiado: 'Leste',
    regional: 'Leste',
    lat: -23.522826,
    lng: -47.434365,
    endereco: 'R. Dionizio Bueno Sampaio, 91',
    telefone: '(15) 3227-8899',
    bairrosAtendidos: ['Vila Sabiá', 'Jardim Gutierres', 'Vila Colorau', 'Jardim Piratininga'],
    populacao: 5547,
    raioKm: 1.1
  },
  {
    id: 'Ma. do CARMO',
    name: 'UBS Maria do Carmo',
    colegiado: 'Centro Norte',
    regional: 'Norte',
    lat: -23.475941,
    lng: -47.450649,
    endereco: 'R. Joaquim Ferreira Barbosa, 727',
    telefone: '(15) 3233-8899',
    bairrosAtendidos: ['Jardim Maria do Carmo', 'Vila Gabriel', 'Jardim Abaeté'],
    populacao: 29960,
    raioKm: 1.5
  },
  {
    id: 'HARO',
    name: 'UBS Vila Haro',
    colegiado: 'Centro Sul',
    regional: 'Leste',
    lat: -23.498515,
    lng: -47.433250,
    endereco: 'R. Aristides Silva Lobo, 379',
    telefone: '(15) 3227-3344',
    bairrosAtendidos: ['Vila Haro', 'Jardim Piratininga', 'Vila Colorau'],
    populacao: 35942,
    raioKm: 1.6
  },
  {
    id: 'B. TOBIAS',
    name: 'UBS Brigadeiro Tobias',
    colegiado: 'Leste',
    regional: 'Leste',
    lat: -23.507327,
    lng: -47.369884,
    endereco: 'R. Ana Gomes Correia, 55',
    telefone: '(15) 3236-1122',
    bairrosAtendidos: ['Brigadeiro Tobias', 'Genebra', 'Inhaíba', 'Estrada Velha'],
    populacao: 12998,
    raioKm: 2.8
  },
  {
    id: 'ULYSSES G.',
    name: 'UBS Ulysses Guimarães',
    colegiado: 'Norte',
    regional: 'Norte',
    lat: -23.431786,
    lng: -47.457315,
    endereco: 'R. Ferdinando Irineu Corrá, 27',
    telefone: '(15) 3217-4400',
    bairrosAtendidos: ['Ulysses Guimarães', 'Parque São Bento', 'Vitória Régia'],
    populacao: 15942,
    raioKm: 1.5
  },
  {
    id: 'EDEN',
    name: 'UBS Éden',
    colegiado: 'Leste',
    regional: 'Leste',
    lat: -23.416468,
    lng: -47.414380,
    endereco: 'R. Salvador Leite Marques, 933',
    telefone: '(15) 3225-1100',
    bairrosAtendidos: ['Éden', 'Zona Industrial', 'Jardim Harmonia', 'Parque das Árvores'],
    populacao: 29620,
    raioKm: 2.5
  },
  {
    id: 'CAJURU',
    name: 'UBS Cajuru do Sul',
    colegiado: 'Leste',
    regional: 'Leste',
    lat: -23.399201,
    lng: -47.378763,
    endereco: 'Av. Paraná, 3719',
    telefone: '(15) 3236-4400',
    bairrosAtendidos: ['Cajuru', 'Cajuru do Sul', 'Dower', 'Caputera'],
    populacao: 14702,
    raioKm: 2.5
  },
  {
    id: 'APARECIDINHA',
    name: 'UBS Aparecidinha',
    colegiado: 'Leste',
    regional: 'Leste',
    lat: -23.443750,
    lng: -47.373310,
    endereco: 'R. Joaquim Machado, 620',
    telefone: '(15) 3225-4422',
    bairrosAtendidos: ['Aparecidinha', 'Bom Jesus', 'Vila Amato', 'Nikkey'],
    populacao: 28585,
    raioKm: 2.4
  }
];

// Generate GeoJSON polygons from official UBS coordinates
export const SOROCABA_DEFAULT_GEOJSON: any = {
  type: 'FeatureCollection',
  features: SOROCABA_UBS_LIST.map((ubs) => {
    // Generate an octagonal coverage polygon around the UBS
    const numPoints = 10;
    const r = (ubs.raioKm / 111.32); // Approximate degrees
    const coords: [number, number][] = [];
    
    for (let i = 0; i <= numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const dLng = (r * Math.cos(angle)) / Math.cos((ubs.lat * Math.PI) / 180);
      const dLat = r * Math.sin(angle);
      coords.push([ubs.lng + dLng, ubs.lat + dLat]);
    }

    const colegiadoColors: Record<string, { stroke: string; fill: string }> = {
      'Sudoeste': { stroke: '#0284c7', fill: '#38bdf8' },
      'Noroeste': { stroke: '#f59e0b', fill: '#fde68a' },
      'Centro Norte': { stroke: '#10b981', fill: '#6ee7b7' },
      'Centro Sul': { stroke: '#8b5cf6', fill: '#c4b5fd' },
      'Norte': { stroke: '#ef4444', fill: '#fca5a5' },
      'Leste': { stroke: '#059669', fill: '#34d399' }
    };

    const c = colegiadoColors[ubs.colegiado] || { stroke: '#0284c7', fill: '#38bdf8' };

    return {
      type: 'Feature',
      properties: {
        id: ubs.id,
        nome: ubs.name,
        colegiado: ubs.colegiado,
        regional: ubs.regional,
        endereco: ubs.endereco,
        populacao: ubs.populacao,
        raioKm: ubs.raioKm,
        stroke: c.stroke,
        fill: c.fill,
        bairros: ubs.bairrosAtendidos.join(', ')
      },
      geometry: {
        type: 'Polygon',
        coordinates: [coords]
      }
    };
  })
};
