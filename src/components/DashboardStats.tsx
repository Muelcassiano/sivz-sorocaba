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
  onSelectAgravo: (agravo: AgravoType) => void;
  onFilterHumanLesions: () => void;
  onFilterPending: () => void;
  onFilterActiveTreatment: () => void;
  isDarkMode?: boolean;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({
  casos,
  onSelectAgravo,
  onFilterHumanLesions,
  onFilterPending,
  onFilterActiveTreatment,
  isDarkMode = false,
}) => {
  const totalCasos = casos.length;
  const positivos = casos.filter(c => c.resultadoFinal === 'Positivo' || c.resultadoFinal === 'Positivo CE').length;
  const taxaPositividade = totalCasos > 0 ? Math.round((positivos / totalCasos) * 100) : 0;
  
  const casosHumanos = casos.filter(c => c.pessoasComLesoes === 'Sim');
  const casosHumanosSemVE = casosHumanos.filter(c => !c.notificadoVE).length;
  
  const emTratamento = casos.filter(c => c.statusInvestigacao === 'Em Tratamento').length;
  const emInvestigacao = casos.filter(c => c.statusInvestigacao === 'Em Investigação').length;
  const obitosEutanasia = casos.filter(c => c.statusInvestigacao === 'Óbito' || c.statusInvestigacao === 'Eutanásia').length;
  const altas = casos.filter(c => c.statusInvestigacao === 'Alta').length;

  const countEspo = casos.filter(c => c.agravo === 'Esporotricose').length;
  const countLeish = casos.filter(c => c.agravo === 'Leishmaniose').length;
  const countLepto = casos.filter(c => c.agravo === 'Leptospirose').length;
  const countRaiva = casos.filter(c => c.agravo === 'Raiva').length;

  return (
    <div className="space-y-6">
      {/* Primary KPI Grid (Reflecting the true total 582 records) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Geral */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Total de Fichas (2026)</span>
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {totalCasos}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">registros consolidados</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{positivos} confirmados</span>
            <span aria-hidden="true">·</span>
            <span>{taxaPositividade}% positividade</span>
          </div>
        </div>

        {/* Card 2: Contactantes com Lesões */}
        <div 
          onClick={onFilterHumanLesions}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 text-xs font-medium">
            <span className="flex items-center gap-1">
              <span>Contactantes com Lesão</span>
            </span>
            <Users className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {casosHumanos.length}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">tutores informados</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Investigação Zoosanitária</span>
            <span aria-hidden="true">·</span>
            <span className="group-hover:underline font-semibold text-emerald-700 dark:text-emerald-400">Filtrar</span>
          </div>
        </div>

        {/* Card 3: Em Tratamento Ativo */}
        <div 
          onClick={onFilterActiveTreatment}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Em Tratamento Ativo</span>
            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {emTratamento}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">animais assistidos</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Itraconazol / Scalibor</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">{altas} altas curadas</span>
          </div>
        </div>

        {/* Card 4: Pendentes de Investigação */}
        <div 
          onClick={onFilterPending}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-lg hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-medium">
            <span>Em Investigação</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 font-mono tabular-nums">
              {emInvestigacao}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">aguardando biólogo/laudo</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-t border-slate-100 dark:border-slate-800 pt-2">
            <span>Coleta / Citologia / ELISA</span>
            <span aria-hidden="true">·</span>
            <span>{obitosEutanasia} óbitos/eutanásias</span>
          </div>
        </div>
      </div>

      {/* Diagrama de Controle / Canal Endêmico - Curvas Epidemiológicas */}
      <EndemicChannelChart casos={casos} isDarkMode={isDarkMode} />

      {/* Disease Distribution Segmented Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Distribuição por Agravo Notificado no Município de Sorocaba (Total: 582)
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">Clique para filtrar tabela</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Esporotricose */}
          <div 
            onClick={() => onSelectAgravo('Esporotricose')}
            className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 dark:hover:border-orange-500 rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                Esporotricose Animal
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-orange-50 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 rounded border border-orange-200 dark:border-orange-800">
                {countEspo} fichas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Predomínio felino. Lesões ulceradas em face, focinho e patas. Transmissão zoonótica ativa.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casos.filter(c => c.agravo === 'Esporotricose' && c.resultadoFinal.startsWith('Pos')).length} confirmados</span>
              <span aria-hidden="true">·</span>
              <span className="text-rose-600 dark:text-rose-400 font-semibold">{casos.filter(c => c.agravo === 'Esporotricose' && c.pessoasComLesoes === 'Sim').length} c/ lesão humana</span>
            </div>
          </div>

          {/* Leishmaniose */}
          <div 
            onClick={() => onSelectAgravo('Leishmaniose')}
            className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                Leishmaniose Visceral Canina
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 rounded border border-purple-200 dark:border-purple-800">
                {countLeish} fichas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Vetor Lutzomyia longipalpis. Triagem TR DPP e confirmação ELISA/IAL com inquérito censitário.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casos.filter(c => c.agravo === 'Leishmaniose' && c.resultadoFinal === 'Positivo').length} reagentes</span>
              <span aria-hidden="true">·</span>
              <span>Encoleiramento Scalibor</span>
            </div>
          </div>

          {/* Leptospirose */}
          <div 
            onClick={() => onSelectAgravo('Leptospirose')}
            className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400">
                Leptospirose Animal
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 rounded border border-sky-200 dark:border-sky-800">
                {countLepto} fichas
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              Bactéria Leptospira interrogans. Exame MAT com identificação de sorovares de roedores.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <span>{casos.filter(c => c.agravo === 'Leptospirose' && c.resultadoFinal === 'Positivo').length} reagentes</span>
              <span aria-hidden="true">·</span>
              <span>Desratização focal</span>
            </div>
          </div>

          {/* Raiva */}
          <div 
            onClick={() => onSelectAgravo('Raiva')}
            className="p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500 rounded-lg cursor-pointer transition-all hover:shadow-xs group shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                Vigilância da Raiva
              </span>
              <span className="text-[11px] font-mono tabular-nums font-semibold px-2 py-0.5 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 rounded border border-rose-200 dark:border-rose-800">
                {countRaiva} fichas
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
