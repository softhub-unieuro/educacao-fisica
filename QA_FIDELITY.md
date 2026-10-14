# Fidelity ledger

Reference basis: supplied Lovable screenshots / `PrototipoEF.pdf`.

| Check | Reference | Implementation | Result |
|---|---|---|---|
| Color system | navy/blue + gold + white/gray | same core palette, normalized into CSS tokens | matched / refined |
| Login composition | split institutional panel + login panel | same split composition, cleaner scale/spacing | matched |
| Coordinator density | campus banner → KPIs → 3 charts → table → feedback | same information architecture | matched |
| Beneficiary workout | compact mobile header, timer, progress, exercise, series | same workflow with responsive native controls | matched |
| Anamnesis | 5-step progress rail + single focused form | same 5-step flow and field groups | matched |
| Semantic health states | red / yellow / green Semáforo | shared semantic alert components | matched |
| Responsiveness | mobile beneficiary + desktop staff | explicit breakpoints for all surfaces | improved |
| Interaction | prototype demo states | role switching, timer, progress, filters, semaphore actions, builder and local anamnesis state | improved |

Intentional deviations:

- Video area uses a code-native neutral demonstration frame instead of embedding a third-party YouTube thumbnail. The final backend can supply the registered video URL.
- Charts are CSS/SVG and dependency-free rather than adding a chart library.
- Current repository data models do not yet represent most EuroHealth 360 health/workout concepts, so those interfaces use demo data rather than pretending to persist unsupported records.

## QA — refinamento UniEuro / responsividade

Validação final executada com Playwright Python + Chromium local porque o Browser plugin não estava disponível na sessão.

Viewports verificados:
- Login: 1440×900 e 390×844
- Coordenador: 1440×1000 e 390×844
- Treino: 390×844
- Super Anamnese: 1200×900 e 390×844

Resultado:
- nenhum overflow horizontal detectado;
- nenhum erro/warning de console nas páginas QA;
- seleção de perfil no login respondeu corretamente;
- checkbox de série no treino respondeu corretamente;
- logo UniEuro presente nas superfícies institucionais;
- tabela de Gestão de Usuários convertida para linhas responsivas no mobile.


## QA — wordmark azul / logo em todas as telas

- `UNIEURO` passa a ser integralmente azul; não há mais combinação azul + amarelo no wordmark.
- Login, cadastro, seletor, dashboards de staff, beneficiário, treino e Super Anamnese exibem o mesmo lockup institucional.
- Em superfícies azuis, o lockup fica em uma pequena base branca para preservar o wordmark azul sem sacrificar contraste.
- O amarelo permanece apenas em estados de atenção do Semáforo e badges semânticos.
- `py_compile` e `node --check` foram repetidos após a alteração.
- Browser plugin não estava disponível; tentativa de Chromium/Playwright foi bloqueada pela política de navegação do ambiente. Foram gerados previews estáticos de layout com WeasyPrint para revisão visual do branding.


## Correção visual final (2026-10-06)
- Emblema UniEuro corrigido a partir do arquivo fornecido, removendo fragmentos dourados e fundo.
- Wordmark UNIEURO em azul institucional em todas as telas.
- Login e Anamnese usam barra institucional branca em vez de badge flutuante.
- Corrigidos ícones SVG que apareciam preenchidos/preto em alguns renders.
- Corrigido o fieldset de perfil do login (legend não participa mais do grid).
- Eliminado overflow horizontal nos viewports testados (390, 1440 px).
- Mídia de treino usa placeholder local sem dependência de imagem externa.
