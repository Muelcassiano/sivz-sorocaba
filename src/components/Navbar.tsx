import React, { useState } from 'react';
import { 
  Download, 
  Settings, 
  PlusCircle, 
  Layers, 
  ShieldCheck, 
  FileCode, 
  ChevronDown, 
  AlertCircle,
  Database,
  UploadCloud
} from 'lucide-react';
import { LogoPrefeituraSorocaba, LogoZoonoses } from './Logos';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNewNotification: () => void;
  onExportRedCap: () => void;
  onImportCsv: () => void;
  totalAlertsCount: number;
  totalHumanLesionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewNotification,
  onExportRedCap,
  onImportCsv,
  totalAlertsCount,
  totalHumanLesionsCount,
}) => {
  const [showTechMenu, setShowTechMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Official Municipal Logos & Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="flex items-center gap-3 text-left group cursor-pointer focus-visible:outline-none"
              aria-label="Página Inicial SIVZ Sorocaba"
            >
              <div className="text-slate-900 dark:text-slate-100 flex items-center gap-2.5">
                <LogoPrefeituraSorocaba className="h-10 w-auto" />
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <LogoZoonoses className="h-10 w-auto hidden sm:block" />
              </div>

              <div className="hidden lg:block border-l border-slate-200 dark:border-slate-700 pl-3">
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 tracking-tight block">
                  SIVZ · Sorocaba
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block">
                  Sistema de Investigação de Zoonoses
                </span>
              </div>
            </button>
          </div>

          {/* Biologists Direct Operational Navigation (Clear & Streamlined) */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300" aria-label="Menu Principal">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`pb-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'dashboard'
                  ? 'border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300'
              }`}
            >
              Painel Geral
            </button>

            <button
              onClick={() => setActiveTab('investigacoes')}
              className={`pb-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'investigacoes'
                  ? 'border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300'
              }`}
            >
              <span>Fichas de Investigação</span>
              <span className="text-[10px] font-mono tabular-nums bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-1.5 py-0.2 rounded font-semibold border border-slate-200 dark:border-slate-700">
                582
              </span>
            </button>

            <button
              onClick={() => setActiveTab('mapa')}
              className={`pb-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'mapa'
                  ? 'border-emerald-600 dark:border-emerald-500 text-emerald-800 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:border-slate-300'
              }`}
            >
              Mapa de Focos & UBS
            </button>

            <button
              onClick={() => setActiveTab('alertas-ve')}
              className={`pb-1 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
                activeTab === 'alertas-ve'
                  ? 'border-rose-600 dark:border-rose-500 text-rose-700 dark:text-rose-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-rose-600 hover:border-rose-300'
              }`}
            >
              <span>Alertas & VE</span>
              {totalHumanLesionsCount > 0 && (
                <span className="text-[10px] font-mono tabular-nums bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-1.5 py-0.2 rounded font-bold border border-rose-200 dark:border-rose-800">
                  {totalHumanLesionsCount}
                </span>
              )}
            </button>
          </nav>

          {/* Action Zone: REDCap Export, CSV Ingestion, and Specialized Area Dropdown */}
          <div className="flex items-center gap-2">
            {/* REDCap Export (Key user requirement) */}
            <button
              onClick={onExportRedCap}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 rounded transition-colors whitespace-nowrap shadow-xs cursor-pointer"
              title="Exportar base consolidada de 2026 para o projeto REDCap"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Exportar REDCap</span>
            </button>

            {/* Import CSV from LimeSurvey */}
            <button
              onClick={onImportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded border border-slate-300 dark:border-slate-700 transition-colors whitespace-nowrap cursor-pointer"
              title="Sincronizar dados exportados dos servidores municipais do LimeSurvey"
            >
              <UploadCloud className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
              <span>Importar Lote</span>
            </button>

            {/* Specialized Area Dropdown (Decoder, LGPD, Contingency) */}
            <div className="relative">
              <button
                onClick={() => setShowTechMenu(!showTechMenu)}
                className="inline-flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded transition-colors cursor-pointer"
                title="Área Técnica Especializada"
                aria-expanded={showTechMenu}
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden xl:inline">Área Técnica</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showTechMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowTechMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Ferramentas Avançadas
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('decoder');
                        setShowTechMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <FileCode className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-medium">Auditoria de Anexos (Decoder)</div>
                        <div className="text-[10px] text-slate-400">Descompactador JSON do LimeSurvey</div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('integracao');
                        setShowTechMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-slate-700 dark:text-slate-200 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <div>
                        <div className="font-medium">Arquitetura & Conformidade LGPD</div>
                        <div className="text-[10px] text-slate-400">Políticas da Controladoria Municipal</div>
                      </div>
                    </button>

                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

                    <button
                      onClick={() => {
                        onNewNotification();
                        setShowTechMenu(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2.5 text-amber-700 dark:text-amber-400 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-medium">Inserção Manual Excepcional</div>
                        <div className="text-[10px] text-slate-400">Contingência para divergência/correção</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-between overflow-x-auto px-4 py-2.5 border-t border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-900 gap-4">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`whitespace-nowrap py-1 ${activeTab === 'dashboard' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Painel Geral
        </button>
        <button
          onClick={() => setActiveTab('investigacoes')}
          className={`whitespace-nowrap py-1 ${activeTab === 'investigacoes' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Fichas (582)
        </button>
        <button
          onClick={() => setActiveTab('mapa')}
          className={`whitespace-nowrap py-1 ${activeTab === 'mapa' ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Mapa de Focos
        </button>
        <button
          onClick={() => setActiveTab('alertas-ve')}
          className={`whitespace-nowrap py-1 ${activeTab === 'alertas-ve' ? 'text-rose-700 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Alertas VE ({totalHumanLesionsCount})
        </button>
      </div>
    </header>
  );
};
