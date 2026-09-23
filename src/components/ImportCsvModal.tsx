import React, { useState } from 'react';
import { CasoZoonoses } from '../types/zoonoses';
import { parseLimeSurveyCsvLine } from '../services/storage';
import { UploadCloud, CheckCircle2, AlertCircle, X, FileSpreadsheet } from 'lucide-react';

interface ImportCsvModalProps {
  onClose: () => void;
  onImport: (novosCasos: CasoZoonoses[]) => void;
}

export const ImportCsvModal: React.FC<ImportCsvModalProps> = ({ onClose, onImport }) => {
  const [csvContent, setCsvContent] = useState('');
  const [parsedCases, setParsedCases] = useState<CasoZoonoses[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setCsvContent(text);
      processCsvText(text);
    };
    reader.readAsText(file, 'utf-8');
  };

  const processCsvText = (text: string) => {
    try {
      const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
      if (lines.length < 2) {
        setErrorMsg('O arquivo CSV deve conter cabeçalho e pelo menos uma linha de dados.');
        return;
      }

      const headers = lines[0].split(/[,\t]/).map(h => h.trim().replace(/^["']|["']$/g, ''));
      const cases: CasoZoonoses[] = [];

      for (let i = 1; i < lines.length; i++) {
        const item = parseLimeSurveyCsvLine(lines[i], headers);
        if (item && item.id) {
          cases.push(item as CasoZoonoses);
        }
      }

      if (cases.length === 0) {
        setErrorMsg('Nenhuma ficha válida identificada. Verifique se o formato do LimeSurvey possui colunas padrão.');
      } else {
        setParsedCases(cases);
        setSuccessCount(cases.length);
      }
    } catch (err: any) {
      setErrorMsg(`Erro ao processar CSV: ${err.message}`);
    }
  };

  const handleConfirmImport = () => {
    if (parsedCases.length > 0) {
      onImport(parsedCases);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Importar Lote LimeSurvey (CSV / TSV)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300">
          <p className="leading-relaxed">
            Selecione o arquivo CSV exportado do servidor oficial de LimeSurvey da Prefeitura de Sorocaba (<code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-emerald-700 dark:text-emerald-400">survey.sorocaba.sp.gov.br</code>).
          </p>

          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors">
            <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <label className="block cursor-pointer">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                Clique para selecionar o arquivo .CSV do seu computador
              </span>
              <input
                type="file"
                accept=".csv,.txt,.tsv"
                onChange={handleFileUpload}
                className="sr-only"
              />
            </label>
            <p className="text-[11px] text-slate-400 mt-1">
              Compatível com exportações UTF-8 separadas por vírgula ou tabulação.
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 p-3 rounded text-rose-700 dark:text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successCount !== null && (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-3 rounded text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                <strong>{successCount}</strong> notificações prontas para serem mescladas à base de dados.
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-end gap-2 text-xs">
          <button
            onClick={onClose}
            className="px-3 py-1.5 border border-slate-300 dark:border-slate-700 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            disabled={parsedCases.length === 0}
            onClick={handleConfirmImport}
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          >
            Confirmar Importação ({parsedCases.length})
          </button>
        </div>
      </div>
    </div>
  );
};
