import React, { useState, useMemo } from 'react';
import { CasoZoonoses, AgravoType, StatusInvestigacao, FiltrosCasos } from '../types/zoonoses';
import { Search, Filter, ShieldAlert, Paperclip, ChevronRight, FileText, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

interface CaseTableProps {
  casos: CasoZoonoses[];
  onOpenCase: (caso: CasoZoonoses) => void;
  filtros: FiltrosCasos;
  setFiltros: React.Dispatch<React.SetStateAction<FiltrosCasos>>;
}

export const CaseTable: React.FC<CaseTableProps> = ({
  casos,
  onOpenCase,
  filtros,
  setFiltros,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;

  // Unique bairros for filtering
  const bairros = useMemo(() => {
    const set = new Set<string>();
    casos.forEach(c => {
      if (c.tutorBairro && c.tutorBairro.trim()) {
        set.add(c.tutorBairro.trim());
      }
    });
    return Array.from(set).sort();
  }, [casos]);

  // Unique clinics
  const clinicas = useMemo(() => {
    const set = new Set<string>();
    casos.forEach(c => {
      if (c.veterinarioClinica && c.veterinarioClinica.trim()) {
        set.add(c.veterinarioClinica.trim());
      }
    });
    return Array.from(set).sort();
  }, [casos]);

  // Filtered dataset
  const filteredCasos = useMemo(() => {
    return casos.filter(caso => {
      // Agravo filter
      if (filtros.agravo && filtros.agravo !== 'Todos' && caso.agravo !== filtros.agravo) {
        return false;
      }
      // Status filter
      if (filtros.status && filtros.status !== 'Todos' && caso.statusInvestigacao !== filtros.status) {
        return false;
      }
      // Bairro filter
      if (filtros.bairro && filtros.bairro !== 'Todos' && caso.tutorBairro !== filtros.bairro) {
        return false;
      }
      // Clinica filter
      if (filtros.clinica && filtros.clinica !== 'Todos' && caso.veterinarioClinica !== filtros.clinica) {
        return false;
      }
      // Human lesion filter
      if (filtros.apenasComLesaoHumana && caso.pessoasComLesoes !== 'Sim') {
        return false;
      }
      // Pending investigation
      if (filtros.apenasPendentes && caso.statusInvestigacao !== 'Em Investigação') {
        return false;
      }
      // Search text
      if (filtros.buscaTexto && filtros.buscaTexto.trim()) {
        const query = filtros.buscaTexto.toLowerCase();
        const matchId = caso.id.toLowerCase().includes(query);
        const matchAnimal = caso.animalNome.toLowerCase().includes(query);
        const matchTutor = caso.tutorNome.toLowerCase().includes(query);
        const matchBairro = caso.tutorBairro.toLowerCase().includes(query);
        const matchVet = caso.veterinarioNome.toLowerCase().includes(query);
        const matchRedCap = caso.redCapId?.toLowerCase().includes(query);
        if (!matchId && !matchAnimal && !matchTutor && !matchBairro && !matchVet && !matchRedCap) {
          return false;
        }
      }
      return true;
    });
  }, [casos, filtros]);

  // Pagination
  const totalPages = Math.ceil(filteredCasos.length / rowsPerPage) || 1;
  const paginatedCasos = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredCasos.slice(start, start + rowsPerPage);
  }, [filteredCasos, currentPage]);

  const handleAgravoChange = (agravo: AgravoType | 'Todos') => {
    setFiltros(prev => ({ ...prev, agravo }));
    setCurrentPage(1);
  };

  const handleStatusChange = (status: StatusInvestigacao | 'Todos') => {
    setFiltros(prev => ({ ...prev, status }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-xs">
      {/* Top Filter & Search Controls */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
        {/* Row 1: Search and Primary segmented tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar por ID, Animal, Tutor, Bairro, Veterinário, REDCap..."
              value={filtros.buscaTexto || ''}
              onChange={e => {
                setFiltros(prev => ({ ...prev, buscaTexto: e.target.value }));
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white dark:focus:bg-slate-800 transition-all"
            />
          </div>

          {/* Agravo Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto text-xs">
            {(['Todos', 'Esporotricose', 'Leishmaniose', 'Leptospirose', 'Raiva'] as const).map(ag => (
              <button
                key={ag}
                onClick={() => handleAgravoChange(ag)}
                className={`px-3 py-1 rounded font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  (filtros.agravo === ag || (!filtros.agravo && ag === 'Todos'))
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {ag}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Secondary Dropdowns and Toggles */}
        <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
          {/* Status selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Status:</span>
            <select
              value={filtros.status || 'Todos'}
              onChange={e => handleStatusChange(e.target.value as any)}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 cursor-pointer"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Em Investigação">Em Investigação</option>
              <option value="Em Tratamento">Em Tratamento</option>
              <option value="Alta">Alta</option>
              <option value="Óbito">Óbito</option>
              <option value="Eutanásia">Eutanásia</option>
              <option value="Fugiu">Fugiu</option>
              <option value="Encerrado Negativo">Encerrado Negativo</option>
              <option value="Descartado">Descartado</option>
            </select>
          </div>

          {/* Bairro selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Bairro:</span>
            <select
              value={filtros.bairro || 'Todos'}
              onChange={e => {
                setFiltros(prev => ({ ...prev, bairro: e.target.value }));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 max-w-[180px] truncate cursor-pointer"
            >
              <option value="Todos">Todos os Bairros ({bairros.length})</option>
              {bairros.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Clinica selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Clínica:</span>
            <select
              value={filtros.clinica || 'Todos'}
              onChange={e => {
                setFiltros(prev => ({ ...prev, clinica: e.target.value }));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-700 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-600 max-w-[200px] truncate cursor-pointer"
            >
              <option value="Todos">Todas as Clínicas ({clinicas.length})</option>
              {clinicas.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Toggle: Apenas Casos Humanos */}
          <button
            onClick={() => {
              setFiltros(prev => ({ ...prev, apenasComLesaoHumana: !prev.apenasComLesaoHumana }));
              setCurrentPage(1);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
              filtros.apenasComLesaoHumana
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 font-semibold'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>Alerta VE (Lesão Humana)</span>
          </button>

          {/* Reset Filters */}
          {(filtros.agravo !== 'Todos' || filtros.status !== 'Todos' || filtros.bairro !== 'Todos' || filtros.clinica !== 'Todos' || filtros.apenasComLesaoHumana || filtros.buscaTexto) && (
            <button
              onClick={() => {
                setFiltros({
                  agravo: 'Todos',
                  status: 'Todos',
                  resultado: 'Todos',
                  bairro: 'Todos',
                  clinica: 'Todos',
                  apenasComLesaoHumana: false,
                  buscaTexto: ''
                });
                setCurrentPage(1);
              }}
              className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 underline ml-auto cursor-pointer"
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* High-density Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              <th className="py-2.5 px-3 whitespace-nowrap">ID / Data</th>
              <th className="py-2.5 px-3 whitespace-nowrap">Agravo</th>
              <th className="py-2.5 px-3">Animal & Espécie</th>
              <th className="py-2.5 px-3">Tutor / Bairro Sorocaba</th>
              <th className="py-2.5 px-3">Clínica Notificante</th>
              <th className="py-2.5 px-3">Diagnóstico / Lab</th>
              <th className="py-2.5 px-3">Resultado</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
            {paginatedCasos.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-slate-400">
                  Nenhuma notificação encontrada com os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedCasos.map(caso => {
                const temAnexos = caso.anexos && caso.anexos.length > 0;
                const temCasoHumano = caso.pessoasComLesoes === 'Sim';

                return (
                  <tr
                    key={caso.id}
                    onClick={() => onOpenCase(caso)}
                    className={`transition-colors cursor-pointer group border-b border-slate-100 dark:border-slate-800 ${
                      temCasoHumano
                        ? 'bg-rose-50/30 hover:bg-rose-50/70 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 border-l-4 border-l-rose-500'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/60 border-l-4 border-l-transparent'
                    }`}
                  >
                    {/* ID / Data */}
                    <td className="py-2.5 px-3 whitespace-nowrap font-mono tabular-nums text-slate-900 dark:text-slate-100 font-semibold">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-900 dark:text-slate-100">{caso.id}</span>
                        {temAnexos && (
                          <span title={`${caso.anexos?.length} anexo(s) LimeSurvey`}>
                            <Paperclip className="w-3 h-3 text-slate-400" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                        {caso.dataNotificacao}
                      </div>
                    </td>

                    {/* Agravo */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border shadow-2xs ${
                          caso.agravo === 'Esporotricose'
                            ? 'bg-orange-100 dark:bg-orange-950/80 text-orange-900 dark:text-orange-200 border-orange-300 dark:border-orange-800'
                            : caso.agravo === 'Leishmaniose'
                            ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800'
                            : caso.agravo === 'Leptospirose'
                            ? 'bg-sky-100 dark:bg-sky-950/80 text-sky-900 dark:text-sky-200 border-sky-300 dark:border-sky-800'
                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                        }`}>
                          {caso.agravo}
                        </span>
                        {temCasoHumano && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 animate-pulse">
                            <ShieldAlert className="w-3 h-3 text-rose-600" />
                            <span>Alerta VE</span>
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Animal */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">
                        {caso.animalNome}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{caso.especie}</span> · {caso.raca || 'SRD'} {caso.idade ? `· ${caso.idade}` : ''}
                      </div>
                    </td>

                    {/* Tutor / Bairro */}
                    <td className="py-2.5 px-3">
                      <div className="text-slate-900 dark:text-slate-100 font-medium truncate max-w-[180px]">
                        {caso.tutorNome}
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                        {caso.tutorBairro}
                      </div>
                    </td>

                    {/* Clínica */}
                    <td className="py-2.5 px-3">
                      <div className="text-slate-800 dark:text-slate-200 font-medium truncate max-w-[180px]" title={caso.veterinarioClinica}>
                        {caso.veterinarioClinica}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[180px]">
                        {caso.veterinarioNome}
                      </div>
                    </td>

                    {/* Diagnóstico / Lab */}
                    <td className="py-2.5 px-3 whitespace-nowrap text-[11px]">
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">
                        {caso.exameDiagnostico || 'Sem Coleta'}
                      </span>
                      {caso.laboratorio && (
                        <span className="text-slate-500 dark:text-slate-400 ml-1">/ {caso.laboratorio}</span>
                      )}
                    </td>

                    {/* Resultado */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${
                        caso.resultadoFinal.startsWith('Pos')
                          ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-800'
                          : caso.resultadoFinal.startsWith('Neg')
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                      }`}>
                        {caso.resultadoFinal}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${
                        caso.statusInvestigacao === 'Em Tratamento'
                          ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-800'
                          : caso.statusInvestigacao === 'Alta'
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800 font-bold'
                          : caso.statusInvestigacao === 'Em Investigação'
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-800'
                          : caso.statusInvestigacao === 'Óbito' || caso.statusInvestigacao === 'Eutanásia'
                          ? 'bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-800'
                          : caso.statusInvestigacao === 'Fugiu'
                          ? 'bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}>
                        {caso.statusInvestigacao}
                      </span>
                      {caso.redCapId && caso.redCapId !== 'N/A' && (
                        <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                          REDCap: {caso.redCapId}
                        </div>
                      )}
                    </td>

                    {/* Ação */}
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenCase(caso);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition-all cursor-pointer shadow-2xs"
                      >
                        <span>Investigar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <div>
          Exibindo <span className="font-semibold text-slate-700 dark:text-slate-200">{filteredCasos.length}</span> notificações filtradas
          {filtros.buscaTexto && ` para "${filtros.buscaTexto}"`}
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Anterior
          </button>
          <span className="font-mono tabular-nums">
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  );
};
