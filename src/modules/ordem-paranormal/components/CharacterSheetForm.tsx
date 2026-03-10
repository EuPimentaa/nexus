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
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: 24, fontFamily: 'Inter, sans-serif' }}>
      <h1>Ficha de Personagem — Ordem Paranormal</h1>
      <p style={{ color: '#666', marginBottom: 20 }}>
        Salvamento automático em: <code>{storageKey}</code>
      </p>

      <section>
        <h2>Dados do personagem</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          <label>
            ID
            <input value={sheet.characterId} onChange={(e) => onCharacterIdChange(e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            Nome
            <input value={sheet.characterData.nome} onChange={(e) => onCharacterDataChange('nome', e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            Jogador(a)
            <input value={sheet.characterData.playerName} onChange={(e) => onCharacterDataChange('playerName', e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            Classe
            <input value={sheet.characterData.classe} onChange={(e) => onCharacterDataChange('classe', e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            Trilha
            <input value={sheet.characterData.trilha} onChange={(e) => onCharacterDataChange('trilha', e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            Origem
            <input value={sheet.characterData.origem} onChange={(e) => onCharacterDataChange('origem', e.target.value)} style={{ width: '100%' }} />
          </label>
          <label>
            NEX
            <input value={sheet.characterData.nex} onChange={(e) => onCharacterDataChange('nex', e.target.value)} style={{ width: '100%' }} />
          </label>
        </div>
      </section>

      <section>
        <h2>Atributos</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          {(Object.keys(sheet.atributos) as Array<keyof CharacterSheet['atributos']>).map((atributo) => (
            <label key={atributo} style={{ textTransform: 'capitalize' }}>
              {atributo}
              <input
                type="number"
                value={sheet.atributos[atributo]}
                onChange={(e) => onAtributoChange(atributo, toNumber(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2>Perícias</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          {(Object.keys(sheet.pericias) as Array<keyof CharacterSheet['pericias']>).map((pericia) => (
            <label key={pericia} style={{ textTransform: 'capitalize' }}>
              {pericia}
              <input
                type="number"
                value={sheet.pericias[pericia]}
                onChange={(e) => onPericiaChange(pericia, toNumber(e.target.value))}
                style={{ width: '100%' }}
              />
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2>Recursos (PV/PE/Sanidade)</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
          {(Object.keys(sheet.recursos) as ResourceField[]).map((resourceName) => (
            <fieldset key={resourceName}>
              <legend style={{ textTransform: 'uppercase' }}>{resourceName}</legend>
              <label>
                Atual
                <input
                  type="number"
                  value={sheet.recursos[resourceName].atual}
                  onChange={(e) => onResourceChange(resourceName, 'atual', toNumber(e.target.value))}
                  style={{ width: '100%' }}
                />
              </label>
              <label>
                Máximo
                <input
                  type="number"
                  value={sheet.recursos[resourceName].maximo}
                  onChange={(e) => onResourceChange(resourceName, 'maximo', toNumber(e.target.value))}
                  style={{ width: '100%' }}
                />
              </label>
            </fieldset>
          ))}
        </div>
      </section>

      <section>
        <h2>Inventário e notas</h2>
        <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <label>
            Inventário
            <textarea value={sheet.inventario} onChange={(e) => onTextAreaChange('inventario', e.target.value)} rows={8} style={{ width: '100%' }} />
          </label>
          <label>
            Notas
            <textarea value={sheet.notas} onChange={(e) => onTextAreaChange('notas', e.target.value)} rows={8} style={{ width: '100%' }} />
          </label>
        </div>
      </section>
    </main>
  );
}
