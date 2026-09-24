import { CasoZoonoses, AgravoType } from '../types/zoonoses';
import { INITIAL_CASES } from '../data/initialData';

export const CASOS_INICIAIS = INITIAL_CASES;
const STORAGE_KEY = 'sivz_sorocaba_casos_v5_restored';

export function getCasos(): CasoZoonoses[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
      return INITIAL_CASES;
    }
    const parsed = JSON.parse(raw);
    // If older cache has partial data (less than 500 cases), auto-upgrade to full official 2026 dataset
    if (!Array.isArray(parsed) || parsed.length < 500) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
      return INITIAL_CASES;
    }
    return parsed;
  } catch (err) {
    console.error('Erro ao ler dados do localStorage:', err);
    return INITIAL_CASES;
  }
}

export function saveCasos(casos: CasoZoonoses[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(casos));
  } catch (err) {
    console.error('Erro ao salvar casos:', err);
  }
}

export function updateCaso(casoAtualizado: CasoZoonoses): CasoZoonoses[] {
  const casos = getCasos();
  const index = casos.findIndex(c => c.id === casoAtualizado.id);
  if (index !== -1) {
    casos[index] = {
      ...casoAtualizado,
      dataUltimaAtualizacao: new Date().toISOString().split('T')[0],
      ultimaAtualizacaoPor: casoAtualizado.ultimaAtualizacaoPor || 'Biólogo(a) Zoonoses'
    };
  } else {
    casos.unshift(casoAtualizado);
  }
  saveCasos(casos);
  return casos;
}

export function resetarCasos(): CasoZoonoses[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_CASES));
  return INITIAL_CASES;
}

export function parseLimeSurveyJsonAttachments(rawJson: string) {
  if (!rawJson) return [];
  try {
    // LimeSurvey often outputs escaped braces like [{lbrace} "title":""...
    let clean = rawJson
      .replace(/\{lbrace\}/g, '{')
      .replace(/\{rbrace\}/g, '}');
    const parsed = JSON.parse(clean);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function parseLimeSurveyCsvLine(line: string, headers: string[]): Partial<CasoZoonoses> | null {
  // Simple CSV parser supporting quotes
  const cells: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"' || char === "'") {
      inQuotes = !inQuotes;
    } else if (char === '\t' || char === ',' && !inQuotes) {
      cells.push(current.trim().replace(/^["']|["']$/g, ''));
      current = '';
    } else {
      current += char;
    }
  }
  cells.push(current.trim().replace(/^["']|["']$/g, ''));

  if (cells.length < 5) return null;

  // Map common LimeSurvey columns
  const rowMap: Record<string, string> = {};
  headers.forEach((h, idx) => {
    if (cells[idx] !== undefined) {
      rowMap[h.trim()] = cells[idx];
    }
  });

  const responseId = parseInt(rowMap['id'] || rowMap['ID da resposta'] || '0') || Math.floor(Math.random() * 900) + 100;
  const vetNome = rowMap['VetNome'] || rowMap['Nome Completo do Médico Veterinário'] || rowMap['VETERINÁRIO'] || 'Veterinário Notificante';
  const animalNome = rowMap['AnimalEspoNome'] || rowMap['Nome do Animal suspeito/confirmado'] || rowMap['ANIMAL'] || 'Animal';
  const tutorNome = rowMap['TutorNome'] || rowMap['Nome do Tutor'] || rowMap['TUTOR'] || 'Tutor';
  const bairro = rowMap['TutorBairro'] || rowMap['Bairro'] || rowMap['BAIRRO'] || 'Sorocaba';
  
  let agravo: AgravoType = 'Esporotricose';
  if (rowMap['Agravo_Leish'] === 'Y' || rowMap['CÃO'] || rowMap['TESTE RÁPIDO']) agravo = 'Leishmaniose';
  if (rowMap['Agravo_Lepto'] === 'Y' || rowMap['SOROVAR']) agravo = 'Leptospirose';
  if (rowMap['Agravo_Raiva'] === 'Y' || rowMap['Nº AMOSTRA CANIL']) agravo = 'Raiva';

  const rawAttachments = rowMap['ClinicaEspoAnexExam'] || '';
  const parsedAttachments = parseLimeSurveyJsonAttachments(rawAttachments);

  return {
    id: `${responseId}/26`,
    limesurveyResponseId: responseId,
    dataNotificacao: rowMap['submitdate']?.split(' ')[0] || rowMap['DATA'] || new Date().toISOString().split('T')[0],
    agravo,
    veterinarioNome: vetNome,
    veterinarioCrmv: rowMap['VetCRMV'] || rowMap['CRMV-SP'] || '',
    veterinarioClinica: rowMap['VetClinica'] || rowMap['CLÍNICA'] || 'Clínica Veterinária',
    veterinarioTelefone: rowMap['VetTelefone'] || rowMap['Telefone de Contato com DDD'] || '',
    veterinarioEmail: rowMap['VetEmail'] || rowMap['E-mail Corporativo / Profissional'] || '',
    tutorNome: tutorNome,
    tutorCpf: rowMap['TutorCPF'] || rowMap['CPF do Tutor'] || '',
    tutorTelefone: rowMap['TutorTelefone'] || rowMap['Telefone do Tutor'] || '',
    tutorEndereco: rowMap['TutorEndereco'] || rowMap['Endereço de residência do animal (logradouro)'] || '',
    tutorNumero: rowMap['TutorNumero'] || rowMap['Número do imóvel'] || '',
    tutorBairro: bairro,
    tutorMunicipio: rowMap['TutorMunicipio'] === '-oth-' ? (rowMap['TutorMunicipio_other'] || 'Outro') : (rowMap['TutorMunicipio'] || 'Sorocaba'),
    animalNome: animalNome,
    especie: (rowMap['AnimalEspoEspecie'] === 'Can' ? 'Canina' : 'Felina'),
    raca: rowMap['AnimalEspoRaca'] || rowMap['Raça'] || 'SRD',
    sexo: rowMap['AnimalEspoSexo'] === 'Femea' ? 'Fêmea' : (rowMap['AnimalEspoSexo'] === 'Macho' ? 'Macho' : 'Não sei informar'),
    sintomasDescricao: rowMap['SINTOMAS'] || 'Notificação encaminhada pelo LimeSurvey',
    anexosBrutos: rawAttachments,
    anexos: parsedAttachments,
    lpiEndereco: `${bairro} - ${rowMap['TutorEndereco'] || ''}`,
    lpiTipo: 'AUT',
    coletaRealizada: 'Sim',
    resultadoFinal: 'Positivo',
    statusInvestigacao: 'Em Investigação',
    observacoesTecnicas: 'Importado via lote LimeSurvey.'
  };
}
