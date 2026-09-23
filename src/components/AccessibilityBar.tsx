import React from 'react';
import { Sun, Moon, Eye, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface AccessibilityBarProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  fontSize: 'normal' | 'large' | 'xlarge';
  onChangeFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  isHighContrast: boolean;
  onToggleHighContrast: () => void;
  onResetAccessibility: () => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  isDarkMode,
  onToggleDarkMode,
  fontSize,
  onChangeFontSize,
  isHighContrast,
  onToggleHighContrast,
  onResetAccessibility,
}) => {
  return (
    <aside 
      className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs py-1 px-4 text-slate-600 dark:text-slate-400"
      aria-label="Barra de Acessibilidade do Governo Municipal"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Skip Link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-emerald-700 focus:text-white rounded text-xs"
        >
          Ir para o conteúdo principal (Alt + 1)
        </a>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline font-medium text-[11px] text-slate-500">
            Acessibilidade e-MAG / WCAG:
          </span>

          {/* Font Size controls */}
          <div className="flex items-center gap-0.5 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 px-1 py-0.5" role="group" aria-label="Ajuste do tamanho da fonte">
            <button
              onClick={() => onChangeFontSize('normal')}
              className={`px-1.5 py-0.5 text-[11px] font-bold rounded cursor-pointer ${fontSize === 'normal' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
              title="Tamanho padrão de texto"
              aria-label="Tamanho de texto normal"
            >
              A
            </button>
            <button
              onClick={() => onChangeFontSize('large')}
              className={`px-1.5 py-0.5 text-xs font-bold rounded cursor-pointer ${fontSize === 'large' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
              title="Aumentar texto (+15%)"
              aria-label="Aumentar texto"
            >
              A+
            </button>
            <button
              onClick={() => onChangeFontSize('xlarge')}
              className={`px-1.5 py-0.5 text-sm font-bold rounded cursor-pointer ${fontSize === 'xlarge' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
              title="Aumentar texto máximo (+30%)"
              aria-label="Texto muito grande"
            >
              A++
            </button>
          </div>

          {/* High Contrast Mode */}
          <button
            onClick={onToggleHighContrast}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium transition-colors cursor-pointer ${
              isHighContrast
                ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
            title="Alternar modo de alto contraste para baixa visão"
            aria-pressed={isHighContrast}
          >
            <Eye className="w-3 h-3" />
            <span>Alto Contraste</span>
          </button>
        </div>

        {/* Right side: Light/Dark and Reset */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDarkMode}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-medium cursor-pointer transition-colors"
            title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
            aria-label={isDarkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-600" />
                <span>Modo Escuro</span>
              </>
            )}
          </button>

          {(fontSize !== 'normal' || isHighContrast) && (
            <button
              onClick={onResetAccessibility}
              className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer"
              title="Restaurar padrões de visualização"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Restaurar</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
