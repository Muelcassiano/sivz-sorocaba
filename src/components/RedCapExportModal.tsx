import React, { useState } from 'react';
import { CasoZoonoses } from '../types/zoonoses';
import { X, Download, Copy, Check, FileSpreadsheet, Database, ShieldCheck } from 'lucide-react';

interface RedCapExportModalProps {
  casos: CasoZoonoses[];
  onClose: () => void;
}

export const RedCapExportModal: React.FC<RedCapExportModalProps> = ({ casos, onClose }) => {
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);

  // Filter only cases with a REDCap ID or generate them
  const redCapRecords = casos.map(c => ({
    record_id: c.redCapId && c.redCapId !== 'N/A' ? c.redCapId : `ZOO_${c.id.replace('/', '_')}`,
    redcap_event_name: 'notificacao_arm_1',
    numero_notificacao: c.id,
    data_notificacao: c.dataNotificacao,
    tipo_agravo: c.agravo,
    boletim_ccz: c.boletim || '',
    vet_notificante: c.veterinarioNome,
    vet_crmv: c.veterinarioCrmv || '',
    clinica_estabelecimento: c.veterinarioClinica,
    tutor_nome: c.tutorNome,
    tutor_bairro: c.tutorBairro,
    tutor_municipio: c.tutorMunicipio,
    animal_nome: c.animalNome,
    animal_especie: c.especie,
    animal_raca: c.raca,
    exame_diagnostico: c.exameDiagnostico || 'Clínico',
    laboratorio: c.laboratorio || 'DZ',
    resultado_final: c.resultadoFinal,
    status_caso: c.statusInvestigacao,
    pessoas_lesoes: c.pessoasComLesoes === 'Sim' ? '1' : '0',
    ve_notificada: c.notificadoVE ? '1' : '0',
    tratamento_medicamento: c.tratamentoMedicamento || '',
    observacoes: c.observacoesTecnicas?.replace(/[\r\n]+/g, ' ') || ''
  }));

  // Build CSV
  const csvHeaders = [
    'record_id',
    'redcap_event_name',
    'numero_notificacao',
    'data_notificacao',
    'tipo_agravo',
    'boletim_ccz',
    'vet_notificante',
    'vet_crmv',
    'clinica_estabelecimento',
    'tutor_nome',
    'tutor_bairro',
    'tutor_municipio',
    'animal_nome',
    'animal_especie',
    'animal_raca',
    'exame_diagnostico',
    'laboratorio',
    'resultado_final',
    'status_caso',
    'pessoas_lesoes',
    've_notificada',
    'tratamento_medicamento',
    'observacoes'
  ];

  const csvRows = redCapRecords.map(r => 
    csvHeaders.map(h => `"${(r as any)[h] || ''}"`).join(',')
  );

  const csvContent = [csvHeaders.join(','), ...csvRows].join('\n');

  const downloadCsv = () => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zoonoses_sorocaba_redcap_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <Database className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Exportador & Automação REDCap (Zoonoses Sorocaba)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Gere o arquivo CSV formatado para importação direta ou acione a API do REDCap.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 flex items-center justify-between">
            <div>
              <strong>Base pronta para integração:</strong> {redCapRecords.length} registros estruturados com códigos e campos compatíveis com os instrumentos do REDCap.
            </div>
            <button
              onClick={downloadCsv}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0 ml-3"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Arquivo CSV</span>
            </button>
          </div>

          {/* Table Preview */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 px-3 py-2 border-b border-slate-200 font-semibold text-slate-800 flex items-center justify-between">
              <span>Prévia dos Primeiros 5 Registros Formatados:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(csvContent);
                  setCopiedCsv(true);
                  setTimeout(() => setCopiedCsv(false), 2000);
                }}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedCsv ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCsv ? 'CSV Copiado' : 'Copiar CSV'}</span>
              </button>
            </div>

            <div className="overflow-x-auto max-h-56">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 text-slate-500 font-mono">
                  <tr>
                    <th className="p-2">record_id</th>
                    <th className="p-2">numero_notificacao</th>
                    <th className="p-2">tipo_agravo</th>
                    <th className="p-2">tutor_nome</th>
                    <th className="p-2">tutor_bairro</th>
                    <th className="p-2">resultado_final</th>
                    <th className="p-2">status_caso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                  {redCapRecords.slice(0, 5).map(r => (
                    <tr key={r.record_id} className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-emerald-800">{r.record_id}</td>
                      <td className="p-2">{r.numero_notificacao}</td>
                      <td className="p-2">{r.tipo_agravo}</td>
                      <td className="p-2 truncate max-w-[140px]">{r.tutor_nome}</td>
                      <td className="p-2">{r.tutor_bairro}</td>
                      <td className="p-2">{r.resultado_final}</td>
                      <td className="p-2">{r.status_caso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* API payload instructions */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <strong className="text-slate-800">Payload JSON para chamada direta via API REDCap:</strong>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(redCapRecords.slice(0, 5), null, 2));
                  setCopiedJson(true);
                  setTimeout(() => setCopiedJson(false), 2000);
                }}
                className="text-xs text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
              >
                {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedJson ? 'Copiado!' : 'Copiar JSON'}</span>
              </button>
            </div>

            <pre className="bg-slate-900 text-slate-100 p-3 rounded-md font-mono text-[11px] overflow-x-auto max-h-40 leading-relaxed">
              {JSON.stringify(redCapRecords.slice(0, 2), null, 2)}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
