export type AgravoType = 'Esporotricose' | 'Leishmaniose' | 'Leptospirose' | 'Raiva';

export type StatusInvestigacao = 
  | 'Em Investigação'
  | 'Em Tratamento'
  | 'Alta'
  | 'Óbito'
  | 'Eutanásia'
  | 'Fugiu'
  | 'Encerrado Negativo'
  | 'Descartado'
  | 'Duplicidade';

export type ClassificacaoCaso = 
  | 'Positivo'
  | 'Positivo CE' // Clínico-Epidemiológico
  | 'Negativo'
  | 'Negativo CE'
  | 'Indeterminado'
  | 'Aguardando Amostra'
  | 'Descartado';

export interface LimeSurveyAttachment {
  title?: string;
  comment?: string;
  size?: number;
  name: string;
  filename: string; // e.g. "fu_cka9s6waqsvd5h8"
  ext: string;
}

export interface CasoZoonoses {
  id: string; // "01/26", "14/26", etc.
  limesurveyResponseId?: number; // e.g. 4, 9, 10
  dataNotificacao: string; // "2026-01-12"
  agravo: AgravoType;
  boletim?: string;
  
  // Dados do Notificante (Veterinário / Clínica)
  veterinarioNome: string;
  veterinarioCrmv?: string;
  veterinarioClinica: string;
  veterinarioTelefone: string;
  veterinarioEmail?: string;
  
  // Dados do Tutor / Proprietário
  tutorNome: string;
  tutorCpf?: string;
  tutorTelefone: string;
  tutorEndereco: string;
  tutorNumero?: string;
  tutorComplemento?: string;
  tutorBairro: string;
  tutorMunicipio: string;
  
  // Dados do Animal
  animalNome: string;
  especie: 'Canina' | 'Felina' | 'Morcego' | 'Outro';
  raca: string;
  idade?: string;
  sexo: 'Macho' | 'Fêmea' | 'Não sei informar';
  castrado?: 'Sim' | 'Não' | 'Não sei informar';
  moradiaTipo?: string; // Casa, Apartamento, Comércio, Sítio, etc.
  moradiaAcesso?: string; // SAR (Sem acesso), CAR (Com acesso), Comunitário, Errante, Colônia
  
  // Sinais Clínicos
  sintomasDescricao: string;
  temLesaoPele?: 'Sim' | 'Não' | 'Não sei informar';
  distribuicaoLesoes?: 'Única' | 'Múltipla (até 5)' | 'Disseminada (acima de 5)' | 'Sem lesão aparente' | string;
  locaisPredominantes?: string[]; // Cabeça, Nariz, Boca, Corpo, Membros, etc.
  dataInicioSintomas?: string;
  
  // Sinais específicos LVC (1 a 11)
  sinaisCodigosLvc?: string; // "1; 2; 6; 7"
  
  // Sorovares Leptospirose (se aplicável)
  sorovarLepto?: string; // "Icterohaemorrhagiae 400; Copenhageni 800"
  
  // Anexos do LimeSurvey (JSON parsed)
  anexosBrutos?: string;
  anexos?: LimeSurveyAttachment[];
  
  // --- CAMPOS DE INVESTIGAÇÃO DO BIÓLOGO / ZOONOSES ---
  lpiEndereco?: string; // Local Provável de Infecção
  lpiTipo?: 'AUT' | 'IMP' | 'IND' | 'N/A' | string; // Autóctone, Importado, Indeterminado
  
  coletaRealizada?: 'Sim' | 'Não' | 'Óbito sem coleta';
  veterinarioColeta?: string;
  dataColeta?: string;
  
  exameDiagnostico?: string;
  laboratorio?: string;
  analistaNome?: string; // e.g. "Juliana Dias Mome Taver", "Bruna Paola Manetta"
  analistaRegistro?: string; // e.g. "CRBio 33514/01-D", "CRMV 20679"
  dataAnalise?: string;
  laudoObservacao?: string;
  
  resultadoFinal: ClassificacaoCaso;
  statusInvestigacao: StatusInvestigacao;
  
  // Vigilância Epidemiológica & Contato Humano
  pessoasComLesoes?: 'Sim' | 'Não' | 'Não sei informar';
  detalhesCasoHumano?: string; // "Sra. Elaine encaminhada para UBS Vila Angélica em 10/02/26"
  notificadoVE?: boolean; // Vigilância Epidemiológica de Sorocaba acionada
  dataNotificacaoVE?: string;
  
  // Conduta / Tratamento Animal
  tratamentoIniciado?: 'Sim' | 'Não';
  tratamentoMedicamento?: string; // "Itraconazol 100mg + IP 35mg"
  tratamentoDataInicio?: string;
  dataObito?: string;
  dataEutanasia?: string;
  dataAlta?: string;
  
  // Outros animais contactantes
  outrosAnimaisResidencia?: 'Sim' | 'Não' | 'Não sei informar';
  animaisContactantesDesc?: string;
  
  // REDCap & Observações Técnicas
  redCapId?: string; // e.g. "FHWPCT7W", "WN4C4PWC"
  sincronizadoRedCap?: boolean;
  observacoesTecnicas: string;
  
  // Metadados de Auditoria LGPD
  ultimaAtualizacaoPor?: string;
  dataUltimaAtualizacao?: string;
}

export interface BairroStats {
  bairro: string;
  totalCasos: number;
  positivos: number;
  casosHumanos: number;
  nivelRisco: 'Alto' | 'Médio' | 'Baixo';
  agravos: {
    Esporotricose: number;
    Leishmaniose: number;
    Leptospirose: number;
    Raiva: number;
  };
}

export interface FiltrosCasos {
  agravo?: AgravoType | 'Todos';
  status?: StatusInvestigacao | 'Todos';
  resultado?: ClassificacaoCaso | 'Todos';
  bairro?: string;
  clinica?: string;
  apenasComLesaoHumana?: boolean;
  apenasPendentes?: boolean;
  buscaTexto?: string;
  dataInicio?: string;
  dataFim?: string;
}
