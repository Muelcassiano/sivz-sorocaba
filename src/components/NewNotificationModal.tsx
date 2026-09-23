import React, { useState } from 'react';
import { CasoZoonoses, AgravoType } from '../types/zoonoses';
import { X, PlusCircle, FileText, CheckCircle2 } from 'lucide-react';
import { parseLimeSurveyCsvLine } from '../services/storage';

interface NewNotificationModalProps {
  onClose: () => void;
  onSaveNew: (novoCaso: CasoZoonoses) => void;
}

export const NewNotificationModal: React.FC<NewNotificationModalProps> = ({ onClose, onSaveNew }) => {
  const [mode, setMode] = useState<'form' | 'csv'>('form');
  const [agravo, setAgravo] = useState<AgravoType>('Esporotricose');
  const [animalNome, setAnimalNome] = useState('');
  const [especie, setEspecie] = useState<'Felina' | 'Canina' | 'Morcego' | 'Outro'>('Felina');
  const [raca, setRaca] = useState('SRD');
  const [tutorNome, setTutorNome] = useState('');
  const [tutorCpf, setTutorCpf] = useState('');
  const [tutorTelefone, setTutorTelefone] = useState('');
  const [tutorBairro, setTutorBairro] = useState('Vila Barão');
  const [tutorEndereco, setTutorEndereco] = useState('');
  const [tutorNumero, setTutorNumero] = useState('');
  const [vetNome, setVetNome] = useState('Dr. Médico Veterinário Notificante');
  const [vetClinica, setVetClinica] = useState('Hospital Veterinário Público Cão Mayke');
  const [sintomas, setSintomas] = useState('Lesões ulceradas em plano nasal e orelhas');
  const [temLesaoHumana, setTemLesaoHumana] = useState(false);
  const [rawCsvInput, setRawCsvInput] = useState('');

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animalNome || !tutorNome) {
      alert('Por favor informe ao menos o nome do animal e do tutor.');
      return;
    }

    const novoId = `${Math.floor(Math.random() * 800) + 200}/26`;
    const novoCaso: CasoZoonoses = {
      id: novoId,
      limesurveyResponseId: Math.floor(Math.random() * 9000) + 1000,
      dataNotificacao: new Date().toISOString().split('T')[0],
      agravo,
      veterinarioNome: vetNome,
      veterinarioClinica: vetClinica,
      veterinarioTelefone: '(15) 3222-2484',
      tutorNome,
      tutorCpf,
      tutorTelefone,
      tutorEndereco,
      tutorNumero,
      tutorBairro,
      tutorMunicipio: 'Sorocaba',
      animalNome,
      especie,
      raca,
      sexo: 'Macho',
      sintomasDescricao: sintomas,
      temLesaoPele: 'Sim',
      distribuicaoLesoes: 'Múltipla (até 5)',
      locaisPredominantes: ['Cabeça', 'Nariz'],
      lpiEndereco: `${tutorBairro} - ${tutorEndereco}`,
      lpiTipo: 'AUT',
      coletaRealizada: 'Sim',
      exameDiagnostico: 'Citologia',
      laboratorio: 'DZ',
      resultadoFinal: 'Positivo',
      statusInvestigacao: 'Em Investigação',
      pessoasComLesoes: temLesaoHumana ? 'Sim' : 'Não',
      notificadoVE: temLesaoHumana,
      observacoesTecnicas: 'Notificação recém-inserida no sistema.'
    };

    onSaveNew(novoCaso);
    onClose();
  };

  const handleImportCsv = () => {
    if (!rawCsvInput.trim()) return;
    const lines = rawCsvInput.trim().split('\n');
    if (lines.length === 0) return;

    // Use default headers if single row
    const defaultHeaders = [
      'id', 'submitdate', 'VetNome', 'VetClinica', 'TutorNome', 'TutorBairro',
      'AnimalEspoNome', 'AnimalEspoEspecie', 'AnimalEspoRaca', 'SINTOMAS'
    ];

    const parsed = parseLimeSurveyCsvLine(lines[0], defaultHeaders);
    if (parsed && parsed.animalNome) {
      onSaveNew(parsed as CasoZoonoses);
      onClose();
    } else {
      alert('Não foi possível processar a linha CSV. Verifique a formatação.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Registrar Nova Notificação de Agravo
            </h3>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector */}
        <div className="px-5 pt-3 flex gap-2 border-b border-slate-200 pb-2 text-xs">
          <button
            onClick={() => setMode('form')}
            className={`px-3 py-1 rounded font-medium cursor-pointer ${
              mode === 'form' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Preencher Formulário
          </button>
          <button
            onClick={() => setMode('csv')}
            className={`px-3 py-1 rounded font-medium cursor-pointer ${
              mode === 'csv' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Colar Linha CSV do LimeSurvey
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {mode === 'form' ? (
            <form onSubmit={handleSaveForm} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Agravo Notificado *</label>
                  <select
                    value={agravo}
                    onChange={e => setAgravo(e.target.value as AgravoType)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 font-semibold text-slate-900"
                  >
                    <option value="Esporotricose">Esporotricose Animal</option>
                    <option value="Leishmaniose">Leishmaniose Visceral Canina (LVC)</option>
                    <option value="Leptospirose">Leptospirose Animal</option>
                    <option value="Raiva">Vigilância de Raiva Animal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Nome do Animal *</label>
                  <input
                    type="text"
                    required
                    value={animalNome}
                    onChange={e => setAnimalNome(e.target.value)}
                    placeholder="Ex: Frajola, Thor, Amora"
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Espécie</label>
                  <select
                    value={especie}
                    onChange={e => setEspecie(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  >
                    <option value="Felina">Felina (Gato)</option>
                    <option value="Canina">Canina (Cão)</option>
                    <option value="Morcego">Morcego (Quiróptero)</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Raça</label>
                  <input
                    type="text"
                    value={raca}
                    onChange={e => setRaca(e.target.value)}
                    placeholder="SRD, Siamês, Pitbull..."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Nome do Tutor *</label>
                  <input
                    type="text"
                    required
                    value={tutorNome}
                    onChange={e => setTutorNome(e.target.value)}
                    placeholder="Nome completo do tutor"
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Telefone do Tutor</label>
                  <input
                    type="text"
                    value={tutorTelefone}
                    onChange={e => setTutorTelefone(e.target.value)}
                    placeholder="(15) 99..."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Bairro em Sorocaba *</label>
                  <input
                    type="text"
                    required
                    value={tutorBairro}
                    onChange={e => setTutorBairro(e.target.value)}
                    placeholder="Vila Barão, Nova Esperança, etc."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Logradouro / Endereço</label>
                  <input
                    type="text"
                    value={tutorEndereco}
                    onChange={e => setTutorEndereco(e.target.value)}
                    placeholder="Rua, Avenida..."
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Clínica / Hospital Notificante</label>
                  <input
                    type="text"
                    value={vetClinica}
                    onChange={e => setVetClinica(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 font-medium mb-1">Médico Veterinário Notificante</label>
                  <input
                    type="text"
                    value={vetNome}
                    onChange={e => setVetNome(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded p-1.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">Sinais Clínicos Apresentados</label>
                <textarea
                  rows={2}
                  value={sintomas}
                  onChange={e => setSintomas(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-xs"
                />
              </div>

              {/* Checkbox Alerta Humano */}
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkHumano"
                  checked={temLesaoHumana}
                  onChange={e => setTemLesaoHumana(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded border-rose-300 focus:ring-rose-500 cursor-pointer"
                />
                <label htmlFor="chkHumano" className="text-xs text-rose-900 font-semibold cursor-pointer">
                  Há pessoas na residência ou tutores com lesões suspeitas de pele / mordedura? (Alerta VE imediato)
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded cursor-pointer shadow-xs"
                >
                  Salvar Notificação
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-3">
              <p className="text-slate-600">
                Cole abaixo uma linha do arquivo CSV exportado do LimeSurvey:
              </p>
              <textarea
                rows={6}
                value={rawCsvInput}
                onChange={e => setRawCsvInput(e.target.value)}
                placeholder='Ex: 4,"2026-09-21 11:03:38","João Ricardo","Hospital Cão Mayke","Célia Ferreira","Vila Helena","Tito","Felina","SRD","Aumento nasal e espirros"'
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 font-mono text-[11px]"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleImportCsv}
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded cursor-pointer"
                >
                  Importar Linha
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
