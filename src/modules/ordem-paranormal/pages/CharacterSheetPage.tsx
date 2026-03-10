import { useEffect, useMemo, useRef, useState } from 'react';
import { CharacterSheetForm } from '../components/CharacterSheetForm';
import { createDefaultCharacterSheet, type CharacterSheet, type ResourceField } from '../types/characterSheet';

const getStorageKey = (characterId: string) => `rpg:ordem-paranormal:sheet:${characterId}`;

const parseSheet = (raw: string | null): CharacterSheet | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as CharacterSheet;
    if (parsed?.system !== 'ordem-paranormal' || !parsed.characterId) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

export function CharacterSheetPage() {
  const defaultSheet = useMemo(() => createDefaultCharacterSheet(), []);

  const [sheet, setSheet] = useState<CharacterSheet>(() => {
    if (typeof window === 'undefined') {
      return defaultSheet;
    }

    const cached = parseSheet(localStorage.getItem(getStorageKey(defaultSheet.characterId)));
    return cached ?? defaultSheet;
  });

  const storageKey = useMemo(() => getStorageKey(sheet.characterId), [sheet.characterId]);
  const hydratedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (hydratedKeyRef.current === storageKey) {
      return;
    }

    const cached = parseSheet(localStorage.getItem(storageKey));
    hydratedKeyRef.current = storageKey;

    if (cached) {
      setSheet(cached);
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(sheet));
  }, [sheet, storageKey]);

  const updateCharacterId = (value: string) => {
    const normalized = value.trim() || 'personagem-sem-id';
    setSheet((prev) => ({ ...prev, characterId: normalized }));
  };

  const updateCharacterData = (field: keyof CharacterSheet['characterData'], value: string) => {
    setSheet((prev) => ({
      ...prev,
      characterData: {
        ...prev.characterData,
        [field]: value,
      },
    }));
  };

  const updateAtributo = (field: keyof CharacterSheet['atributos'], value: number) => {
    setSheet((prev) => ({
      ...prev,
      atributos: {
        ...prev.atributos,
        [field]: value,
      },
    }));
  };

  const updatePericia = (field: keyof CharacterSheet['pericias'], value: number) => {
    setSheet((prev) => ({
      ...prev,
      pericias: {
        ...prev.pericias,
        [field]: value,
      },
    }));
  };

  const updateResource = (resource: ResourceField, field: 'atual' | 'maximo', value: number) => {
    setSheet((prev) => ({
      ...prev,
      recursos: {
        ...prev.recursos,
        [resource]: {
          ...prev.recursos[resource],
          [field]: value,
        },
      },
    }));
  };

  const updateTextArea = (field: 'inventario' | 'notas', value: string) => {
    setSheet((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <CharacterSheetForm
      sheet={sheet}
      storageKey={storageKey}
      onCharacterIdChange={updateCharacterId}
      onCharacterDataChange={updateCharacterData}
      onAtributoChange={updateAtributo}
      onPericiaChange={updatePericia}
      onResourceChange={updateResource}
      onTextAreaChange={updateTextArea}
    />
  );
}
