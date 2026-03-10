export type ResourceField = 'pv' | 'pe' | 'sanidade';

export interface CharacterSheet {
  system: 'ordem-paranormal';
  characterId: string;
  characterData: {
    nome: string;
    classe: string;
    trilha: string;
    origem: string;
    nex: string;
    playerName: string;
  };
  atributos: {
    agilidade: number;
    forca: number;
    intelecto: number;
    presenca: number;
    vigor: number;
  };
  pericias: {
    acrobacia: number;
    atletismo: number;
    atualidades: number;
    ciencias: number;
    diplomacia: number;
    furtividade: number;
    iniciativa: number;
    investigacao: number;
    medicina: number;
    ocultismo: number;
    percepcao: number;
    pontaria: number;
    reflexos: number;
    sobrevivencia: number;
    vontade: number;
  };
  recursos: {
    pv: {
      atual: number;
      maximo: number;
    };
    pe: {
      atual: number;
      maximo: number;
    };
    sanidade: {
      atual: number;
      maximo: number;
    };
  };
  inventario: string;
  notas: string;
}

export const createDefaultCharacterSheet = (): CharacterSheet => ({
  system: 'ordem-paranormal',
  characterId: 'personagem-1',
  characterData: {
    nome: '',
    classe: '',
    trilha: '',
    origem: '',
    nex: '',
    playerName: '',
  },
  atributos: {
    agilidade: 1,
    forca: 1,
    intelecto: 1,
    presenca: 1,
    vigor: 1,
  },
  pericias: {
    acrobacia: 0,
    atletismo: 0,
    atualidades: 0,
    ciencias: 0,
    diplomacia: 0,
    furtividade: 0,
    iniciativa: 0,
    investigacao: 0,
    medicina: 0,
    ocultismo: 0,
    percepcao: 0,
    pontaria: 0,
    reflexos: 0,
    sobrevivencia: 0,
    vontade: 0,
  },
  recursos: {
    pv: { atual: 0, maximo: 0 },
    pe: { atual: 0, maximo: 0 },
    sanidade: { atual: 0, maximo: 0 },
  },
  inventario: '',
  notas: '',
});
