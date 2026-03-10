# nexus

## Resolver conflitos de merge (Character Sheet)

Se aparecerem marcadores como `<<<<<<<`, `=======`, `>>>>>>>`, o arquivo ainda está em conflito.

### Arquivos que você citou
- `package.json`
- `src/modules/ordem-paranormal/components/CharacterSheetForm.tsx`
- `src/ui/main.tsx`

### Passo a passo rápido (CLI)

```bash
git checkout codex/create-character-sheet-form-page-2ynnbq
git fetch origin
git merge origin/main
```

1. Abra os arquivos com conflito e **remova os marcadores**.
2. Mantenha uma versão final válida de JSON/TSX.
3. Valide build:

```bash
npm run build
```

4. Conclua o merge:

```bash
git add package.json src/modules/ordem-paranormal/components/CharacterSheetForm.tsx src/ui/main.tsx
git commit -m "fix: resolve merge conflicts with main"
```

### Dica para `package.json`
- Garanta que `scripts.build` esteja definido uma única vez.
- Não deixe dependências duplicadas entre blocos conflitantes.
- O JSON precisa fechar corretamente (vírgulas/chaves).

### Dica para `main.tsx`
Mantenha apenas um bloco de render:

```tsx
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```
