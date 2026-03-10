import {
  Activity,
  Brain,
  Dice5,
  Dna,
  FileText,
  Package,
  Search,
  Shield,
  Skull,
  User,
  Zap,
} from 'lucide-react';
import type { CharacterSheet, ResourceField } from '../types/characterSheet';

interface CharacterSheetFormProps {
  sheet: CharacterSheet;
  storageKey: string;
  onCharacterIdChange: (value: string) => void;
  onCharacterDataChange: (field: keyof CharacterSheet['characterData'], value: string) => void;
  onAtributoChange: (field: keyof CharacterSheet['atributos'], value: number) => void;
  onPericiaChange: (field: keyof CharacterSheet['pericias'], value: number) => void;
  onResourceChange: (resource: ResourceField, field: 'atual' | 'maximo', value: number) => void;
  onTextAreaChange: (field: 'inventario' | 'notas', value: string) => void;
}

const toNumber = (value: string): number => {
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const atributosConfig: Array<{
  key: keyof CharacterSheet['atributos'];
  label: string;
  Icon: typeof Zap;
}> = [
  { key: 'agilidade', label: 'AGI', Icon: Zap },
  { key: 'forca', label: 'FOR', Icon: Activity },
  { key: 'intelecto', label: 'INT', Icon: Brain },
  { key: 'presenca', label: 'PRE', Icon: User },
  { key: 'vigor', label: 'VIG', Icon: Shield },
];

const resourceConfig: Array<{
  key: ResourceField;
  label: string;
  icon: typeof Activity;
  accentClass: string;
}> = [
  { key: 'pv', label: 'Vida (PV)', icon: Activity, accentClass: 'text-red-400 bg-red-500' },
  { key: 'pe', label: 'Esforço (PE)', icon: Zap, accentClass: 'text-amber-400 bg-amber-500' },
  { key: 'sanidade', label: 'Sanidade', icon: Brain, accentClass: 'text-blue-400 bg-blue-500' },
];

const getResourcePercent = (atual: number, maximo: number): number => {
  if (maximo <= 0) {
    return 0;
  }
  return Math.max(0, Math.min((atual / maximo) * 100, 100));
};

export function CharacterSheetForm({
  sheet,
  storageKey,
  onCharacterIdChange,
  onCharacterDataChange,
  onAtributoChange,
  onPericiaChange,
  onResourceChange,
  onTextAreaChange,
}: CharacterSheetFormProps) {

  const periciaKeys = Object.keys(sheet.pericias) as Array<keyof CharacterSheet['pericias']>;

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-6 text-zinc-100 selection:bg-yellow-400/25 md:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="relative overflow-hidden rounded-r-xl border-l-4 border-yellow-500 bg-gradient-to-r from-zinc-900 to-black p-6 shadow-2xl">
          <div className="pointer-events-none absolute right-0 top-0 p-3 opacity-10">
            <Skull size={120} />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 md:grid-cols-4">
            <div className="space-y-3 md:col-span-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-500">Identificação do Agente</label>
                <input
                  className="w-full border-b border-transparent bg-transparent text-3xl font-black outline-none transition-colors focus:border-yellow-500"
                  value={sheet.characterData.nome}
                  onChange={(e) => onCharacterDataChange('nome', e.target.value)}
                  placeholder="Nome do personagem"
                />
              </div>

              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <label className="text-xs text-zinc-400">
                  Jogador(a)
                  <input
                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none focus:border-yellow-500"
                    value={sheet.characterData.playerName}
                    onChange={(e) => onCharacterDataChange('playerName', e.target.value)}
                    placeholder="Nome do jogador"
                  />
                </label>
                <label className="text-xs text-zinc-400">
                  ID da ficha
                  <input
                    className="mt-1 w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1 text-sm text-zinc-100 outline-none focus:border-yellow-500"
                    value={sheet.characterId}
                    onChange={(e) => onCharacterIdChange(e.target.value)}
                    placeholder="personagem-1"
                  />
                </label>
              </div>

              <p className="rounded bg-zinc-800 px-2 py-1 text-[11px] text-zinc-300">
                Auto-save: <code>{storageKey}</code>
              </p>
            </div>

            <div className="space-y-2 text-sm">
              <label className="block text-[10px] uppercase text-zinc-500">Classe</label>
              <input
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1 outline-none focus:border-yellow-500"
                value={sheet.characterData.classe}
                onChange={(e) => onCharacterDataChange('classe', e.target.value)}
              />
              <label className="block text-[10px] uppercase text-zinc-500">Trilha</label>
              <input
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1 outline-none focus:border-yellow-500"
                value={sheet.characterData.trilha}
                onChange={(e) => onCharacterDataChange('trilha', e.target.value)}
              />
              <label className="block text-[10px] uppercase text-zinc-500">Origem</label>
              <input
                className="w-full rounded border border-zinc-700 bg-zinc-950 px-2 py-1 outline-none focus:border-yellow-500"
                value={sheet.characterData.origem}
                onChange={(e) => onCharacterDataChange('origem', e.target.value)}
              />
            </div>

            <div className="flex flex-col items-center justify-center rounded-lg bg-yellow-500 p-3 text-black shadow-lg shadow-yellow-500/20">
              <span className="text-[10px] font-black uppercase">NEX %</span>
              <input
                className="w-full bg-transparent text-center text-4xl font-black outline-none"
                value={sheet.characterData.nex}
                onChange={(e) => onCharacterDataChange('nex', e.target.value)}
              />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <section>
              <h2 className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2 text-sm font-black uppercase tracking-widest">
                <Dna size={16} className="text-yellow-500" /> Atributos
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {atributosConfig.map(({ key, label, Icon }) => (
                  <div key={key} className="group rounded-lg border border-zinc-800 bg-zinc-900 p-2 text-center transition-colors hover:border-yellow-500/50">
                    <Icon size={14} className="mx-auto mb-1 text-zinc-500 group-hover:text-yellow-500" />
                    <span className="mb-1 block text-[10px] font-bold text-zinc-400">{label}</span>
                    <input
                      type="number"
                      value={sheet.atributos[key]}
                      onChange={(e) => onAtributoChange(key, toNumber(e.target.value))}
                      className="w-full rounded bg-zinc-950 py-1 text-center text-lg font-bold outline-none ring-yellow-500 focus:ring-1"
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="mb-4 flex items-center gap-2 border-b border-zinc-800 pb-2 text-sm font-black uppercase tracking-widest">
                <Activity size={16} className="text-yellow-500" /> Recursos (PV/PE/Sanidade)
              </h2>

              {resourceConfig.map(({ key, label, icon: Icon, accentClass }) => {
                const recurso = sheet.recursos[key];
                const percent = getResourcePercent(recurso.atual, recurso.maximo);
                const [textClass, barClass] = accentClass.split(' ');

                return (
                  <article key={key} className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 shadow-inner">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className={`h-5 w-5 ${textClass}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">{label}</span>
                      </div>
                      <div className="font-mono text-right">
                        <span className="text-xl font-bold">{recurso.atual}</span>
                        <span className="text-sm text-zinc-500"> / {recurso.maximo}</span>
                      </div>
                    </div>

                    <div className="h-3 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div className={`h-full transition-all duration-500 ${barClass}`} style={{ width: `${percent}%` }} />
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={recurso.atual}
                        onChange={(e) => onResourceChange(key, 'atual', toNumber(e.target.value))}
                        className="w-full rounded border border-zinc-700 bg-zinc-950 p-1 text-center text-xs font-mono outline-none focus:border-yellow-500"
                      />
                      <input
                        type="number"
                        value={recurso.maximo}
                        onChange={(e) => onResourceChange(key, 'maximo', toNumber(e.target.value))}
                        className="w-full rounded border border-zinc-700 bg-zinc-950 p-1 text-center text-xs font-mono text-zinc-400 outline-none focus:border-yellow-500"
                      />
                    </div>
                  </article>
                );
              })}
            </section>
          </div>

          <section className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6 lg:col-span-1">
            <h2 className="mb-6 flex items-center gap-2 border-b border-zinc-800 pb-2 text-sm font-black uppercase tracking-widest">
              <Search size={16} className="text-yellow-500" /> Perícias
            </h2>

            <div className="custom-scrollbar grid max-h-[620px] grid-cols-1 gap-1 overflow-y-auto pr-2">
              {periciaKeys.map((pericia) => (
                <div key={pericia} className="group flex items-center justify-between rounded border-b border-zinc-900/70 p-2 transition-colors hover:bg-zinc-900">
                  <div className="flex items-center gap-3">
                    <Dice5 size={14} className="text-zinc-600 transition-colors group-hover:text-yellow-500" />
                    <span className="text-xs font-medium uppercase text-zinc-400 group-hover:text-zinc-200">{pericia}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600">BÔNUS</span>
                    <input
                      type="number"
                      value={sheet.pericias[pericia]}
                      onChange={(e) => onPericiaChange(pericia, toNumber(e.target.value))}
                      className="w-12 bg-transparent text-right font-mono text-sm font-bold text-yellow-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                <Package size={16} className="text-yellow-500" /> Inventário
              </h2>
              <textarea
                className="custom-scrollbar h-52 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 font-mono text-sm text-zinc-300 outline-none focus:border-yellow-500/50"
                value={sheet.inventario}
                onChange={(e) => onTextAreaChange('inventario', e.target.value)}
                placeholder="Itens, armas, munições e equipamentos..."
              />
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
              <h2 className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                <FileText size={16} className="text-yellow-500" /> Notas
              </h2>
              <textarea
                className="custom-scrollbar h-52 w-full resize-none rounded-lg border border-zinc-800 bg-zinc-950/50 p-4 text-sm italic text-zinc-400 outline-none focus:border-yellow-500/50"
                value={sheet.notas}
                onChange={(e) => onTextAreaChange('notas', e.target.value)}
                placeholder="Anotações de pistas, rituais, criaturas e objetivos..."
              />
            </section>
          </div>
        </div>

        <footer className="border-t border-zinc-900 py-8 text-center text-[10px] uppercase tracking-widest text-zinc-700">
          Ordem Paranormal — Ficha de Operação — Sigilo Nível 4
        </footer>
      </div>
    </main>
  );
}
