import React, { useState, useMemo } from 'react';
import { CasoZoonoses, AgravoType } from '../types/zoonoses';
import { 
  AlertTriangle, 
  Users, 
  Activity, 
  ShieldAlert, 
  ArrowUpRight, 
  Calendar, 
  TrendingUp, 
  Flame, 
  FileText,
  CheckCircle2
} from 'lucide-react';

import { EndemicChannelChart } from './EndemicChannelChart';

interface DashboardStatsProps {
  casos: CasoZoonoses[];
  selectedYear?: number;
  onSelectYear?: (year: number) => void;
  selectedAgravo?: AgravoType | 'Todos';
  onSelectAgravo: (agravo: AgravoType | 'Todos') => void;
  onFilterHumanLesions: () => void;
  onFilterPending: () => void;
  onFilterActiveTreatment: () => void;
  isDarkMode?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  casos,
  selectedYear = 2026,
  onSelectYear,
  selectedAgravo = 'Todos',
  onSelectAgravo,
  onFilterHumanLesions,
  onFilterPending,
  onFilterActiveTreatment,
  isDarkMode = false,
}) => {
  // Casos do ano selecionado
  const casosAno = useMemo(() => {
    return casos.filter(c => {
      if (!c.dataNotificacao) return false;
      return c.dataNotificacao.startsWith(String(selectedYear));
    });
  }, [casos, selectedYear]);

  // Casos filtrados por ano E por agravo selecionado
  const casosFiltrados = useMemo(() => {
    return casosAno.filter(c => {
      if (selectedAgravo !== 'Todos' && c.agravo !== selectedAgravo) return false;
      return true;
    });
  }, [casosAno, selectedAgravo]);

  const totalCasos = casosFiltrados.length;
  const positivos = casosFiltrados.filter(c => c.resultadoFinal === 'Positivo' || c.resultadoFinal === 'Positivo CE').length;
  const taxaPositividade = totalCasos > 0 ? Math.round((positivos / totalCasos) * 100) : 0;
  
  const casosHumanos = casosFiltrados.filter(c => c.pessoasComLesoes === 'Sim');
  const casosHumanosSemVE = casosHumanos.filter(c => !c.notificadoVE).length;
  
  const emTratamento = casosFiltrados.filter(c => c.statusInvestigacao === 'Em Tratamento').length;
  const emInvestigacao = casosFiltrados.filter(c => c.statusInvestigacao === 'Em Investigação').length;
  const obitosEutanasia = casosFiltrados.filter(c => c.statusInvestigacao === 'Óbito' || c.statusInvestigacao === 'Eutanásia').length;
  const altas = casosFiltrados.filter(c => c.statusInvestigacao === 'Alta').length;

  const countEspo = casosAno.filter(c => c.agravo === 'Esporotricose').length;
  const countLeish = casosAno.filter(c => c.agravo === 'Leishmaniose').length;
  const countLepto = casosAno.filter(c => c.agravo === 'Leptospirose').length;
  const countRaiva = casosAno.filter(c => c.agravo === 'Raiva').length;

  return (
    <div className="space-y-6">
      {/* Primary KPI Grid (Reflecting the true filtered dataset by year and agravo) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Geral */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-semibold gap-1">
            <span className="truncate">
              Total de Fichas ({selectedYear})
              {selectedAgravo !== 'Todos' && (
                <span className="ml-1 text-emerald-700 dark:text-emerald-400 font-bold">· {selectedAgravo}</span>
              )}
            </span>
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-950/80 rounded-md text-emerald-700 dark:text-emerald-400 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalCasos}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {totalCasos === 1 ? 'registro consolidado' : 'registros consolidados'}
            </span>
          </div>
          <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{positivos} confirmados</span>
            <span aria-hidden="true">·</span>
            <span>{taxaPositividade}% positividade</span>
          </div>
        </div>

        {/* Card 2: Lesões em Humanos / Alerta VE */}
        <div 
          onClick={onFilterHumanLesions}
          className="bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 p-4 rounded-lg hover:border-rose-400 dark:hover:border-rose-700 transition-colors cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-rose-800 dark:text-rose-300 text-xs font-bold">
            <span className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Lesões em Humanos / Alerta VE</span>
            </span>
            <div className="p-1.5 bg-rose-100 dark:bg-rose-900/80 rounded-md text-rose-700 dark:text-rose-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-rose-900 dark:text-rose-100 font-mono tabular-nums">
              {casosHumanos.length}
            </span>
            <span className="text-xs text-rose-700 dark:text-rose-400 font-semibold">fichas com alerta</span>
          </div>
          <div className="mt-3 text-[11px] text-rose-700 dark:text-rose-300 flex items-center gap-1.5 border-t border-rose-200 dark:border-rose-800/80 pt-2 font-medium">
            <span className="font-bold">{casosHumanosSemVE} aguardando envio</span>
            <span aria-hidden="true">·</span>
            <span className="group-hover:underline font-bold text-rose-900 dark:text-rose-200">Ver e Acionar VE →</span>
          </div>
        </div>

        {/* Card 3: Em Tratamento Ativo */}
        <div 
          onClick={onFilterActiveTreatment}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-blue-400 dark:hover:border-blue-700 transition-colors cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-semibold">
            <span>Em Tratamento Ativo</span>
            <div className="p-1.5 bg-blue-100 dark:bg-blue-950/80 rounded-md text-blue-700 dark:text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-blue-950 dark:text-blue-200 font-mono tabular-nums">
              {emTratamento}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">animais assistidos</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Itraconazol / Scalibor</span>
            <span aria-hidden="true">·</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">{altas} altas curadas</span>
          </div>
        </div>

        {/* Card 4: Pendentes de Investigação */}
        <div 
          onClick={onFilterPending}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-amber-400 dark:hover:border-amber-700 transition-colors cursor-pointer shadow-xs group"
        >
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-semibold">
            <span>Em Investigação</span>
            <div className="p-1.5 bg-amber-100 dark:bg-amber-950/80 rounded-md text-amber-700 dark:text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-amber-950 dark:text-amber-200 font-mono tabular-nums">
              {emInvestigacao}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">aguardando biólogo/laudo</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Coleta / Citologia / ELISA</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-purple-700 dark:text-purple-400">{obitosEutanasia} óbitos/eutanásias</span>
          </div>
        </div>
      </div>

      {/* Diagrama de Controle / Canal Endêmico - Curvas Epidemiológicas */}
      <EndemicChannelChart 
        casos={casos} 
        selectedYear={selectedYear}
        onSelectYear={onSelectYear}
        selectedAgravo={selectedAgravo}
        onSelectAgravo={onSelectAgravo}
        isDarkMode={isDarkMode} 
      />

      {/* Disease Distribution Segmented Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Distribuição por Agravo no Município de Sorocaba ({selectedYear})</span>
            <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
              Total: {casosAno.length}
            </span>
          </h2>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {selectedAgravo !== 'Todos' ? (
              <button 
                onClick={() => onSelectAgravo('Todos')}
                className="text-emerald-700 dark:text-emerald-400 font-semibold hover:underline cursor-pointer"
              >
                Limpar filtro ({selectedAgravo}) &times;
              </button>
            ) : (
              <span>Clique no card para filtrar todo o painel</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Esporotricose */}
          <div 
            onClick={() => onSelectAgravo(selectedAgravo === 'Esporotricose' ? 'Todos' : 'Esporotricose')}
            className={`p-3.5 bg-white dark:bg-slate-900 border rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs ${
              selectedAgravo === 'Esporotricose'
                ? 'border-orange-500 ring-2 ring-orange-400/40 bg-orange-50/20 dark:bg-orange-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Esporotricose Animal
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 rounded border border-orange-200 dark:border-orange-800">
                {countEspo} {countEspo === 1 ? 'ficha' : 'fichas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Predomínio felino. Lesões ulceradas em face, focinho e patas. Transmissão zoonótica ativa.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casosAno.filter(c => c.agravo === 'Esporotricose' && c.resultadoFinal.startsWith('Pos')).length} confirmados</span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">{casosAno.filter(c => c.agravo === 'Esporotricose' && c.pessoasComLesoes === 'Sim').length} c/ lesão humana</span>
            </div>
          </div>

          {/* Leishmaniose */}
          <div 
            onClick={() => onSelectAgravo(selectedAgravo === 'Leishmaniose' ? 'Todos' : 'Leishmaniose')}
            className={`p-3.5 bg-white dark:bg-slate-900 border rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs ${
              selectedAgravo === 'Leishmaniose'
                ? 'border-purple-500 ring-2 ring-purple-400/40 bg-purple-50/20 dark:bg-purple-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Leishmaniose Visceral Canina
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 rounded border border-purple-200 dark:border-purple-800">
                {countLeish} {countLeish === 1 ? 'ficha' : 'fichas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Vetor Lutzomyia longipalpis. Triagem TR DPP e confirmação ELISA/IAL com inquérito censitário.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casosAno.filter(c => c.agravo === 'Leishmaniose' && c.resultadoFinal === 'Positivo').length} reagentes</span>
              <span aria-hidden="true">·</span>
              <span>Encoleiramento Scalibor</span>
            </div>
          </div>

          {/* Leptospirose */}
          <div 
            onClick={() => onSelectAgravo(selectedAgravo === 'Leptospirose' ? 'Todos' : 'Leptospirose')}
            className={`p-3.5 bg-white dark:bg-slate-900 border rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs ${
              selectedAgravo === 'Leptospirose'
                ? 'border-sky-500 ring-2 ring-sky-400/40 bg-sky-50/20 dark:bg-sky-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                Leptospirose Animal
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 rounded border border-sky-200 dark:border-sky-800">
                {countLepto} {countLepto === 1 ? 'ficha' : 'fichas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Bactéria Leptospira interrogans. Exame MAT com identificação de sorovares de roedores.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casosAno.filter(c => c.agravo === 'Leptospirose' && c.resultadoFinal === 'Positivo').length} reagentes</span>
              <span aria-hidden="true">·</span>
              <span>Desratização focal</span>
            </div>
          </div>

          {/* Raiva */}
          <div 
            onClick={() => onSelectAgravo(selectedAgravo === 'Raiva' ? 'Todos' : 'Raiva')}
            className={`p-3.5 bg-white dark:bg-slate-900 border rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs ${
              selectedAgravo === 'Raiva'
                ? 'border-rose-500 ring-2 ring-rose-400/40 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-slate-200 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Vigilância da Raiva
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 rounded border border-rose-200 dark:border-rose-800">
                {countRaiva} {countRaiva === 1 ? 'ficha' : 'fichas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Coleta de quirópteros caídos e profilaxia de cães/gatos agressores. IFD no IAL.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>100% Sorocaba</span>
              <span aria-hidden="true">·</span>
              <span>Bloqueio vacinal preventivo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
