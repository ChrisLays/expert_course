/* ════════════════════════════════════════════════════════════════
   VibeLab v2 — données.
   Codex compilé depuis la documentation officielle Anthropic
   (code.claude.com/docs, support.claude.com) — juin 2026.
   ════════════════════════════════════════════════════════════════ */
'use strict';

const VL = {};

/* ── branches & layout ── */
VL.BRANCHES = {
  fond:   { label: "Compétences web N1→N5", raw: "#5EE6D0" },
  prompt: { label: "L'art du prompt", raw: "#F2B450" },
  claude: { label: "Outils Claude", raw: "#A78BFA" },
};
VL.HUB = { x: 760, y: 480 };
VL.ORBITS = [175, 300, 415, 520, 615];
VL.LEVEL_NAMES = [
  [0, "Novice de l'orbite"], [0.18, "Apprenti·e vibe coder"], [0.38, "Bâtisseur·se"],
  [0.6, "Ingénieur·e du vibe"], [0.82, "Architecte"], [1, "Constellation complète"],
];
VL.DOJO_CAP = 120; // XP maximum gagnable au Dojo

/* ════════════════ CONSTELLATION : 26 ÉTOILES ════════════════ */
VL.NODES = [

  /* ───────── NIVEAU 1 — Fondations ───────── */
  {
    id: "anatomie", branch: "fond", level: 1, x: 686, y: 321, title: "Anatomie d'une app web",
    lesson: `<p>Toute application web tient en <b>trois étages</b>. Pensez à un restaurant :</p>
      <div class="visual">
        <div class="vbox"><b>Frontend</b><span>la salle : ce que voit et touche l'utilisateur</span></div>
        <div class="varrow">⇄</div>
        <div class="vbox"><b>Backend</b><span>la cuisine : la logique, les règles, les calculs</span></div>
        <div class="varrow">⇄</div>
        <div class="vbox"><b>Données</b><span>le garde-manger : ce qui doit survivre</span></div>
      </div>
      <p>Certaines apps n'ont <b>que la salle</b> (site statique, artifact Claude) ; d'autres ont les trois. Savoir situer chaque demande dans le bon étage, c'est déjà parler le langage des développeurs — et prompter beaucoup plus juste.</p>`,
    steps: ["Ouvrez Claude (claude.ai)", "Collez le prompt en remplaçant le passage entre crochets", "Lisez le schéma obtenu et posez une question sur l'étage le plus flou pour vous"],
    prompt: `Voici mon idée d'application : [décrivez votre app en 2-3 phrases].

Agis comme un architecte web pédagogue. Présente-moi l'architecture de cette app en 3 couches (frontend / backend / données) sous forme de schéma texte simple, puis pour chaque couche : ce qu'elle contient concrètement dans MON cas, et si on peut s'en passer dans une première version. Termine par la version la plus simple possible qui marche (MVP). Je ne suis pas développeur : zéro jargon non expliqué.`,
    checks: ["Je sais dire ce qui est frontend, backend et données dans MON projet", "Je sais si mon MVP a besoin d'un backend ou pas"],
  },
  {
    id: "frontend", branch: "fond", level: 1, x: 612, y: 386, title: "Le frontend",
    lesson: `<p>Le frontend, c'est tout ce qui s'exécute <b>dans le navigateur</b>. Trois matériaux :</p>
      <div class="visual">
        <div class="vbox"><b>HTML</b><span>le squelette : structure et contenu</span></div>
        <div class="vbox"><b>CSS</b><span>la peau : couleurs, mise en page, animations</span></div>
        <div class="vbox"><b>JavaScript</b><span>les muscles : interactions, logique</span></div>
      </div>
      <p>Deux notions clés : les <b>composants</b> (briques d'interface réutilisables) et <b>l'état</b> (ce dont l'interface se souvient : onglet actif, panier). Quand un rendu vous déçoit, nommer la brique fautive (« le composant carte », « l'état du filtre ») rend vos retouches dix fois plus précises.</p>`,
    steps: ["Ouvrez un artifact ou une page que Claude vous a déjà créés", "Collez le prompt dans la même conversation", "Repérez : où est le HTML, le CSS, le JS, et où vit « l'état »"],
    prompt: `Reprends le code de l'interface que tu viens de créer pour moi. Fais-m'en la visite guidée comme à quelqu'un qui ne code pas :

1. Découpe-le en zones : structure (HTML), style (CSS), comportement (JavaScript).
2. Liste les "composants" que tu y as créés et à quoi sert chacun.
3. Montre-moi où vit "l'état" (ce dont l'interface se souvient) et ce qui le modifie.
4. Donne-moi 3 exemples de phrases précises que je pourrais te dire pour modifier tel ou tel composant.`,
    checks: ["Je sais distinguer structure / style / comportement dans une page", "Je sais nommer un composant précis quand je demande une retouche"],
  },
  {
    id: "backend", branch: "fond", level: 1, x: 585, y: 480, title: "Backend & API", labelDy: -26,
    lesson: `<p>Le backend tourne <b>sur un serveur</b>, pas chez l'utilisateur. On y met ce qui doit être <b>fiable, secret ou partagé</b> : vérifier un mot de passe, enregistrer une commande, appeler un service payant avec une clé secrète.</p>
      <p>Frontend et backend se parlent via une <b>API</b> : un menu d'actions autorisées. Le frontend commande (« crée ce compte »), le backend répond — généralement en <b>JSON</b>.</p>
      <p>Réflexe : tout ce qui est dans le frontend est <b>visible et modifiable</b> par l'utilisateur. Une clé d'API, un prix, une règle d'accès n'ont rien à faire côté navigateur.</p>`,
    steps: ["Ouvrez Claude", "Collez le prompt complété avec votre projet", "Notez ce qui DOIT être côté serveur dans votre app, et pourquoi"],
    prompt: `Mon application : [décrivez votre app]. Fonctionnalités prévues : [listez-les].

Pour chaque fonctionnalité, dis-moi si elle peut vivre uniquement dans le navigateur (frontend) ou si elle exige un serveur (backend), et surtout POURQUOI — en particulier tout ce qui touche aux secrets (clés d'API), à l'argent, ou aux données partagées entre utilisateurs. Puis montre-moi à quoi ressemblerait l'API de mon app : la liste des "commandes" que le frontend passerait au serveur, en français d'abord, puis en exemple JSON.`,
    checks: ["Je sais pourquoi une clé d'API ne doit jamais être dans le frontend", "Je peux décrire l'API de mon app comme une liste de commandes"],
  },
  {
    id: "data", branch: "fond", level: 1, x: 612, y: 574, title: "Données & stockage",
    lesson: `<p>Question clé : <b>que doit-il rester quand on ferme l'onglet ?</b></p>
      <div class="visual">
        <div class="vbox"><b>Rien</b><span>tout en mémoire — un jeu, une démo</span></div>
        <div class="vbox"><b>Cet appareil</b><span>localStorage : préférences, brouillons</span></div>
        <div class="vbox"><b>Partout</b><span>base de données serveur : comptes, contenus partagés</span></div>
      </div>
      <p>Les bases rangent l'information en <b>tables</b> reliées entre elles. Décrire ses données en français — « un utilisateur a plusieurs projets, un projet a plusieurs notes » — est le plan que Claude transformera en schéma propre.</p>`,
    steps: ["Ouvrez Claude", "Collez le prompt complété", "Vérifiez que vous comprenez ce qui survit à un refresh dans votre app actuelle"],
    prompt: `Mon application : [décrivez votre app].

1. Liste toutes les informations que mon app manipule, et classe-les : éphémère (perdable), locale (cet appareil suffit), ou partagée (base de données obligatoire).
2. Pour les données partagées, propose-moi un mini-schéma en français : les "tables", ce qu'elles contiennent, et comment elles sont reliées.
3. Explique-moi ce qui se passerait concrètement pour mes utilisateurs si je restais en stockage local au lieu d'une vraie base.`,
    checks: ["Je sais ce qui survit à un refresh dans mon app et pourquoi", "Je peux décrire mes données en tables reliées, en français"],
  },
  {
    id: "ship", branch: "fond", level: 1, x: 686, y: 639, title: "Git & mise en ligne",
    lesson: `<p><b>Git</b> est la machine à remonter le temps du code : chaque <b>commit</b> est une photo datée et commentée. Une <b>branche</b> permet d'essayer sans casser la version qui marche ; une <b>pull request (PR)</b> propose de fusionner l'essai dans la version principale.</p>
      <p><b>Déployer</b>, c'est copier le code sur une machine accessible au monde : trivial pour un site statique (Render, Netlify, GitHub Pages), plus riche dès qu'il y a un backend à faire tourner.</p>
      <p>Claude Code manie git pour vous — mais comprendre commit / branche / PR vous permet de <b>relire et décider</b>, au lieu de subir.</p>`,
    steps: ["Ouvrez Claude (ou Claude Code si vous avez un dépôt)", "Collez le prompt", "Gardez le glossaire obtenu sous la main pour vos prochaines sessions"],
    prompt: `Raconte-moi le voyage complet de mon code, de l'idée jusqu'à l'URL publique, pour une app comme la mienne : [décrivez votre app et où elle est hébergée si vous le savez].

Étapes attendues : écriture du code → commit → branche → pull request → fusion → déploiement. Pour chaque étape : une métaphore simple, ce que JE fais concrètement (même si c'est Claude Code qui exécute), et l'erreur classique du débutant. Termine par un glossaire de 8 termes git/déploiement que je recroiserai tout le temps.`,
    checks: ["Je sais expliquer commit, branche et pull request avec mes mots", "Je sais comment mon app passe de mon dépôt à une URL en ligne"],
  },

  /* ───────── NIVEAU 2 — Le web en profondeur ───────── */
  {
    id: "http", branch: "fond", level: 2, x: 548, y: 692, title: "HTTP & API REST",
    lesson: `<p>Tout le web parle <b>HTTP</b> : une requête (méthode + URL + en-têtes + corps), une réponse (code + en-têtes + corps). Les <b>méthodes</b> portent l'intention : <code>GET</code> lire, <code>POST</code> créer, <code>PUT/PATCH</code> modifier, <code>DELETE</code> supprimer.</p>
      <p>Les <b>codes de statut</b> sont le vocabulaire du diagnostic : <code>200</code> OK, <code>201</code> créé, <code>301</code> déplacé, <code>400</code> requête invalide, <code>401</code> non authentifié, <code>403</code> interdit, <code>404</code> introuvable, <code>422</code> données rejetées, <code>500</code> erreur serveur. Un vibe coder qui lit « 401 vs 403 » dans la console sait déjà si le problème est « pas connecté » ou « pas le droit ».</p>
      <p>Une API <b>REST</b> organise tout ça en <b>ressources</b> : <code>GET /recettes/42</code>, <code>POST /recettes</code>. Prévisible, donc débuggable.</p>`,
    steps: ["Ouvrez votre app dans Chrome/Safari → outils de développement → onglet Réseau (Network)", "Rechargez la page, cliquez sur 2-3 requêtes et copiez méthode + URL + statut", "Collez le prompt complété dans Claude avec ce que vous avez relevé"],
    prompt: `Voici des requêtes réseau réelles capturées dans les devtools de mon app [décrivez l'app] :

[collez ici : méthode, URL, code de statut, et le contenu de la réponse si visible]

1. Explique-moi chaque requête : qui demande quoi à qui, et ce que dit le code de statut.
2. Reconstitue l'API implicite de mon app : ressources et méthodes.
3. Donne-moi une table de référence des 10 codes de statut que je dois reconnaître au premier coup d'œil, avec le réflexe à avoir pour chacun quand il apparaît pendant un debug.`,
    checks: ["J'ai inspecté de vraies requêtes de mon app dans l'onglet Réseau", "Je sais interpréter 200/301/400/401/403/404/422/500 sans réfléchir"],
  },
  {
    id: "dom", branch: "fond", level: 2, x: 460, y: 480, title: "Navigateur & DOM", labelDy: -26,
    lesson: `<p>Le navigateur transforme le HTML en <b>DOM</b> : un arbre vivant d'éléments que JavaScript peut lire et modifier en continu. Quand « la page se met à jour sans recharger », c'est ça.</p>
      <p>Les <b>événements</b> (clic, saisie, scroll) déclenchent du code. JavaScript n'exécute qu'<b>une chose à la fois</b> (l'event loop) : un calcul lourd fige toute l'interface — d'où les opérations <b>asynchrones</b> (<code>async/await</code>, promesses) pour attendre une réponse réseau sans bloquer.</p>
      <p>Vos <b>devtools</b> sont l'arme n°1 du vibe coder : Inspecteur (voir/modifier le DOM en direct), Console (erreurs JS — à copier ENTIÈRES dans Claude), Réseau, Application (localStorage). Sur Mac : <code>⌥⌘I</code>.</p>`,
    steps: ["Ouvrez votre app, puis les devtools (⌥⌘I) → Console et Inspecteur", "Modifiez un texte en direct dans l'inspecteur, provoquez une erreur, observez la console", "Collez le prompt dans Claude avec ce que vous avez vu"],
    prompt: `Je viens d'explorer les devtools sur mon app [décrivez-la]. Voici ce que j'ai observé/copié : [erreurs console, structure DOM surprenante, ou questions].

1. Explique-moi ce que j'ai vu, élément par élément.
2. Donne-moi le mode d'emploi "vibe coder" des devtools : les 6 gestes qui me serviront chaque semaine (inspecter un élément, lire une erreur, filtrer la console, voir une requête, vider le localStorage, tester en mobile).
3. Explique async/await avec une métaphore, et montre-moi à quoi ressemble dans la console une erreur typique de code asynchrone raté.`,
    checks: ["Je navigue dans Inspecteur / Console / Réseau / Application sans hésiter", "Je sais ce qu'est le DOM et pourquoi un calcul lourd fige l'interface"],
  },
  {
    id: "css", branch: "fond", level: 2, x: 548, y: 268, title: "CSS moderne & responsive",
    lesson: `<p>Le CSS moderne tient en quelques outils puissants : <b>Flexbox</b> (aligner sur un axe : barres, rangées), <b>Grid</b> (grilles à deux dimensions : galeries, dashboards), <b>media queries</b> (adapter selon la taille d'écran), et les <b>variables CSS</b> (<code>--couleur-accent</code>) qui centralisent votre identité visuelle — vos design tokens.</p>
      <p>Les unités qui comptent : <code>rem</code> (relatif à la taille de texte — accessibilité), <code>%</code> et <code>vh/vw</code> (relatif à l'écran), <code>clamp(min, idéal, max)</code> (fluide entre deux bornes). Le réflexe pro : penser <b>mobile-first</b> — la moitié de vos utilisateurs sont sur téléphone.</p>
      <p>Pour prompter juste : « passe la galerie en Grid 3 colonnes, 1 colonne sous 700px » bat « rends ça plus joli » à tous les coups.</p>`,
    steps: ["Ouvrez votre app et réduisez la fenêtre au format téléphone (ou mode responsive des devtools)", "Notez tout ce qui casse ou déborde", "Collez le prompt complété dans Claude (ou Claude Code sur le projet)"],
    prompt: `Audit responsive de mon app [décrivez-la]. En la testant au format mobile j'ai constaté : [listez ce qui casse, déborde, devient illisible].

1. Pour chaque problème, donne le diagnostic probable (flexbox mal configuré ? largeur fixe ? texte en px ?) en m'expliquant le concept en jeu.
2. Propose un plan de correction mobile-first, ordonné, avec pour chaque étape la phrase exacte à te dire pour l'exécuter.
3. Établis mes "design tokens" : la liste des variables CSS (couleurs, espacements, rayons, tailles de texte) que mon app devrait centraliser, avec leurs valeurs actuelles.`,
    checks: ["Je sais quand demander du Flexbox vs du Grid", "Mon app a (ou va avoir) ses design tokens centralisés en variables CSS"],
  },

  /* ───────── NIVEAU 3 — Données & état ───────── */
  {
    id: "sql", branch: "fond", level: 3, x: 442, y: 213, title: "SQL & modélisation",
    lesson: `<p>Le <b>SQL</b> est la langue des bases relationnelles. Quatre verbes : <code>SELECT</code> lire, <code>INSERT</code> créer, <code>UPDATE</code> modifier, <code>DELETE</code> supprimer. La puissance vient des <b>JOIN</b> : croiser des tables reliées par des clés (« donne-moi les commandes AVEC le nom du client »).</p>
      <p>Modéliser, c'est décider : <b>clé primaire</b> (l'identifiant unique de chaque ligne), <b>clé étrangère</b> (la référence vers une autre table), relations <b>1-N</b> (un client, plusieurs commandes) ou <b>N-N</b> (des recettes et des tags — il faut une table de liaison).</p>
      <p>Deux notions de prod : les <b>index</b> (accélèrent les recherches fréquentes) et les <b>migrations</b> (chaque évolution du schéma est un script versionné — jamais de modification sauvage d'une base qui tourne).</p>`,
    steps: ["Ouvrez Claude (ou Claude Code sur votre projet s'il a déjà une base)", "Collez le prompt complété", "Faites-vous expliquer chaque requête jusqu'à pouvoir la reformuler en français"],
    prompt: `Mon app : [décrivez-la et ses données : utilisateurs, contenus, relations].

1. Conçois le schéma relationnel : tables, colonnes typées, clés primaires/étrangères, relations (précise 1-N ou N-N et pourquoi). Présente-le en SQL (CREATE TABLE) ET en schéma texte lisible.
2. Écris les 5 requêtes que mon app fera le plus souvent (avec au moins 2 JOIN), chacune suivie de sa traduction en français.
3. Dis-moi quels index créer et pourquoi.
4. Explique-moi ce qu'est une migration et montre à quoi ressemblerait la migration "ajouter les favoris" sur ce schéma.`,
    checks: ["Je lis un CREATE TABLE et un JOIN simple sans aide", "Je sais expliquer pourquoi une relation N-N exige une table de liaison"],
  },
  {
    id: "auth", branch: "fond", level: 3, x: 345, y: 480, title: "Auth & sessions", labelDy: 38,
    lesson: `<p>Deux questions distinctes : <b>authentification</b> (qui es-tu ?) et <b>autorisation</b> (as-tu le droit ?). Confondre les deux produit les pires failles.</p>
      <p>Règles d'or : un mot de passe n'est <b>jamais stocké en clair</b> — on stocke un <b>hash</b> (empreinte irréversible). Après connexion, le serveur reconnaît l'utilisateur via une <b>session</b> (cookie + état côté serveur) ou un <b>token JWT</b> (jeton signé, vérifiable sans état). « Se connecter avec Google » = <b>OAuth</b> : vous déléguez l'authentification à un tiers de confiance.</p>
      <p>L'autorisation se pense en <b>rôles</b> (admin, membre, invité) et se vérifie <b>côté serveur, à chaque requête</b> — cacher un bouton ne protège rien.</p>`,
    steps: ["Ouvrez Claude", "Collez le prompt complété avec votre app", "Exigez de comprendre le scénario d'attaque avant de valider chaque choix"],
    prompt: `Mon app : [décrivez-la] avec ces types d'utilisateurs : [ex. visiteurs, membres, admins].

1. Conçois le système d'auth : inscription, connexion, "mot de passe oublié". Recommande sessions+cookies ou JWT pour MON cas, en expliquant le compromis.
2. Établis la matrice d'autorisation : pour chaque action de l'app, quel rôle a le droit, et OÙ la vérification doit se faire.
3. Pour chacun de ces 4 pièges, montre le scénario d'attaque si je me trompe : mot de passe en clair, vérification des droits uniquement côté frontend, token qui n'expire jamais, ID devinables dans les URLs.
4. Verdict : ai-je intérêt à utiliser un service d'auth existant (Supabase, Clerk, Auth0…) plutôt que du sur-mesure ? Pourquoi ?`,
    checks: ["Je distingue authentification et autorisation, hash et chiffrement", "Je sais pourquoi chaque vérification de droits doit vivre côté serveur"],
  },
  {
    id: "state", branch: "fond", level: 3, x: 442, y: 747, title: "État & frameworks front",
    lesson: `<p>Pourquoi React, Vue et consorts existent ? Pour une seule idée : <b>l'interface est une fonction de l'état</b> — UI = f(état). Vous ne modifiez plus la page à la main : vous changez l'état, le framework recalcule l'affichage.</p>
      <p>Vocabulaire utile pour prompter : <b>composant</b> (brique), <b>props</b> (données reçues du parent — lecture seule), <b>state</b> (données locales qui changent), <b>re-render</b> (recalcul après changement d'état), <b>hooks</b> (les fonctions React du type <code>useState</code>, <code>useEffect</code>).</p>
      <p>Lucidité de vibe coder : un framework ajoute une chaîne de build et de la complexité. Une page simple n'en a pas besoin ; une app avec beaucoup d'état partagé, si. Sachez où vous êtes sur ce spectre — et exigez de Claude qu'il le justifie.</p>`,
    steps: ["Ouvrez Claude (ou Claude Code sur votre projet)", "Collez le prompt complété", "Notez le verdict et les critères — c'est votre grille de décision pour tous vos futurs projets"],
    prompt: `Mon app : [décrivez-la, ses écrans, ce qui change dynamiquement] — actuellement construite en [vanilla JS / React / je ne sais pas].

1. Établis la carte de son ÉTAT : liste tout ce dont l'interface doit se souvenir, et qui doit y accéder (un seul composant ? plusieurs écrans ?).
2. Verdict argumenté : vanilla JS suffisant, ou framework justifié ? Donne les 3 critères objectifs qui font basculer la décision.
3. Si framework : explique-moi composants/props/state/re-render sur MON app (quel composant aurait quel state).
4. Quel est le coût caché du framework dans mon cas (build, dépendances, dette) ?`,
    checks: ["Je peux lister l'état de mon app et dire qui y accède", "Je sais argumenter framework ou pas pour un projet donné"],
  },

  /* ───────── NIVEAU 4 — Ingénierie ───────── */
  {
    id: "tooling", branch: "fond", level: 4, x: 334, y: 778, title: "Tooling & build",
    lesson: `<p>Tout projet JS moderne s'articule autour de <b>package.json</b> : l'identité du projet, ses <b>dépendances</b> (les librairies installées dans <code>node_modules</code> — jamais commité), et ses <b>scripts</b> (<code>npm run dev</code>, <code>npm run build</code>). Le <b>lockfile</b> (package-lock.json) fige les versions exactes : lui, on le commite.</p>
      <p>Le <b>bundler</b> (Vite est le standard actuel) transforme vos sources en fichiers optimisés pour le navigateur : c'est la différence entre le mode <b>dev</b> (rechargement instantané) et le <b>build de prod</b> (minifié, rapide).</p>
      <p>Les <b>variables d'environnement</b> (<code>.env</code>) portent les secrets et les réglages par environnement — le <code>.env</code> ne se commite <b>jamais</b> (il se liste dans <code>.gitignore</code>), et chaque hébergeur a son écran pour les définir en prod.</p>`,
    steps: ["Ouvrez Claude Code sur votre projet (ou collez votre package.json dans Claude)", "Collez le prompt", "Vérifiez ensuite votre .gitignore : node_modules et .env doivent y être"],
    prompt: `Analyse l'outillage de mon projet (package.json, scripts, config de build, .gitignore, fichiers .env*).

1. Explique-moi mon package.json ligne par ligne : chaque dépendance (à quoi elle sert, est-elle encore utile ?), chaque script (ce qu'il fait vraiment).
2. Mode dev vs build de prod : que se passe-t-il concrètement dans MON projet quand je lance chacun ?
3. Audit des secrets : y a-t-il des valeurs qui devraient être en variables d'environnement ? Mon .gitignore est-il correct ?
4. Y a-t-il des dépendances obsolètes, en double, ou risquées ? Propose un plan de nettoyage SANS l'exécuter.`,
    checks: ["Je comprends chaque ligne de mon package.json et la différence dev/build", "Mes secrets sont en variables d'environnement et mon .gitignore est propre"],
  },
  {
    id: "tests", branch: "fond", level: 4, x: 240, y: 480, title: "Tests & qualité", labelDy: -26,
    lesson: `<p>Paradoxe du vibe coding : vous relisez peu le code, donc il vous faut <b>plus</b> de filets de sécurité qu'un développeur classique. Les tests sont ce filet.</p>
      <div class="visual">
        <div class="vbox"><b>Unitaires</b><span>une fonction isolée : rapide, précis</span></div>
        <div class="vbox"><b>Intégration</b><span>plusieurs briques ensemble : l'API + la base</span></div>
        <div class="vbox"><b>End-to-end</b><span>le parcours utilisateur complet, navigateur piloté</span></div>
      </div>
      <p>Le réflexe gagnant : avant toute évolution risquée, demander à Claude Code d'écrire des tests sur le comportement <b>actuel</b> — si sa modification casse quelque chose, les tests hurlent à votre place. Complétez avec le <b>linting</b> (analyse automatique du style et des erreurs probables) et exigez que <code>npm test</code> passe avant chaque commit.</p>`,
    steps: ["Ouvrez Claude Code sur votre projet", "Collez le prompt", "Demandez ensuite à Claude de casser volontairement une fonctionnalité testée — et regardez le test échouer : c'est ça, le filet"],
    prompt: `Identifie la fonctionnalité la plus critique de mon app (celle dont la casse ferait le plus mal) et sécurise-la :

1. Dis-moi laquelle tu as choisie et pourquoi.
2. Écris 3 à 5 tests qui verrouillent son comportement ACTUEL (cas normal, cas limite, cas d'erreur). Explique chaque test en une phrase de français au-dessus du code.
3. Montre-moi comment les lancer, et ce que je verrai quand ils passent / échouent.
4. Ensuite, casse volontairement la fonctionnalité, lance les tests pour me montrer l'échec, puis répare. Je veux VOIR le filet fonctionner.`,
    checks: ["Mon projet a des tests sur sa fonctionnalité critique et je sais les lancer", "J'ai vu un test échouer puis repasser — je sais à quoi sert le filet"],
  },
  {
    id: "secu", branch: "fond", level: 4, x: 334, y: 182, title: "Sécurité web",
    lesson: `<p>Les attaques qui font 90 % des dégâts sont connues et évitables :</p>
      <p><b>Injection</b> : des données utilisateur interprétées comme du code — SQL (requêtes bricolées en collant du texte) ou <b>XSS</b> (du HTML/JS injecté via un champ et exécuté chez les autres visiteurs). Parade : requêtes paramétrées, échappement systématique de tout ce qui vient de l'utilisateur.</p>
      <p><b>Validation côté serveur</b> : le frontend peut être contourné en 10 secondes — toute règle (prix, droits, formats) doit être revérifiée par le serveur. <b>CSRF</b> : un site tiers fait agir votre navigateur connecté à votre insu. <b>Secrets</b> : une clé commitée dans git est compromise pour toujours (l'historique se souvient).</p>
      <p>Et le méta-risque du vibe coding : du code que <b>personne n'a relu</b>. D'où l'audit régulier — c'est exactement le rôle de <code>/security-review</code> dans Claude Code.</p>`,
    steps: ["Ouvrez Claude Code sur votre projet", "Lancez d'abord /security-review si disponible, sinon collez le prompt", "Traitez les 🔴 immédiatement — demandez le correctif un par un"],
    prompt: `Fais un audit de sécurité complet de mon app, en pédagogue (je ne suis pas développeur). Classe chaque trouvaille 🔴 critique / 🟠 important / 🟢 amélioration :

1. Injections : SQL, XSS — montre-moi l'endroit vulnérable ET le scénario d'attaque concret ("un utilisateur tape ceci dans ce champ, voilà ce qui arrive").
2. Validation : quelles règles ne sont vérifiées que côté frontend ?
3. Secrets : cherche des clés/tokens dans le code ET dans l'historique git.
4. Auth & accès : endpoints accessibles sans vérification, IDs devinables, CORS trop ouvert.
Pour chaque 🔴 : le correctif minimal, et la phrase exacte à te dire pour l'appliquer.`,
    checks: ["Je sais expliquer une injection SQL et une XSS avec un exemple concret", "Mon app a été auditée et les critiques sont corrigés"],
  },

  /* ───────── NIVEAU 5 — Architecture & échelle ───────── */
  {
    id: "apidesign", branch: "fond", level: 5, x: 227, y: 172, title: "API design & architecture",
    lesson: `<p>Une API bien conçue est <b>prévisible</b> : des ressources au pluriel (<code>/recettes</code>, <code>/recettes/42/commentaires</code>), les verbes portés par les méthodes HTTP, des erreurs cohérentes (même format JSON partout), une <b>versioning</b> assumée (<code>/v1/...</code>) pour évoluer sans casser les clients existants.</p>
      <p>Côté structure : commencez <b>monolithe</b> (une seule app bien rangée) — les microservices résolvent des problèmes d'équipes nombreuses que vous n'avez pas. Le vrai enjeu est la <b>séparation des responsabilités</b> : routes (qui reçoivent), logique métier (qui décide), accès données (qui stocke) — séparés, donc remplaçables.</p>
      <p>Les <b>webhooks</b> inversent le sens : au lieu d'interroger sans cesse (« c'est payé ? »), le service vous notifie (« paiement reçu ! »). C'est le mécanisme derrière Stripe, GitHub Actions, et les intégrations entre services.</p>`,
    steps: ["Ouvrez Claude Code sur votre projet le plus avancé", "Collez le prompt", "Conservez le schéma cible : c'est votre feuille de route d'architecture"],
    prompt: `Audit d'architecture de mon app, niveau "développeur junior solide" :

1. Cartographie l'existant : comment le code est organisé aujourd'hui (routes, logique, accès données — mélangés ou séparés ?). Schéma texte à l'appui.
2. Critique l'API actuelle au regard des conventions REST : nommage des ressources, méthodes, format des erreurs, versioning. Liste ce qui surprendrait un développeur expérimenté.
3. Propose l'architecture cible : même fonctionnalités, mieux séparées. Justifie chaque déplacement, et dis ce qu'on N'a PAS besoin de faire (microservices ? sur-découpage ?).
4. Mon app aurait-elle un usage pertinent des webhooks (recevoir ou émettre) ? Lequel ?`,
    checks: ["Je sais critiquer une API REST : ressources, erreurs, versioning", "Je sais expliquer pourquoi on commence monolithe et ce qu'est la séparation des responsabilités"],
  },
  {
    id: "perf", branch: "fond", level: 5, x: 145, y: 480, title: "Performance & cache", labelDy: 38,
    lesson: `<p>La performance perçue se joue sur trois fronts. <b>Le poids</b> : images non optimisées et librairies inutiles sont les coupables n°1 — d'où compression, formats modernes (WebP/AVIF) et <b>lazy loading</b> (charger ce qui est visible, différer le reste).</p>
      <p><b>Le cache</b>, à tous les étages : navigateur (ne pas retélécharger ce qui n'a pas changé), <b>CDN</b> (servir les fichiers depuis un point proche de l'utilisateur), serveur (mémoriser un résultat coûteux). Règle d'or : le cache est un compromis fraîcheur/vitesse — sachez toujours quoi invalider et quand.</p>
      <p><b>La base de données</b> : le piège <b>N+1</b> (1 requête pour la liste + 1 par élément = 101 requêtes au lieu de 2) est l'erreur de perf la plus fréquente des apps générées. Google mesure tout ça via les <b>Core Web Vitals</b> (vitesse d'affichage, réactivité, stabilité visuelle) — testables dans Lighthouse, intégré à Chrome.</p>`,
    steps: ["Chrome → devtools → onglet Lighthouse → générer un rapport sur votre app", "Notez le score et les 3 principales recommandations", "Collez le prompt complété dans Claude Code"],
    prompt: `Rapport Lighthouse de mon app : score [X], principales alertes : [collez les recommandations].

1. Traduis chaque alerte en français simple : c'est quoi, pourquoi c'est lent, qui le ressent.
2. Classe les corrections par ratio impact/effort et applique les 3 premières (montre-moi avant/après).
3. Audite le code à la recherche de requêtes N+1 ou de données rechargées inutilement — explique chaque cas trouvé.
4. Établis ma stratégie de cache : qu'est-ce qui doit être caché (navigateur/CDN/serveur), pour combien de temps, et qu'est-ce qui doit l'invalider ?`,
    checks: ["J'ai un rapport Lighthouse et je comprends ses 3 principales alertes", "Je sais expliquer le problème N+1 et les trois étages de cache"],
  },
  {
    id: "prod", branch: "fond", level: 5, x: 227, y: 788, title: "Observabilité & prod",
    lesson: `<p>Une app « finie » n'est pas une app <b>prête pour la prod</b>. Il manque : des <b>environnements</b> séparés (dev → staging → prod, chacun ses données et ses secrets), des <b>logs</b> exploitables (qui racontent ce qui s'est passé, sans données sensibles), un <b>suivi d'erreurs</b> (être prévenu quand un utilisateur rencontre un crash — type Sentry — plutôt que l'apprendre sur les réseaux), et des <b>sauvegardes testées</b> (une sauvegarde jamais restaurée n'existe pas).</p>
      <p>Le scénario à préparer AVANT l'incident : le déploiement de vendredi casse tout → <b>rollback</b> (revenir à la version précédente en un geste). Si votre hébergeur garde les déploiements précédents, c'est un bouton ; sinon c'est un plan à écrire.</p>
      <p>C'est le niveau 5 : votre app ne fait pas que marcher — <b>vous savez qu'elle marche</b>, et vous savez quoi faire quand elle ne marche plus.</p>`,
    steps: ["Ouvrez Claude Code sur votre projet déployé (ou le plus proche de l'être)", "Collez le prompt", "Transformez le résultat en checklist et traitez un point par session"],
    prompt: `Établis le plan "prêt pour la prod" de mon app [décrivez-la + hébergeur], en auditant l'existant d'abord :

1. État des lieux : environnements, logs actuels, suivi d'erreurs, sauvegardes, procédure de rollback — qu'est-ce qui existe, qu'est-ce qui manque ?
2. Pour chaque manque : la solution la plus simple adaptée à MA stack (pas l'usine à gaz), son coût (gratuit ?), et la phrase à te dire pour la mettre en place.
3. Écris mon "runbook d'incident" : si l'app est en panne un samedi, les 5 étapes exactes que je suis, dans l'ordre, avec les commandes.
4. Que faut-il ne JAMAIS logger (données personnelles, secrets) dans mon cas ?`,
    checks: ["Je sais ce qui sépare mon app actuelle d'une app prête pour la prod", "J'ai un plan de rollback et un runbook d'incident écrits"],
  },

  /* ───────── L'ART DU PROMPT ───────── */
  {
    id: "prompt-anatomie", branch: "prompt", x: 940, y: 610, title: "Anatomie d'un bon prompt",
    lesson: `<p>Un prompt efficace répond à quatre questions :</p>
      <div class="visual">
        <div class="vbox"><b>Contexte</b><span>qui je suis, le projet, ce qui existe déjà</span></div>
        <div class="vbox"><b>Objectif</b><span>le résultat attendu, pas la liste des étapes</span></div>
        <div class="vbox"><b>Contraintes</b><span>limites, style, ce qu'il ne faut PAS faire</span></div>
        <div class="vbox"><b>Format</b><span>la forme de la réponse : code, plan, tableau…</span></div>
      </div>
      <p>« Fais-moi un site de recettes » force Claude à inventer 50 décisions à votre place. « Site d'une page pour mes 12 recettes familiales, ambiance carnet manuscrit, sans compte utilisateur, un seul fichier HTML » : mêmes 30 secondes, résultat sans comparaison. Avec les modèles récents, préférez <b>énoncer le but et les contraintes</b> plutôt que de dicter les étapes — et donnez la spécification complète dès le premier message plutôt qu'au compte-gouttes.</p>`,
    steps: ["Retrouvez un de vos anciens prompts au résultat moyen", "Collez le prompt ci-dessous dans Claude avec votre ancien prompt dedans", "Envoyez la version réécrite dans une nouvelle conversation et comparez"],
    prompt: `Voici un prompt que j'ai utilisé récemment : "[collez votre ancien prompt]".

1. Analyse-le selon 4 critères : contexte fourni, objectif clair, contraintes posées, format de sortie demandé. Note chaque critère sur 5 avec une phrase.
2. Liste les décisions que tu aurais dû inventer à ma place à cause des manques.
3. Réécris-le en version complète — hypothèses plausibles entre [crochets] là où il me manque des infos.`,
    checks: ["J'ai comparé ancien et nouveau prompt sur un vrai résultat", "Je connais les 4 ingrédients et je sais lequel j'oublie le plus souvent"],
  },
  {
    id: "prompt-contexte", branch: "prompt", x: 1060, y: 695, title: "Donner le pourquoi",
    lesson: `<p>Claude travaille mieux quand il comprend <b>l'intention</b>. Dire « ajoute un bouton export » force une interprétation ; dire « mes utilisateurs sont des profs qui impriment les résultats pour leurs élèves — ajoute un export » oriente cent micro-décisions dans le bon sens.</p>
      <p>La formule : <b>« Je travaille sur [le projet] pour [ces gens]. Ils ont besoin de [ce que ça permet]. Avec ça en tête : [la demande]. »</b></p>
      <p>Et précisez le <b>niveau d'initiative</b> : « propose et justifie » quand vous explorez, « fais exactement ça, rien de plus » quand vous savez. Les modèles récents suivent les instructions très littéralement : l'ambiguïté entre ces deux modes est la source n°1 de résultats frustrants.</p>`,
    steps: ["Choisissez une vraie petite demande pour votre projet en cours", "Envoyez-la d'abord brute dans Claude, notez le résultat", "Envoyez la version avec le prompt ci-dessous dans une nouvelle conversation, comparez"],
    prompt: `Je travaille sur [votre projet] pour [qui sont les utilisateurs]. Ils ont besoin de [ce que ça leur permet de faire].

Avec ce contexte en tête : [votre demande].

Contraintes : [ce qui est imposé — techno, style, budget temps]. Niveau d'initiative attendu : [au choix : "fais exactement ça sans extra" OU "propose mieux si tu vois mieux, en justifiant"].`,
    checks: ["J'ai constaté la différence avec/sans contexte sur une vraie demande", "Je précise désormais le niveau d'initiative que j'attends"],
  },
  {
    id: "prompt-debug", branch: "prompt", x: 1165, y: 575, title: "Itérer & débugger",
    lesson: `<p>Quand ça casse, trois règles :</p>
      <p><b>1. Tout donner.</b> Le message d'erreur <b>entier</b>, ce que vous attendiez, ce qui s'est passé, ce que vous venez de changer.</p>
      <p><b>2. Une chose à la fois.</b> « Corrige le bouton ET change les couleurs ET ajoute une page » = trois chantiers entremêlés. Itérez par petites demandes vérifiables.</p>
      <p><b>3. Comprendre avant de corriger.</b> « Explique la cause probable avant de proposer un correctif » : vous apprenez à chaque bug, et Claude corrige la cause plutôt que le symptôme. Après deux tentatives échouées, exigez un <b>diagnostic différent</b> plutôt qu'une troisième rustine — et dans Claude Code, <code>/rewind</code> permet de revenir à l'état d'avant les rustines.</p>`,
    steps: ["Attendez votre prochain bug (il viendra 🙂) ou reprenez le dernier", "Remplissez le prompt ci-dessous — la commande /debug de la Forge le fait aussi", "Exigez l'explication de cause avant d'accepter le correctif"],
    prompt: `J'ai un bug. Rapport complet :

- Ce que j'attendais : [comportement attendu]
- Ce qui se passe réellement : [comportement observé]
- Message d'erreur exact (s'il y en a un) : [collez-le en entier]
- Dernière modification avant l'apparition du bug : [ce qui a changé]

Avant de corriger : explique-moi la cause probable en termes simples, et comment tu comptes la vérifier. Ensuite seulement, propose le correctif minimal — sans réécrire ce qui marche déjà.`,
    checks: ["J'ai résolu un vrai bug avec ce rapport structuré", "J'ai demandé (et compris) la cause avant le correctif"],
  },

  /* ───────── OUTILS CLAUDE ───────── */
  {
    id: "claude-ai", branch: "claude", x: 935, y: 345, title: "Projects & Artifacts",
    lesson: `<p>Sur <b>claude.ai</b>, deux outils transforment le chat en atelier :</p>
      <p><b>Les Projects</b> : un espace durable par produit, avec des <b>instructions personnalisées</b> (appliquées à toutes les conversations du projet), une base de <b>connaissances</b> (vos specs, docs — jusqu'à 30 Mo par fichier ; sur les plans payants, le mode RAG étend la capacité jusqu'à ~10×), des connecteurs <b>GitHub et Google Drive</b> pour importer du contenu, et une <b>mémoire propre au projet</b>, séparée du reste.</p>
      <p><b>Les Artifacts</b> : le contenu substantiel (page web, app React, document, SVG, diagramme) apparaît dans un panneau dédié, itérable et <b>publiable/partageable</b>. C'est votre atelier de prototypage : une vraie app qui tourne, sans rien installer.</p>`,
    steps: ["Sur claude.ai, créez un Project dédié à votre app principale", "Collez le prompt ci-dessous pour générer vos instructions personnalisées", "Copiez le résultat dans les instructions du Project, ajoutez vos specs en connaissances, puis demandez un prototype d'écran en artifact"],
    prompt: `Aide-moi à rédiger les instructions personnalisées de mon Project Claude consacré à ce produit : [décrivez votre app, vos utilisateurs, votre niveau technique, vos préférences].

Les instructions doivent tenir en moins de 250 mots et couvrir : qui je suis et mon niveau (vibe coder expérimenté, non-développeur), le produit et ses utilisateurs, mes conventions (langue, ton, stack), et comment je veux que tu travailles avec moi (expliquer les choix techniques, demander avant les gros changements, livrer du code complet et fonctionnel).`,
    checks: ["Mon Project existe avec instructions personnalisées et connaissances", "J'ai produit au moins un artifact fonctionnel dans ce Project"],
  },
  {
    id: "claude-code", branch: "claude", x: 1045, y: 255, title: "Claude Code",
    lesson: `<p><b>Claude Code</b>, c'est Claude en mode <b>agent</b> : il lit vos fichiers, modifie le code, lance des commandes, committe, ouvre des pull requests — dans un vrai projet. Disponible en <b>terminal</b> (CLI), sur le <b>web</b> (claude.ai/code), en <b>app desktop Mac</b> et dans <b>VS Code/JetBrains</b>.</p>
      <p>Les gestes qui changent tout : <b>Shift+Tab</b> cycle les modes (dont le <b>plan mode</b> : Claude propose un plan avant de toucher au code), <b>Esc Esc</b> ouvre le <b>rewind</b> (revenir à un point antérieur, code et conversation), <code>!</code> exécute une commande shell directe, <code>@fichier</code> référence un fichier précis, <b>Ctrl+O</b> ouvre le transcript complet.</p>
      <p>Votre rôle : <b>directeur de travaux</b>. Objectif clair dès le premier message (<code>/goal</code> existe pour ça), plan validé, relecture des diffs (<code>/diff</code>), et le Codex de VibeLab comme carte complète de l'outillage.</p>`,
    steps: ["Ouvrez une session Claude Code sur un dépôt (terminal, desktop Mac ou claude.ai/code)", "Collez le prompt ci-dessous tel quel", "Puis testez dans la foulée : Shift+Tab (plan mode), /context, /diff, Esc Esc"],
    prompt: `Explore ce projet et fais-m'en la visite guidée pour un vibe coder expérimenté mais non-développeur :

1. À quoi sert chaque dossier et fichier important (une ligne chacun).
2. Par où "entre" l'application quand elle démarre, et le chemin d'une action utilisateur à travers le code.
3. Les 3 fichiers que je dois connaître parce que tout passe par eux.
4. Ce qui te semble fragile ou inhabituel, sans rien modifier.
5. Enfin : propose-moi 3 commandes slash ou réglages Claude Code qui seraient particulièrement utiles sur CE projet, et pourquoi.`,
    checks: ["J'ai exploré un vrai dépôt avec Claude Code", "Je pratique plan mode, /diff et le rewind (Esc Esc)"],
  },
  {
    id: "skills", branch: "claude", x: 1160, y: 325, title: "Skills & commandes",
    lesson: `<p>Trois étages pour apprendre vos habitudes à Claude Code :</p>
      <p><b>CLAUDE.md</b> : lu à chaque session (projet : <code>./CLAUDE.md</code> ; perso : <code>~/.claude/CLAUDE.md</code> ; local non partagé : <code>CLAUDE.local.md</code>). Visez moins de 200 lignes, du spécifique (« indentation 2 espaces », pas « code propre »), et des imports <code>@fichier.md</code> pour le reste.</p>
      <p><b>Les skills</b> : un dossier <code>.claude/skills/mon-skill/SKILL.md</code> avec un frontmatter (name, description, argument-hint, allowed-tools, model, context: fork…). Invocables en <code>/mon-skill</code> ET utilisables par Claude de lui-même quand la tâche s'y prête. Les substitutions <code>$ARGUMENTS</code>, <code>$1</code>, et l'injection <code>!\`commande\`</code> (exécutée avant lecture) en font de vrais petits programmes. L'ancien format <code>.claude/commands/*.md</code> reste supporté.</p>
      <p><b>Le partage</b> : un skill commité dans le projet profite à toute l'équipe ; un skill dans <code>~/.claude/skills/</code> vous suit partout.</p>`,
    steps: ["Dans Claude Code sur votre projet, collez le prompt", "Relisez le CLAUDE.md et le skill proposés, faites-les ajuster avant d'accepter", "Testez votre nouvelle commande : /grillme directement dans Claude Code"],
    prompt: `Deux missions, propose avant d'écrire :

1. Crée le CLAUDE.md de ce projet pour un vibe coder expérimenté : description en 3 lignes, conventions (langue, style, libs choisies), commandes utiles (lancer/tester/déployer), et une section "Façon de travailler avec moi" (expliquer les choix, plan avant gros changement, ne jamais supprimer de fonctionnalité sans demander). Moins de 200 lignes.

2. Crée un skill /grillme dans .claude/skills/grillme/SKILL.md : il prend mon prompt en argument ($ARGUMENTS), le critique selon contexte/objectif/contraintes/format, le note sur 10 et le réécrit. Ajoute le frontmatter complet (name, description, argument-hint).

Explique-moi chaque champ du frontmatter au passage.`,
    checks: ["Mon projet a un CLAUDE.md et au moins un skill maison qui fonctionne", "Je sais où vivent skills projet vs perso, et ce que fait le frontmatter"],
  },
  {
    id: "mcp", branch: "claude", x: 1190, y: 465, title: "MCP & connexions",
    lesson: `<p>Le <b>MCP (Model Context Protocol)</b> est la prise universelle qui branche Claude au reste : un <b>serveur MCP</b> expose les outils d'un service — GitHub, Slack, une base de données, un outil interne — et Claude peut <b>lire et agir</b> dessus en pleine conversation.</p>
      <p>Dans Claude Code : <code>claude mcp add</code> (transports stdio, SSE ou HTTP), trois <b>portées</b> — locale (vous), projet (<code>.mcp.json</code> commité, toute l'équipe), user (tous vos projets) — et <code>/mcp</code> pour gérer connexions et authentification OAuth en session. Les ressources MCP se référencent en <code>@serveur/ressource</code>, et les serveurs peuvent exposer des prompts qui deviennent des commandes <code>/mcp__serveur__prompt</code>.</p>
      <p>Réflexe : chaque connexion donne du <b>pouvoir d'agir</b>. Demandez-vous ce que l'outil pourra lire et modifier, et n'accordez que le nécessaire.</p>`,
    steps: ["Ouvrez Claude Code", "Collez le prompt complété avec vos outils du quotidien", "Installez LA connexion recommandée avec claude mcp add, puis vérifiez avec /mcp"],
    prompt: `Mon flux : je vibecode avec Claude Code, mon code vit sur [GitHub/autre], je déploie sur [Render/Netlify/autre], et j'utilise au quotidien [vos outils : Linear, Notion, Slack, Drive…].

1. Pour 3 de ces outils, explique ce qu'un serveur MCP permettrait : ce que Claude pourrait lire, faire, avec un scénario concret pour MON flux.
2. Pour chacun : le pouvoir que je lui donne et la prudence à avoir.
3. Recommande LA connexion par laquelle commencer, et donne-moi la commande claude mcp add exacte (avec le bon transport et la bonne portée locale/projet/user) pour l'installer.`,
    checks: ["J'ai installé et utilisé au moins un serveur MCP réel", "Je sais choisir la portée (local/projet/user) et ce que je délègue comme pouvoir"],
  },
  {
    id: "subagents", branch: "claude", x: 975, y: 150, title: "Sous-agents & parallélisme",
    lesson: `<p>Un <b>sous-agent</b> est un Claude délégué avec son <b>propre contexte</b> : il explore, travaille, et ne rapporte que sa conclusion — votre conversation principale reste légère. Claude Code en a d'intégrés (<b>Explore</b> en lecture seule, <b>Plan</b> pour l'architecture, <b>general-purpose</b>) et vous pouvez créer les vôtres : un fichier <code>.claude/agents/relecteur.md</code> avec frontmatter (name, description, tools autorisés, model) + un prompt système.</p>
      <p>Le <b>parallélisme</b> est le superpouvoir associé : plusieurs sous-agents fan-out sur des tâches indépendantes (lire 10 fichiers, vérifier 5 pistes), pendant que <code>--worktree</code> isole des chantiers git complets et que les <b>background agents</b> (<code>/background</code>, <code>/tasks</code>) travaillent pendant que vous faites autre chose.</p>
      <p>Quand déléguer : tâches <b>indépendantes ou volumineuses</b> dont seul le résumé vous intéresse. Quand ne pas déléguer : une lecture simple, une édition séquentielle.</p>`,
    steps: ["Dans Claude Code sur votre projet, collez le prompt", "Relisez l'agent proposé, ajustez sa description (c'est elle qui déclenche son usage automatique)", "Testez : demandez une relecture et vérifiez que Claude délègue bien à votre agent"],
    prompt: `Crée un sous-agent "relecteur-vibe" dans .claude/agents/ pour ce projet :

- Rôle : relire les changements récents du point de vue d'un développeur senior bienveillant envers un vibe coder : bugs probables, sécurité, sur-ingénierie, et UNE leçon pédagogique par relecture.
- Outils : lecture seule (pas d'édition).
- Frontmatter complet (name, description précise pour le déclenchement automatique, tools).

Propose le fichier, explique chaque champ, puis montre-moi deux façons de l'utiliser : invocation explicite, et une phrase de demande qui devrait le déclencher automatiquement. Enfin, explique-moi avec MON projet ce que les worktrees (--worktree) m'apporteraient.`,
    checks: ["Mon projet a un sous-agent maison qui fonctionne", "Je sais quand déléguer (et quand pas) et à quoi servent les worktrees"],
  },
  {
    id: "hooks", branch: "claude", x: 1115, y: 140, title: "Hooks & automatisations",
    lesson: `<p>Les <b>hooks</b> sont des scripts déclenchés automatiquement par les événements de Claude Code : <code>PreToolUse</code> (avant chaque outil — peut <b>bloquer</b>), <code>PostToolUse</code> (après — peut transformer), <code>SessionStart</code>, <code>UserPromptSubmit</code>, <code>Stop</code>, <code>PreCompact</code>… configurés dans <code>settings.json</code> avec des <b>matchers</b> (« seulement les commandes Bash », « seulement les éditions »).</p>
      <p>La différence fondamentale avec une instruction CLAUDE.md : l'instruction est une <b>demande</b> que le modèle suit (presque toujours) ; le hook est une <b>garantie</b> que la machine applique (toujours). Interdire <code>rm -rf</code>, lancer le formateur après chaque édition, recharger l'environnement au démarrage : ce sont des hooks, pas des prières.</p>
      <p>Le duo gagnant du vibe coder : instructions pour le <b>style</b>, hooks pour les <b>interdits et les automatismes</b>.</p>`,
    steps: ["Dans Claude Code, tapez /hooks pour voir l'existant", "Collez le prompt et choisissez UN hook à installer pour de vrai", "Vérifiez son déclenchement (faites faire une édition, regardez le formateur passer)"],
    prompt: `Apprends-moi les hooks en m'équipant :

1. Propose 3 hooks concrètement utiles pour MON projet et MA pratique de vibe coder, parmi : bloquer les commandes destructrices (rm -rf, drop table…), formater automatiquement après chaque édition, vérifier qu'aucun secret ne part dans un commit, recharger l'environnement au démarrage de session. Pour chacun : l'événement utilisé (PreToolUse/PostToolUse/SessionStart…), le matcher, et le script.
2. Installe celui que je choisis dans la configuration adaptée (settings projet ou perso ? justifie).
3. Démontre qu'il fonctionne (déclenche-le devant moi).
4. Explique la règle d'or : qu'est-ce qui doit être un hook, qu'est-ce qui doit rester une instruction CLAUDE.md ?`,
    checks: ["J'ai un hook actif et je l'ai vu se déclencher", "Je sais ce qui relève du hook (garantie) vs de l'instruction (demande)"],
  },
];

VL.EDGES = [
  ["hub","anatomie"], ["anatomie","frontend"], ["frontend","backend"], ["backend","data"], ["data","ship"],
  ["ship","http"], ["http","dom"], ["dom","css"],
  ["css","sql"], ["sql","auth"], ["auth","state"],
  ["state","tooling"], ["tooling","tests"], ["tests","secu"],
  ["secu","apidesign"], ["apidesign","perf"], ["perf","prod"],
  ["hub","prompt-anatomie"], ["prompt-anatomie","prompt-contexte"], ["prompt-contexte","prompt-debug"],
  ["hub","claude-ai"], ["claude-ai","claude-code"], ["claude-code","skills"], ["skills","mcp"],
  ["claude-code","subagents"], ["subagents","hooks"],
];

/* ════════════════ LA FORGE ════════════════ */
VL.COMMANDS = [
  {
    id: "grillme", name: "/grillme", cc: true,
    desc: "Faites griller votre prompt avant de l'envoyer : critique sans pitié, note sur 10, version réécrite.",
    fields: [{ key: "p", label: "Votre prompt à griller", type: "textarea", ph: "Collez ici le prompt que vous comptiez envoyer…" }],
    build: f => `Agis comme un relecteur de prompts impitoyable mais constructif. Voici le prompt que je m'apprête à envoyer à une IA pour du vibe coding :

---
${f.p || "[votre prompt]"}
---

1. GRILLE-LE : passe-le au crible (contexte fourni ? objectif net ? contraintes posées ? format de sortie ? ambiguïtés ? décisions laissées au hasard ?). Sois précis et un peu piquant.
2. NOTE-LE sur 10, avec la phrase qui justifie la note.
3. RÉÉCRIS-LE en version irréprochable, en gardant mon intention. Mets entre [crochets] ce que toi seul ne peux pas savoir.
4. Donne-moi LA leçon n°1 à retenir pour mes prochains prompts.`,
  },
  {
    id: "plan", name: "/plan", cc: true,
    desc: "Transformez une idée de fonctionnalité en plan d'implémentation lisible — avant d'écrire la moindre ligne. (Dans Claude Code : le plan mode via Shift+Tab fait équipe avec ce prompt.)",
    fields: [
      { key: "app", label: "Votre app (1 phrase)", type: "input", ph: "ex. un carnet de recettes familial en ligne" },
      { key: "feat", label: "La fonctionnalité à planifier", type: "textarea", ph: "ex. permettre aux cousins de commenter chaque recette" },
    ],
    build: f => `Mon app : ${f.app || "[votre app]"}.
Je veux ajouter : ${f.feat || "[la fonctionnalité]"}.

Avant tout code, fais-moi un plan d'implémentation pour non-développeur :
1. Reformule la fonctionnalité et pose les 3 questions qui changeraient le plan si je répondais différemment.
2. Découpe en étapes ordonnées, chacune testable par moi ("tu sauras que ça marche quand…").
3. Pour chaque étape : quelle couche est touchée (frontend / backend / données) et pourquoi.
4. Signale ce qui est plus compliqué qu'il n'y paraît, et la version simplifiée si je veux aller vite.
N'écris AUCUN code pour l'instant — on valide le plan d'abord.`,
  },
  {
    id: "debug", name: "/debug", cc: true,
    desc: "Le rapport de bug parfait : Claude trouve la cause au lieu de poser des rustines.",
    fields: [
      { key: "want", label: "Ce que j'attendais", type: "input", ph: "ex. le bouton enregistre la note" },
      { key: "got", label: "Ce qui se passe réellement", type: "input", ph: "ex. rien ne se passe, la note disparaît" },
      { key: "err", label: "Message d'erreur (en entier, ou « aucun »)", type: "textarea", ph: "Uncaught TypeError: …" },
    ],
    build: f => `J'ai un bug. Rapport complet :

- Attendu : ${f.want || "[comportement attendu]"}
- Observé : ${f.got || "[comportement réel]"}
- Message d'erreur exact : ${f.err || "[aucun]"}
- Dernier changement avant le bug : [ce que vous venez de modifier]

Méthode imposée :
1. Explique-moi la cause probable en termes simples, et comment tu vas la vérifier.
2. Propose le correctif MINIMAL — sans réécrire ce qui marche.
3. Dis-moi comment vérifier moi-même que c'est réglé.
4. Termine par : qu'est-ce que ce bug m'apprend pour éviter le suivant ?`,
  },
  {
    id: "explique", name: "/explique",
    desc: "Faites-vous expliquer du code ou un concept exactement à votre niveau — avec quiz de vérification.",
    fields: [{ key: "sub", label: "Le code ou le concept", type: "textarea", ph: "Collez du code, ou écrivez « les webhooks », « async/await », « le N+1 »…" }],
    build: f => `Explique-moi ceci comme à un vibe coder expérimenté mais non-développeur :

---
${f.sub || "[le code ou concept]"}
---

Format : 1) l'idée en UNE phrase avec une métaphore du quotidien ; 2) le détail, progressivement, chaque terme technique défini à sa première apparition ; 3) où ça se situe dans une app (frontend / backend / données) ; 4) la confusion classique des débutants sur ce sujet ; 5) trois questions rapides pour vérifier que j'ai compris — attends mes réponses avant de me corriger.`,
  },
  {
    id: "debrief", name: "/debrief",
    desc: "Après une session de vibe coding : transformez ce qui vient de se passer en compétences durables.",
    fields: [{ key: "sess", label: "Votre session en quelques lignes", type: "textarea", ph: "ex. on a créé la page d'accueil, galéré sur le menu mobile, ajouté un mode sombre…" }],
    build: f => `Voici ce qu'on vient de faire dans ma session de vibe coding : ${f.sess || "[résumé de la session]"}.

Fais-moi un débrief de coach :
1. Les 3 concepts techniques qui sont passés dans cette session, expliqués simplement — c'est mon programme de révision.
2. LE moment où un peu plus de connaissance m'aurait fait gagner du temps : qu'est-ce que j'aurais dû savoir ?
3. Mes prompts de la session : qu'est-ce qui était bien, qu'est-ce qui t'a manqué ?
4. Trois questions à creuser avant la prochaine session pour progresser comme vibe coder.`,
  },
  {
    id: "risques", name: "/risques",
    desc: "Avant de partager votre app au monde : la revue sécurité / données / coûts en langage humain.",
    fields: [{ key: "app", label: "Votre app et qui va l'utiliser", type: "textarea", ph: "ex. un formulaire de réservation pour mon association, ~200 personnes, avec noms et emails" }],
    build: f => `Mon application : ${f.app || "[décrivez l'app et ses utilisateurs]"}. Je m'apprête à la partager publiquement.

Fais une revue de pré-lancement pour non-développeur, sévérité par point (🔴 bloquant / 🟠 à faire vite / 🟢 plus tard) :
1. Sécurité : secrets exposés, entrées non vérifiées, qui peut faire quoi sans permission ?
2. Données personnelles : qu'est-ce que je collecte, où ça vit, qu'est-ce que je dois dire à mes utilisateurs (RGPD) ?
3. Coûts : qu'est-ce qui peut devenir payant ou exploser si 100× plus de monde arrive ?
4. Solidité : que voit l'utilisateur quand quelque chose plante ?
Pour chaque 🔴, dis-moi exactement quoi demander à Claude Code pour le régler.`,
  },
  {
    id: "spec", name: "/spec", cc: true,
    desc: "Transformez une idée floue en spécification complète — LE document à donner à Claude Code dès le premier message pour une session autonome réussie.",
    fields: [{ key: "idea", label: "Votre idée, même floue", type: "textarea", ph: "ex. une app pour organiser les tournois de pétanque du village…" }],
    build: f => `Mon idée : ${f.idea || "[votre idée]"}.

Transforme-la en spécification exploitable par un agent de code autonome. Interroge-moi d'abord : pose-moi les 5 questions dont les réponses changent le plus la conception (utilisateurs, plateformes, données, contraintes, critère de succès). Attends mes réponses.

Ensuite, produis la spec complète : 1) objectif et utilisateurs ; 2) fonctionnalités par priorité (MVP / ensuite / un jour) ; 3) parcours utilisateur principal écran par écran ; 4) données manipulées et leur persistance ; 5) contraintes (stack, design, budget) ; 6) ce qui est explicitement HORS périmètre ; 7) critères de "terminé" vérifiables. Format markdown, prêt à coller en premier message d'une session Claude Code.`,
  },
  {
    id: "stack", name: "/stack",
    desc: "Choisir sa stack technique sans subir la mode : un comparatif honnête calibré sur VOTRE projet et VOTRE niveau.",
    fields: [
      { key: "proj", label: "Le projet", type: "textarea", ph: "ex. une marketplace de cours de musique, paiements, ~500 utilisateurs visés" },
      { key: "ctx", label: "Votre contexte", type: "input", ph: "ex. vibe coder, 6 mois d'expérience, budget 0€, déjà à l'aise avec Render" },
    ],
    build: f => `Projet : ${f.proj || "[votre projet]"}.
Mon contexte : ${f.ctx || "[votre niveau, budget, habitudes]"}.

Recommande-moi une stack complète (frontend, backend, base de données, auth, hébergement) en raisonnant ainsi :
1. D'abord les BESOINS objectifs du projet (pas les outils) : qu'est-ce qui est structurant ?
2. Pour chaque couche : ton choix recommandé + UNE alternative crédible, avec le compromis en une phrase. Privilégie ce qu'un agent IA maîtrise bien et ce qui a le moins de pièces mobiles.
3. Ce que ce choix me coûtera à 10× plus d'utilisateurs (migration douloureuse ou simple upgrade ?).
4. La liste exacte des services à créer (comptes, clés) avant de lancer Claude Code, dans l'ordre.`,
  },

  /* ───── Forges d'artefacts : fichiers et configs réels, règles du Codex appliquées ───── */
  {
    id: "fskill", name: "Forge de skill", cat: "artefact",
    desc: "Génère un SKILL.md complet et valide pour Claude Code — en appliquant les contraintes exactes du format officiel.",
    fields: [
      { key: "nom", label: "Nom de la skill (minuscules-et-tirets)", type: "input", ph: "ex. revue-design" },
      { key: "desc", label: "Description : ce qu'elle fait ET quand l'utiliser (3e personne)", type: "input", ph: "ex. Vérifie la cohérence visuelle des écrans. À utiliser après toute modification d'interface." },
      { key: "corps", label: "Les instructions (le prompt que la skill exécute)", type: "textarea", ph: "ex. Passe en revue les changements d'interface : cohérence des couleurs avec les design tokens, espacements, responsive…" },
      { key: "hint", label: "Indice d'argument (optionnel)", type: "input", ph: "ex. [écran ou composant]" },
    ],
    check: f => {
      const slug = (f.nom || "").toLowerCase().trim().replace(/\s+/g, "-");
      return [
        { ok: /^[a-z0-9-]{1,64}$/.test(slug), msg: "name : 1-64 caractères, minuscules/chiffres/tirets uniquement (règle officielle)" },
        { ok: slug && !/(claude|anthropic)/.test(slug), msg: "name : les mots « claude » et « anthropic » sont interdits" },
        { ok: (f.desc || "").length > 0 && (f.desc || "").length <= 1024, msg: "description : non vide, 1024 caractères max — c'est ELLE qui déclenche l'usage automatique" },
        { ok: (f.corps || "").length > 0, msg: "corps : les instructions que Claude lira au déclenchement" },
      ];
    },
    learn: [
      "Seule la description vit en permanence dans le contexte (~100 tokens) ; le corps n'est chargé qu'au déclenchement — c'est la progressive disclosure.",
      "$ARGUMENTS sera remplacé par ce que vous tapez après /votre-skill.",
      "Commitée dans .claude/skills/, la skill profite à toute l'équipe ; dans ~/.claude/skills/, elle vous suit partout.",
    ],
    build: f => {
      const slug = (f.nom || "ma-skill").toLowerCase().trim().replace(/\s+/g, "-");
      return `--- FICHIER : .claude/skills/${slug}/SKILL.md ---

---
name: ${slug}
description: ${f.desc || "[ce qu'elle fait et quand l'utiliser]"}${f.hint ? `
argument-hint: "${f.hint}"` : ""}
---

${f.corps || "[Instructions que Claude exécutera]"}

Sujet fourni : $ARGUMENTS

--- INSTALLATION (terminal, à la racine du projet) ---

mkdir -p .claude/skills/${slug}
# collez le bloc ci-dessus dans .claude/skills/${slug}/SKILL.md
# (ou demandez à Claude Code : « crée cette skill » en lui collant tout)

--- TEST ---

Dans Claude Code : /${slug} [votre sujet]
La skill peut aussi se déclencher toute seule si la description correspond à la tâche.`;
    },
  },
  {
    id: "fhook", name: "Forge de hook", cat: "artefact",
    desc: "Génère la configuration settings.json d'un hook — la garantie machine que le Codex documente, prête à coller.",
    fields: [
      { key: "recette", label: "Recette", type: "select", options: [
        ["block", "Bloquer les commandes destructrices (PreToolUse)"],
        ["format", "Auto-formater après chaque édition (PostToolUse)"],
        ["env", "Protéger les fichiers .env (PreToolUse)"],
        ["start", "Charger du contexte au démarrage (SessionStart)"],
      ]},
      { key: "extra", label: "Personnalisation (optionnel)", type: "input", ph: "ex. commande de format : npx prettier --write / motifs à bloquer…" },
    ],
    learn: [
      "Instruction CLAUDE.md = demande que le modèle suit (presque toujours). Hook = garantie que la machine applique (toujours).",
      "Exit code 2 dans un hook PreToolUse = blocage, et le message stderr est renvoyé à Claude pour qu'il s'adapte.",
      "settings.json projet (.claude/) = partagé via git ; settings.local.json = rien que vous ; ~/.claude/settings.json = tous vos projets.",
    ],
    build: f => {
      const R = {
        block: `--- À AJOUTER dans .claude/settings.json ---

{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm -rf*)",
            "command": "echo 'Commande destructrice bloquée par hook VibeLab' >&2; exit 2"
          }
        ]
      }
    ]
  }
}

--- CE QUE ÇA FAIT ---
Avant CHAQUE commande Bash correspondant au motif, le script s'exécute :
exit 2 = appel bloqué, le message >&2 (stderr) est montré à Claude.
${f.extra ? `Personnalisation demandée : adaptez le "if" → ex. "Bash(${f.extra}*)".` : `Ajoutez d'autres motifs en dupliquant le bloc (drop table, git push --force…).`}`,
        format: `--- À AJOUTER dans .claude/settings.json ---

{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "${f.extra || "npx prettier --write \\\"$CLAUDE_FILE_PATHS\\\""}",
            "timeout": 30
          }
        ]
      }
    ]
  }
}

--- CE QUE ÇA FAIT ---
Après chaque édition/écriture de fichier, votre formateur passe automatiquement.
Plus jamais de diff pollué par du formatage. Vérifiez la commande de format
adaptée à votre stack (prettier, black, gofmt…).`,
        env: `--- À AJOUTER dans .claude/settings.json ---

{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Read|Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "case \\"$CLAUDE_FILE_PATHS\\" in *.env*) echo 'Fichier .env protégé par hook' >&2; exit 2;; esac"
          }
        ]
      }
    ]
  }
}

--- CE QUE ÇA FAIT ---
Claude ne peut plus lire ni modifier vos fichiers .env (secrets) — même si
un prompt malveillant ou une erreur le lui demandait. Garantie machine.`,
        start: `--- À AJOUTER dans .claude/settings.json ---

{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup",
        "hooks": [
          {
            "type": "command",
            "command": "${f.extra || "git log --oneline -5 && git status -sb"}"
          }
        ]
      }
    ]
  }
}

--- CE QUE ÇA FAIT ---
À chaque démarrage de session, la sortie de la commande est injectée en
contexte : Claude démarre en sachant où en est le projet (derniers commits,
état de la branche). Adaptez la commande : tickets en cours, état du déploiement…`,
      };
      return R[f.recette || "block"] + `

--- VÉRIFICATION ---
Tapez /hooks dans Claude Code pour voir le hook enregistré, puis provoquez
son déclenchement pour le voir agir.`;
    },
  },
  {
    id: "fagent", name: "Forge de sous-agent", cat: "artefact",
    desc: "Génère un fichier .claude/agents/ complet — un spécialiste délégué avec son contexte isolé et ses outils limités.",
    fields: [
      { key: "nom", label: "Nom de l'agent", type: "input", ph: "ex. relecteur-securite" },
      { key: "mission", label: "Sa mission (qui il est, ce qu'il vérifie, ce qu'il rend)", type: "textarea", ph: "ex. relire les changements comme un expert sécurité bienveillant : injections, secrets, validation…" },
      { key: "tools", label: "Pouvoirs", type: "select", options: [
        ["ro", "Lecture seule (Read, Grep, Glob) — relecteurs, auditeurs"],
        ["rb", "Lecture + Bash — peut lancer tests et builds"],
        ["all", "Tous les outils — peut modifier le code"],
      ]},
      { key: "model", label: "Modèle", type: "select", options: [
        ["inherit", "Hérité de la session (défaut)"],
        ["haiku", "haiku — rapide et économique (tri, exploration)"],
        ["sonnet", "sonnet — équilibré"],
        ["opus", "opus — maximum de profondeur"],
      ]},
    ],
    check: f => [
      { ok: !!(f.nom || "").trim(), msg: "nom : il devient le fichier et l'identité de l'agent" },
      { ok: (f.mission || "").length >= 30, msg: "mission : assez précise pour que le déclenchement automatique fonctionne (la description est le déclencheur)" },
    ],
    learn: [
      "Le sous-agent travaille dans SON contexte : il peut lire 50 fichiers, votre conversation ne reçoit que sa conclusion.",
      "La description du frontmatter pilote la délégation automatique — écrivez-la comme une condition (« Utiliser quand… »).",
      "Limiter les outils n'est pas de la méfiance, c'est du design : un relecteur qui ne PEUT PAS éditer est un relecteur fiable.",
    ],
    build: f => {
      const slug = (f.nom || "mon-agent").toLowerCase().trim().replace(/\s+/g, "-");
      const tools = { ro: "Read, Grep, Glob", rb: "Read, Grep, Glob, Bash", all: "" }[f.tools || "ro"];
      return `--- FICHIER : .claude/agents/${slug}.md ---

---
name: ${slug}
description: ${(f.mission || "").split(/[.!\n]/)[0] || "[mission en une phrase]"}. Utiliser pour toute tâche correspondante.${tools ? `
tools: ${tools}` : ""}${f.model && f.model !== "inherit" ? `
model: ${f.model}` : ""}
---

Tu es ${slug}, un agent spécialisé.

Mission : ${f.mission || "[décrivez la mission complète]"}

Méthode :
1. Explore d'abord ce qui est pertinent pour ta mission.
2. Travaille de façon autonome, sans poser de questions intermédiaires.
3. Rends une conclusion structurée et actionnable : constats classés par
   importance, et UNE recommandation prioritaire.
4. Termine par une leçon pédagogique : qu'est-ce que ton commanditaire
   (un vibe coder) devrait retenir de cette analyse ?

--- INSTALLATION ---

Enregistrez dans .claude/agents/${slug}.md (projet) ou ~/.claude/agents/ (perso).
Vérifiez avec /agents · Invocation : demandez une tâche qui correspond à la
description, ou explicitement : « utilise l'agent ${slug} pour… »`;
    },
  },
  {
    id: "fclaudemd", name: "Forge de CLAUDE.md", cat: "artefact",
    desc: "Génère le squelette de CLAUDE.md de votre projet selon les bonnes pratiques officielles (< 200 lignes, spécifique, impératif).",
    fields: [
      { key: "projet", label: "Le projet (2-3 lignes)", type: "textarea", ph: "ex. App de réservation pour mon association. Frontend vanilla JS, backend Node/Express, base SQLite, déployé sur Render." },
      { key: "conv", label: "Vos conventions", type: "input", ph: "ex. textes en français, indentation 2 espaces, pas de framework CSS" },
      { key: "cmds", label: "Commandes utiles (lancer / tester / déployer)", type: "input", ph: "ex. npm run dev · npm test · git push (auto-déploie)" },
    ],
    learn: [
      "CLAUDE.md est chargé à CHAQUE session : chaque ligne coûte du contexte en permanence — d'où la cible < 200 lignes.",
      "Spécifique bat vague : « indentation 2 espaces » fonctionne, « code propre » ne veut rien dire pour un modèle.",
      "Pour le volumineux : imports @docs/conventions.md, et .claude/rules/ avec frontmatter paths pour les règles par dossier.",
    ],
    build: f => `--- FICHIER : CLAUDE.md (racine du projet) ---

# ${(f.projet || "").split(/[.\n]/)[0] || "[Nom du projet]"}

${f.projet || "[Description : quoi, pour qui, stack]"}

## Conventions
${(f.conv || "[vos conventions]").split(/[,·;]/).map(c => "- " + c.trim()).join("\n")}

## Commandes
${(f.cmds || "[lancer / tester / déployer]").split(/[·;]/).map(c => "- " + c.trim()).join("\n")}

## Façon de travailler avec moi
- Je suis un vibe coder expérimenté, non-développeur : explique les choix
  techniques simplement, définis le jargon à la première occurrence.
- Propose un plan avant tout changement structurel ; pour les petites
  retouches, agis directement.
- Ne supprime jamais une fonctionnalité sans me demander.
- Livre du code complet et fonctionnel, jamais de fragments à assembler.
- Après chaque session significative : un résumé de ce que j'ai appris.

## Interdits
- Ne jamais committer .env ni aucun secret.
- Ne jamais pousser directement sur main : toujours une branche + PR.

--- ENSUITE ---
Relisez, coupez ce qui ne sert pas, et committez. /init dans Claude Code
peut aussi générer une base à fusionner avec celle-ci. /memory pour l'éditer.`,
  },
  {
    id: "fmcp", name: "Forge de connexion MCP", cat: "artefact",
    desc: "Génère la commande claude mcp add exacte (transport, portée) et le rituel de vérification sécurité.",
    fields: [
      { key: "nom", label: "Nom du serveur", type: "input", ph: "ex. github" },
      { key: "url", label: "URL ou commande du serveur", type: "input", ph: "ex. https://api.githubcopilot.com/mcp/" },
      { key: "transport", label: "Transport", type: "select", options: [
        ["http", "HTTP — serveur distant (le plus courant)"],
        ["sse", "SSE — serveur distant en Server-Sent Events"],
        ["stdio", "stdio — serveur local exécuté par Claude"],
      ]},
      { key: "scope", label: "Portée", type: "select", options: [
        ["local", "local — vous, ce projet (défaut)"],
        ["project", "project — .mcp.json commité, toute l'équipe"],
        ["user", "user — vous, tous vos projets"],
      ]},
    ],
    check: f => [
      { ok: !!(f.nom || "").trim() && !!(f.url || "").trim(), msg: "nom + URL/commande requis" },
      { ok: f.scope !== "project" || true, msg: "portée project = le serveur sera proposé à toute personne qui clone le dépôt" },
    ],
    learn: [
      "Portée local : ~/.claude (vous, ce projet) · project : .mcp.json commité (équipe) · user : tous vos projets.",
      "L'authentification OAuth se fait en session via /mcp — ne mettez jamais un token dans un fichier commité.",
      "Chaque serveur = du pouvoir d'agir pour l'IA : compte aux droits minimaux, et méfiance avec les serveurs non officiels.",
    ],
    build: f => `--- TERMINAL ---

claude mcp add --transport ${f.transport || "http"}${(f.scope && f.scope !== "local") ? ` --scope ${f.scope}` : ""} ${f.nom || "mon-serveur"} ${f.url || "[url-ou-commande]"}

--- VÉRIFICATION (dans Claude Code) ---

/mcp                     → état de la connexion, OAuth si nécessaire
claude mcp list          → inventaire de vos serveurs

--- RITUEL SÉCURITÉ AVANT PREMIER USAGE ---

Demandez à Claude : « Liste tous les outils exposés par ${f.nom || "ce serveur"},
et pour chacun : lecture ou écriture ? Quel est le pire scénario si un prompt
malveillant l'utilisait ? » — décidez ensuite ce que vous gardez activé (/mcp
permet de désactiver serveur par serveur).${f.scope === "project" ? `

Note : en portée project, .mcp.json est commité — toute l'équipe héritera de
cette connexion (chacun fera sa propre auth).` : ""}`,
  },
];

/* ════════════════ LE CODEX ════════════════
   Compilé depuis code.claude.com/docs et support.claude.com — juin 2026. */
VL.CODEX = [

  /* ── 1. Commandes slash intégrées ── */
  {
    id: "slash", short: "Slash intégrées", icon: "/", color: "#5EE6D0",
    title: "Commandes slash intégrées de Claude Code",
    sub: "La liste complète, par familles — source : code.claude.com/docs/en/commands",
    intro: `Tapez <code>/</code> dans Claude Code pour l'autocomplétion. Les entrées marquées <b>skill</b> sont des workflows intégrés (multi-étapes) ; <b>cloud</b> nécessite une session web/infra Anthropic. Supprimées récemment : <code>/vim</code> (remplacée par le mode éditeur dans /config) et <code>/pr-comments</code> (demandez directement à Claude).`,
    entries: [
      { name: "/help", desc: "Affiche l'aide et les commandes disponibles." },
      { name: "/status", desc: "Version, modèle, compte, connectivité — fonctionne même pendant que Claude répond." },
      { name: "/clear [nom]", desc: "Nouvelle conversation (la mémoire du projet reste). Alias : /reset, /new.", tags: ["session"] },
      { name: "/resume [session]", desc: "Reprend une conversation par nom/ID ou via un sélecteur. Alias : /continue.", tags: ["session"] },
      { name: "/branch [nom]", desc: "Crée une branche de la conversation actuelle — l'originale reste accessible via /resume.", tags: ["session"] },
      { name: "/fork <directive>", desc: "Lance un sous-agent qui hérite de toute la conversation et revient avec son résultat.", tags: ["session"] },
      { name: "/rename [nom]", desc: "Renomme la session (sans argument : nom généré depuis l'historique).", tags: ["session"] },
      { name: "/teleport", desc: "Rapatrie une session web (claude.ai/code) dans votre terminal. Alias : /tp.", tags: ["cloud"] },
      { name: "/model [modèle]", desc: "Change de modèle (opus, sonnet, haiku, fable ou ID complet) et le retient par défaut." },
      { name: "/effort [niveau]", desc: "Règle l'effort de raisonnement : low · medium · high · xhigh · max · ultracode · auto." },
      { name: "/fast", desc: "Bascule le mode rapide (Opus à sortie accélérée) — aussi via Option+O sur Mac." },
      { name: "/advisor [modèle|off]", desc: "Active un second modèle consulté en arrière-plan pour avis (opus, sonnet, fable…)." },
      { name: "/init", desc: "Initialise le CLAUDE.md du projet en analysant le code.", tags: ["mémoire"] },
      { name: "/memory", desc: "Édite CLAUDE.md, gère la mémoire automatique, parcourt les apprentissages.", tags: ["mémoire"] },
      { name: "/config", desc: "Réglages : thème, modèle, mode éditeur (vim), style de sortie. Alias : /settings." },
      { name: "/permissions", desc: "Gère les règles allow/ask/deny, répertoires accessibles, refus du mode auto. Alias : /allowed-tools." },
      { name: "/hooks", desc: "Visualise et gère les hooks configurés (événements + scripts)." },
      { name: "/keybindings", desc: "Ouvre ~/.claude/keybindings.json pour personnaliser les raccourcis." },
      { name: "/mcp [sous-cmd]", desc: "Gère les serveurs MCP : connexions, OAuth, enable/disable, reconnect." },
      { name: "/agents", desc: "Gère les sous-agents (intégrés et personnalisés) via un sélecteur." },
      { name: "/plugins", desc: "Liste, installe, active, désactive les plugins. Alias : /plugin." },
      { name: "/context [all]", desc: "Visualise l'occupation du contexte en grille colorée, avec suggestions d'optimisation.", tags: ["contexte"] },
      { name: "/compact [instructions]", desc: "Résume la conversation pour libérer du contexte (instructions de résumé optionnelles).", tags: ["contexte"] },
      { name: "/recap", desc: "Génère un résumé d'une ligne de la session à la demande.", tags: ["contexte"] },
      { name: "/tasks", desc: "Liste et gère tout ce qui tourne en arrière-plan (agents, commandes). Alias : /bashes.", tags: ["parallèle"] },
      { name: "/background [prompt]", desc: "Détache la session en agent d'arrière-plan et rend la main. Alias : /bg.", tags: ["parallèle"] },
      { name: "/batch <instruction>", desc: "Décompose un travail en 5-30 unités parallèles (worktrees + PR automatiques). Git requis.", tags: ["skill", "parallèle"] },
      { name: "/loop [intervalle] [prompt]", desc: "Exécute un prompt en boucle (ex. /loop 5m vérifier le déploiement). Alias : /proactive.", tags: ["skill", "parallèle"] },
      { name: "/plan [description]", desc: "Entre en plan mode : Claude propose un plan avant de toucher au code (aussi : Shift+Tab)." },
      { name: "/diff", desc: "Visionneuse interactive des changements non commités (flèches pour naviguer)." },
      { name: "/code-review [effort] [--fix|--comment]", desc: "Relit le diff : bugs et simplifications. --fix applique, --comment poste sur la PR.", tags: ["skill"] },
      { name: "/simplify [cible]", desc: "Passe de nettoyage (réutilisation, simplification) sans chasse aux bugs — 4 agents parallèles.", tags: ["skill"] },
      { name: "/review [PR]", desc: "Relit une pull request localement." },
      { name: "/security-review", desc: "Analyse les changements de la branche à la recherche de vulnérabilités.", tags: ["skill"] },
      { name: "/export [fichier]", desc: "Exporte la conversation (presse-papiers ou fichier)." },
      { name: "/copy [N]", desc: "Copie la dernière (ou Nième) réponse de Claude, avec sélecteur de blocs." },
      { name: "/ide", desc: "Connecte/affiche l'intégration IDE (VS Code, JetBrains)." },
      { name: "/chrome", desc: "Configure l'intégration Claude in Chrome (pilotage du navigateur)." },
      { name: "/install-github-app", desc: "Assistant d'installation de l'app GitHub Actions de Claude." },
      { name: "/install-slack-app", desc: "Installe l'app Slack de Claude (flux OAuth)." },
      { name: "/remote-control", desc: "Rend la session pilotable depuis claude.ai (mobile compris). Alias : /rc.", tags: ["cloud"] },
      { name: "/desktop", desc: "Continue la session dans l'app desktop (Mac/Windows). Alias : /app." },
      { name: "/mobile", desc: "QR code pour continuer sur l'app mobile. Alias : /ios, /android." },
      { name: "/voice [hold|tap|off]", desc: "Dictée vocale (maintenir ou taper Espace)." },
      { name: "/schedule [description]", desc: "Crée des routines planifiées exécutées sur l'infra cloud. Alias : /routines.", tags: ["cloud"] },
      { name: "/ultraplan <prompt>", desc: "Rédige un plan dans une session cloud dédiée, à relire dans le navigateur.", tags: ["cloud"] },
      { name: "/ultrareview [PR]", desc: "Revue profonde multi-agents en sandbox cloud (= /code-review ultra).", tags: ["cloud", "skill"] },
      { name: "/autofix-pr [prompt]", desc: "Lance une session web qui surveille votre PR et pousse les corrections (CI rouge, revues).", tags: ["cloud"] },
      { name: "/remote-env", desc: "Choisit l'environnement par défaut des agents cloud.", tags: ["cloud"] },
      { name: "/deep-research <question>", desc: "Recherche web multi-agents avec vérification croisée et rapport cité.", tags: ["skill"] },
      { name: "/claude-api [migrate]", desc: "Charge la référence API Anthropic (modèles, prix, migration) — s'active aussi tout seul.", tags: ["skill"] },
      { name: "/fewer-permission-prompts", desc: "Analyse vos sessions et propose une allowlist pour réduire les demandes de permission.", tags: ["skill"] },
      { name: "/run", desc: "Lance l'app du projet pour constater un changement en vrai.", tags: ["skill"] },
      { name: "/verify", desc: "Vérifie qu'un changement fonctionne en exécutant l'app (lecture seule).", tags: ["skill"] },
      { name: "/goal [condition|clear]", desc: "Fixe un objectif : Claude continue en autonomie jusqu'à la condition remplie." },
      { name: "/rewind", desc: "Revient à un point antérieur (conversation ET code). Alias : /checkpoint, /undo. Aussi : Esc Esc." },
      { name: "/cd <chemin>", desc: "Déplace la session vers un autre répertoire (son CLAUDE.md est chargé)." },
      { name: "/add-dir <chemin>", desc: "Ajoute un répertoire au périmètre d'accès fichiers de la session." },
      { name: "/btw <question>", desc: "Question parallèle en overlay éphémère, sans polluer l'historique." },
      { name: "/debug [description]", desc: "Active les logs de debug et aide au diagnostic de Claude Code lui-même.", tags: ["skill"] },
      { name: "/doctor", desc: "Diagnostique l'installation (touche f pour corriger les problèmes détectés)." },
      { name: "/feedback", desc: "Signale un bug ou partage la conversation. Alias : /bug, /share." },
      { name: "/theme", desc: "Thème de couleurs : auto, light, dark, daltonized, ANSI + thèmes custom (~/.claude/themes/)." },
      { name: "/output-style", desc: "Ajuste le comportement du system prompt (styles de sortie)." },
      { name: "/statusline", desc: "Configure la barre de statut (peut reprendre votre prompt shell)." },
      { name: "/tui [default|fullscreen]", desc: "Bascule le rendu du terminal (fullscreen = sans scintillement)." },
      { name: "/focus", desc: "Vue focalisée : dernier prompt + réponse uniquement (rendu fullscreen)." },
      { name: "/terminal-setup", desc: "Configure Shift+Enter et autres réglages selon votre terminal." },
      { name: "/login · /logout", desc: "Connexion / déconnexion du compte Anthropic." },
      { name: "/usage", desc: "Coût de session, limites du plan, stats par skill/sous-agent/MCP. Alias : /cost, /stats." },
      { name: "/insights", desc: "Rapport d'analyse de vos sessions : domaines, habitudes, points de friction." },
      { name: "/release-notes", desc: "Changelog interactif version par version." },
      { name: "/privacy-settings", desc: "Consulte et modifie les réglages de confidentialité." },
      { name: "/upgrade", desc: "Page de changement de plan (si éligible)." },
      { name: "/exit", desc: "Quitte Claude Code. Alias : /quit." },
      { name: "/powerup", desc: "Leçons interactives animées pour découvrir les fonctionnalités." },
    ],
  },

  /* ── 2. Commandes personnalisées & skills ── */
  {
    id: "custom", short: "Skills & cmd perso", icon: "★", color: "#F2B450",
    title: "Skills & commandes personnalisées",
    sub: "Créer vos propres /commandes — source : code.claude.com/docs/en/skills",
    intro: `Le format moderne est le <b>skill</b> : un dossier contenant un <code>SKILL.md</code> (frontmatter YAML + instructions markdown). Invocable en <code>/nom</code> ET utilisable par Claude de lui-même si la description s'y prête. L'ancien format <code>.claude/commands/*.md</code> reste supporté.`,
    entries: [
      { name: "Emplacements (ordre de précédence)", desc: "Politique d'entreprise → personnel <code>~/.claude/skills/</code> → projet <code>.claude/skills/</code> (partagé via git) → plugins → ancien <code>.claude/commands/</code>." },
      { name: "name / description / when_to_use", desc: "Frontmatter : nom affiché, description (déclenche l'usage automatique par Claude — soignez-la), contexte d'usage additionnel." },
      { name: "argument-hint / arguments", desc: "Indice d'autocomplétion (<code>\"[fichier]\"</code>) et arguments nommés pour la substitution." },
      { name: "disable-model-invocation / user-invocable", desc: "true = réservé à l'humain (pas d'auto-déclenchement) / false = réservé à Claude (absent du menu /)." },
      { name: "allowed-tools / disallowed-tools", desc: "Pré-approuver ou interdire des outils pendant le skill : <code>\"Bash(git *) Read\"</code>." },
      { name: "model / effort / context / agent", desc: "Forcer un modèle, un niveau d'effort, exécuter en sous-agent isolé (<code>context: fork</code>) avec un type d'agent (<code>agent: Explore</code>)." },
      { name: "paths", desc: "Globs (<code>[\"src/**/*.ts\"]</code>) : le skill se charge automatiquement quand Claude lit ces fichiers." },
      { name: "$ARGUMENTS · $1 · $nom", desc: "Substitution des arguments dans le corps : tout ($ARGUMENTS), par position ($0, $1) ou par nom." },
      { name: "${CLAUDE_SESSION_ID} · ${CLAUDE_SKILL_DIR} · ${CLAUDE_EFFORT}", desc: "Variables injectées : ID de session, dossier du skill, niveau d'effort courant." },
      { name: "Injection !`commande`", desc: "Une ligne <code>!\`git diff HEAD\`</code> est exécutée AVANT que Claude lise le skill — le résultat remplace le placeholder. Contexte dynamique garanti frais." },
      { name: "Cycle de vie en contexte", desc: "Le skill invoqué reste en contexte ; après /compact, ses 5 000 premiers tokens sont réinjectés (budget partagé de 25 000 tokens, les plus récents prioritaires)." },
      { name: "Hooks par skill", desc: "Le frontmatter accepte des hooks limités à la durée du skill — garde-fous temporaires." },
    ],
  },

  /* ── 3. CLI ── */
  {
    id: "cli", short: "CLI & flags", icon: ">_", color: "#5EE6D0",
    title: "La ligne de commande claude",
    sub: "Lancement, flags, scripting — source : code.claude.com/docs/en/cli-reference",
    intro: `Sur Mac : installez via <code>npm install -g @anthropic-ai/claude-code</code> ou Homebrew, puis <code>claude</code> dans n'importe quel projet. Tout flag est <b>de session</b> (ne modifie pas vos réglages persistants) sauf mention contraire.`,
    entries: [
      { name: "claude", desc: "Session interactive dans le répertoire courant." },
      { name: 'claude "prompt"', desc: "Démarre la session avec un premier message." },
      { name: "claude -p \"prompt\"", desc: "Mode print : répond puis quitte — la brique de tous vos scripts.", tags: ["script"] },
      { name: "claude -c", desc: "Reprend la conversation la plus récente du répertoire (--continue)." },
      { name: "claude -r <id> \"prompt\"", desc: "Reprend une session précise (--resume ; sans ID : sélecteur interactif)." },
      { name: "--model <m>", desc: "Modèle de la session : alias (opus, sonnet, haiku, fable) ou ID complet." },
      { name: "--effort <niveau>", desc: "low · medium · high · xhigh · max · ultracode." },
      { name: "--fallback-model <liste>", desc: "Chaîne de repli en cas de surcharge (ex. sonnet,haiku)." },
      { name: "--permission-mode <mode>", desc: "default · acceptEdits · plan · auto · dontAsk · bypassPermissions." },
      { name: "--dangerously-skip-permissions", desc: "Saute toutes les demandes de permission. À réserver aux sandbox/conteneurs.", tags: ["danger"] },
      { name: "--allowedTools / --disallowedTools", desc: "Pré-approuver ou interdire des outils : <code>--allowedTools \"Bash(git *)\" \"Read\"</code>." },
      { name: "--add-dir <chemins>", desc: "Donne accès à d'autres répertoires pour la session." },
      { name: "--settings <fichier>", desc: "Surcharge les réglages pour cette session." },
      { name: "--mcp-config <fichier>", desc: "Charge des serveurs MCP depuis un fichier (--strict-mcp-config pour n'utiliser qu'eux)." },
      { name: "--agent <nom> / --agents '{json}'", desc: "Utilise un sous-agent précis, ou en définit à la volée en JSON." },
      { name: "--system-prompt / --append-system-prompt", desc: "Remplace ou complète le system prompt (variantes -file pour charger un fichier)." },
      { name: "--output-format text|json|stream-json", desc: "Format de sortie en mode print — json pour brancher vos scripts.", tags: ["script"] },
      { name: "--json-schema '{...}'", desc: "Impose un schéma de sortie structurée validée.", tags: ["script"] },
      { name: "--max-turns N / --max-budget-usd X", desc: "Plafonne les tours d'agent ou le coût en mode print.", tags: ["script"] },
      { name: "--verbose", desc: "Sortie complète tour par tour (debug de scripts)." },
      { name: "--bare / --safe-mode", desc: "Démarre sans hooks/skills/plugins/MCP/mémoire — pour isoler un problème de configuration." },
      { name: "--debug [catégories]", desc: "Logs de debug ciblés (ex. \"api,mcp\"), --debug-file pour écrire dans un fichier." },
      { name: "--worktree <nom> / -w", desc: "Travaille dans un worktree git isolé — le chantier parallèle sans risque.", tags: ["parallèle"] },
      { name: "--bg", desc: "Lance la session en agent d'arrière-plan et rend la main immédiatement.", tags: ["parallèle"] },
      { name: "--remote \"tâche\"", desc: "Crée une session web (claude.ai/code) depuis le terminal.", tags: ["cloud"] },
      { name: "--teleport", desc: "Rapatrie une session web dans le terminal.", tags: ["cloud"] },
      { name: "--from-pr <numéro>", desc: "Reprend les sessions liées à une pull request." },
      { name: "--fork-session --resume <id>", desc: "Reprend une session sous un nouvel ID (l'originale reste intacte)." },
      { name: "--name <nom> / -n", desc: "Nomme la session (retrouvable via /resume)." },
      { name: "--ide", desc: "Connexion automatique à l'IDE au démarrage." },
      { name: "--chrome / --no-chrome", desc: "Active/désactive l'intégration navigateur Chrome pour la session." },
      { name: "claude mcp add|list|remove", desc: "Gestion des serveurs MCP : transports stdio/SSE/HTTP, portées local/projet/user." },
      { name: "claude update / claude doctor", desc: "Mise à jour et diagnostic de l'installation." },
    ],
  },

  /* ── 4. Raccourcis Mac ── */
  {
    id: "keys", short: "Raccourcis Mac", icon: "⌘", color: "#F472B6",
    title: "Raccourcis clavier & modes interactifs (Mac)",
    sub: "Source : code.claude.com/docs/en/interactive-mode",
    intro: `Préalable Mac pour les raccourcis Option : <b>iTerm2</b> → Settings → Profiles → Keys → Option = « Esc+ » ; <b>Terminal</b> → Réglages → Profils → Clavier → « Utiliser Option comme touche Meta » ; <b>VS Code</b> → <code>"terminal.integrated.macOptionIsMeta": true</code>.`,
    entries: [
      { name: "Shift+Tab", desc: "Cycle les modes de permission — dont le plan mode et acceptEdits. LE raccourci à connaître." },
      { name: "Esc", desc: "Interrompt Claude en pleine réponse (le travail fait est conservé)." },
      { name: "Esc Esc", desc: "Champ vide : ouvre le menu rewind (revenir en arrière code + conversation). Avec texte : efface la saisie." },
      { name: "Ctrl+C / Ctrl+D", desc: "Interrompre puis quitter / quitter la session (EOF)." },
      { name: "Ctrl+O", desc: "Visionneuse de transcript : tout l'historique, appels d'outils dépliables ({ } pour naviguer entre prompts, v pour ouvrir dans l'éditeur)." },
      { name: "Ctrl+R", desc: "Recherche inversée dans l'historique des prompts (de ce répertoire)." },
      { name: "Ctrl+B", desc: "Passe la tâche en cours en arrière-plan (2× sous tmux)." },
      { name: "Ctrl+T", desc: "Affiche/masque la liste des tâches en cours." },
      { name: "Ctrl+L", desc: "Redessine l'écran (affichage corrompu)." },
      { name: "Ctrl+G / Ctrl+X Ctrl+E", desc: "Ouvre le prompt en cours dans votre éditeur ($EDITOR) pour le rédiger confortablement." },
      { name: "Ctrl+V / Cmd+V", desc: "Colle une image du presse-papiers (chip [Image #N]) — captures d'écran directement dans le prompt." },
      { name: "Option+P", desc: "Change de modèle sans effacer le prompt en cours." },
      { name: "Option+T", desc: "Active/désactive l'extended thinking." },
      { name: "Option+O", desc: "Bascule le fast mode (Mac)." },
      { name: "Option+Entrée / \\ + Entrée / Ctrl+J", desc: "Nouvelle ligne dans le prompt (Shift+Entrée selon terminal — /terminal-setup le configure)." },
      { name: "Option+B / Option+F", desc: "Curseur : mot précédent / suivant." },
      { name: "Ctrl+A / Ctrl+E / Ctrl+K / Ctrl+U / Ctrl+W / Ctrl+Y", desc: "Édition ligne : début / fin / couper jusqu'à la fin / jusqu'au début / mot précédent / coller le texte coupé." },
      { name: "préfixe !", desc: "Mode shell : <code>! npm test</code> exécute directement, sortie ajoutée au contexte, autocomplétion d'historique au Tab." },
      { name: "préfixe @", desc: "Référence de fichier avec autocomplétion : <code>@src/auth.ts#5-10</code> cible même des lignes précises." },
      { name: "préfixe #", desc: "Référence mémoire : ajoute une note aux mémoires du projet." },
      { name: "préfixe /", desc: "Commandes et skills, avec autocomplétion." },
      { name: "Mode vim", desc: "Activable dans /config (Editor mode) : navigation h/j/k/l, d/c/y + text objects (iw, i\", i( …), u pour annuler." },
      { name: "Espace (maintenir/taper)", desc: "Dictée vocale selon /voice hold ou /voice tap." },
      { name: "Ctrl+X Ctrl+K", desc: "Tue tous les sous-agents en arrière-plan (double confirmation)." },
    ],
  },

  /* ── 5. Hooks ── */
  {
    id: "hooks", short: "Hooks", icon: "⚡", color: "#A78BFA",
    title: "Hooks : automatisations sur événements",
    sub: "Garanties machine vs instructions modèle — source : code.claude.com/docs/en/hooks",
    intro: `Un hook est un script (<code>command</code>), une requête <code>http</code>, un outil <code>mcp_tool</code>, un <code>prompt</code> ou un <code>agent</code>, déclenché par un événement, configuré dans <code>settings.json</code> (user, projet ou local), un plugin, ou le frontmatter d'un skill/agent. Code de sortie <b>2</b> = blocage (stderr renvoyé à Claude) ; sortie JSON pour les décisions fines (<code>permissionDecision</code>, <code>updatedToolInput</code>, <code>additionalContext</code>…).`,
    entries: [
      { name: "PreToolUse", desc: "Avant chaque appel d'outil — peut bloquer ou modifier l'appel. L'événement garde-fou par excellence (interdire rm -rf, protéger .env)." },
      { name: "PostToolUse", desc: "Après chaque outil — peut transformer la sortie. Usage roi : formatter automatiquement après chaque édition." },
      { name: "UserPromptSubmit", desc: "À chaque message envoyé — valider ou enrichir le prompt (injecter du contexte)." },
      { name: "SessionStart / SessionEnd", desc: "Début (matchers : startup, resume, clear, compact) et fin de session — charger l'environnement, nettoyer." },
      { name: "PermissionRequest", desc: "Au moment d'un dialogue de permission — auto-approuver/refuser selon vos règles." },
      { name: "Stop / StopFailure", desc: "Quand Claude termine son tour / quand une erreur survient (rate_limit, authentication_failed…)." },
      { name: "SubagentStop", desc: "Quand un sous-agent termine." },
      { name: "PreCompact", desc: "Avant une compaction — sauvegarder ce qui doit survivre au résumé." },
      { name: "FileChanged", desc: "Quand un fichier surveillé change (matcher par noms de fichiers : .env|.envrc)." },
      { name: "Notification / Elicitation", desc: "Notifications d'événements (permission_prompt…) et questions interactives de suivi." },
      { name: "CwdChanged / ConfigChange / WorktreeCreate", desc: "Changement de répertoire, rechargement de réglages, création de worktree." },
      { name: "TaskCreated / TaskCompleted / TeammateIdle", desc: "Cycle de vie des tâches d'agent teams (exit 2 sur TeammateIdle = continue de travailler)." },
      { name: "InstructionsLoaded", desc: "Au chargement des instructions — tracer ce qui a été chargé." },
      { name: "Structure de config", desc: "<code>{\"hooks\": {\"PreToolUse\": [{\"matcher\": \"Bash\", \"hooks\": [{\"type\": \"command\", \"command\": \"script.sh\", \"if\": \"Bash(rm *)\", \"timeout\": 30}]}]}}</code>" },
      { name: "Matchers", desc: "Filtre par nom d'outil (<code>Bash</code>, <code>Edit|Write</code>, <code>mcp__github__.*</code>), type de démarrage, type de notification, noms de fichiers." },
      { name: "Placeholders", desc: "<code>${CLAUDE_PROJECT_DIR}</code> (racine projet), <code>${CLAUDE_PLUGIN_ROOT}</code>, <code>${CLAUDE_PLUGIN_DATA}</code>." },
      { name: "Exemple : bloquer le destructif", desc: "PreToolUse + matcher Bash + <code>if: \"Bash(rm *)\"</code> → script qui exit 2 avec un message. Garanti, pas négociable." },
      { name: "Exemple : auto-format", desc: "PostToolUse + matcher Edit → <code>prettier --write</code> sur le fichier modifié. Plus jamais de diff de formatage." },
      { name: "Exemple : contexte au démarrage", desc: "SessionStart (matcher startup) → script qui charge identité git, état du déploiement, tickets en cours via additionalContext." },
    ],
  },

  /* ── 6. Mémoire & configuration ── */
  {
    id: "memoire", short: "Mémoire & config", icon: "◫", color: "#F2B450",
    title: "CLAUDE.md, mémoire & hiérarchie de configuration",
    sub: "Source : code.claude.com/docs/en/memory + /settings",
    intro: `Deux mémoires complémentaires : <b>CLAUDE.md</b> (vous écrivez les règles) et la <b>mémoire automatique</b> (Claude note ses apprentissages par projet). Les réglages suivent une hiérarchie stricte : politique gérée → flags CLI → local → projet → user.`,
    entries: [
      { name: "CLAUDE.md (chargement)", desc: "Remontée depuis la racine jusqu'au répertoire courant : enterprise → <code>~/.claude/CLAUDE.md</code> (perso) → <code>./CLAUDE.md</code> (projet) → <code>CLAUDE.local.md</code> (local, non commité). Les CLAUDE.md de sous-dossiers se chargent à la demande." },
      { name: "CLAUDE.md (bonnes pratiques)", desc: "< 200 lignes, titres + puces, spécifique (« indentation 2 espaces ») plutôt que vague (« code propre »), le quoi plutôt que le pourquoi." },
      { name: "Imports @", desc: "<code>@README</code>, <code>@docs/conventions.md</code> dans un CLAUDE.md importent d'autres fichiers — gardez le principal court." },
      { name: "Mémoire automatique", desc: "<code>~/.claude/projects/&lt;projet&gt;/memory/</code> : MEMORY.md (index chargé au démarrage, 200 lignes/25 Ko) + fichiers thématiques chargés à la demande. Consultable via /memory, éditable à la main." },
      { name: "CLAUDE.md vs auto-memory", desc: "CLAUDE.md = vos instructions (standards, décisions). Auto-memory = ce que Claude apprend (commandes de build, pièges du projet, vos préférences)." },
      { name: "settings.json (hiérarchie)", desc: "Géré (entreprise) → flags CLI → <code>.claude/settings.local.json</code> (local, gitignoré) → <code>.claude/settings.json</code> (projet, partagé) → <code>~/.claude/settings.json</code> (user)." },
      { name: "Structure .claude/ (projet)", desc: "<code>settings.json</code>, <code>settings.local.json</code>, <code>skills/</code>, <code>agents/</code>, <code>hooks/</code>, <code>rules/</code> (règles par chemins), <code>commands/</code> (legacy)." },
      { name: "Structure ~/.claude/ (perso)", desc: "<code>CLAUDE.md</code>, <code>settings.json</code>, <code>skills/</code>, <code>agents/</code>, <code>keybindings.json</code>, <code>themes/</code>, <code>projects/&lt;projet&gt;/</code> (mémoire, transcripts, checkpoints, tâches par projet)." },
      { name: "Règles par chemins (.claude/rules/)", desc: "Fichiers markdown avec frontmatter <code>paths: [\"src/**/*.ts\"]</code> — chargés seulement quand Claude touche ces fichiers. Le contexte reste léger." },
      { name: "Sessions & checkpoints", desc: "Sessions sauvegardées par projet dans <code>~/.claude/projects/</code> ; checkpoints restaurables via /rewind (code et/ou conversation)." },
      { name: "# en début de message", desc: "Raccourci pour ajouter une note à la mémoire sans interrompre le flux." },
    ],
  },

  /* ── 7. Sous-agents & teams ── */
  {
    id: "agents", short: "Sous-agents", icon: "✦", color: "#A78BFA",
    title: "Sous-agents & agent teams",
    sub: "Déléguer avec des contextes isolés — source : code.claude.com/docs/en/sub-agents",
    intro: `Un sous-agent travaille dans son <b>propre contexte</b> et ne rapporte que sa conclusion : votre conversation principale reste légère. Définition en markdown dans <code>.claude/agents/</code> (projet) ou <code>~/.claude/agents/</code> (perso).`,
    entries: [
      { name: "Agents intégrés", desc: "<b>general-purpose</b> (tous outils), <b>Explore</b> (lecture seule : Glob, Grep, Read — parfait pour fouiller sans risque), <b>Plan</b> (conception sans édition)." },
      { name: "Format du fichier", desc: "<code>.claude/agents/relecteur.md</code> : frontmatter YAML + prompt système en markdown. Invocation : déclenchement auto (selon description) ou demande explicite." },
      { name: "Frontmatter : name / description / when_to_use", desc: "La description pilote le déclenchement automatique — écrivez-la comme une condition (« Utiliser quand… »)." },
      { name: "Frontmatter : tools / disallowed-tools", desc: "Limiter les outils (<code>\"Read Grep Bash\"</code>) — un relecteur n'a pas besoin d'éditer." },
      { name: "Frontmatter : model / skills / mcpServers", desc: "Modèle dédié (un agent de tri peut tourner sur haiku), skills et serveurs MCP préchargés." },
      { name: "Frontmatter : memory: true", desc: "Mémoire automatique persistante propre à l'agent (<code>~/.claude/projects/&lt;projet&gt;/subagent-memory/&lt;agent&gt;/</code>)." },
      { name: "Parallélisme", desc: "Plusieurs sous-agents en parallèle sur des tâches indépendantes ; Ctrl+X Ctrl+K pour tout arrêter ; /tasks pour superviser." },
      { name: "Agent teams (expérimental)", desc: "Plusieurs sessions qui communiquent directement et se coordonnent par liste de tâches (<code>CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1</code>). Shift+Down pour passer d'un équipier à l'autre." },
      { name: "Sous-agents vs teams", desc: "Sous-agent : rapporte au chef, coût contenu (résumé). Team : indépendants, se parlent entre eux, coût plus élevé. Commencez sous-agents." },
    ],
  },

  /* ── 8. MCP ── */
  {
    id: "mcpx", short: "MCP", icon: "◇", color: "#5EE6D0",
    title: "MCP : brancher Claude au monde",
    sub: "Model Context Protocol — source : code.claude.com/docs/en/mcp",
    intro: `Un serveur MCP expose les outils d'un service (GitHub, Linear, Slack, bases de données, navigateur…) que Claude peut utiliser en pleine session. Standard ouvert : le même serveur fonctionne dans Claude Code, claude.ai et d'autres clients.`,
    entries: [
      { name: "claude mcp add", desc: "Assistant interactif d'ajout — ou tout en flags : <code>claude mcp add --transport http github &lt;url&gt;</code>." },
      { name: "Transports", desc: "<b>stdio</b> (serveur local exécuté par Claude), <b>SSE</b> et <b>HTTP</b> (serveurs distants)." },
      { name: "Portées", desc: "<b>local</b> (vous, ce projet), <b>project</b> (<code>.mcp.json</code> commité — toute l'équipe), <b>user</b> (vous, tous vos projets)." },
      { name: "Authentification", desc: "OAuth géré en session via /mcp, ou header explicite : <code>--header \"Authorization: Bearer TOKEN\"</code>. Ne mettez jamais le token dans un fichier commité." },
      { name: "/mcp", desc: "En session : état des connexions, reconnect, enable/disable serveur par serveur, OAuth." },
      { name: "@-mentions de ressources", desc: "<code>@serveur/chemin/ressource</code> injecte une ressource MCP directement dans le prompt." },
      { name: "Prompts MCP → commandes", desc: "Les prompts exposés par un serveur deviennent des commandes : <code>/mcp__serveur__prompt</code>." },
      { name: "claude mcp list / remove", desc: "Inventaire et suppression des serveurs configurés." },
      { name: "Hygiène de sécurité", desc: "Chaque serveur = du pouvoir d'agir pour l'IA. Portée minimale, comptes aux droits limités, et méfiance avec les serveurs non officiels (ils voient vos conversations d'outils)." },
    ],
  },

  /* ── 9. Artifacts ── */
  {
    id: "artifacts", short: "Artifacts", icon: "▣", color: "#F472B6",
    title: "Artifacts (claude.ai)",
    sub: "Le panneau de création — vérifié sur support.claude.com, juin 2026",
    intro: `Quand Claude produit un contenu substantiel et autonome (typiquement > 15 lignes), il apparaît dans un panneau dédié : itérable, versionné, publiable. C'est l'atelier de prototypage du vibe coder — une vraie app qui tourne sans rien installer.`,
    entries: [
      { name: "Types supportés (liste officielle)", desc: "Code (30+ langages, coloration), documents texte/markdown, pages <b>HTML</b> complètes (HTML+CSS+JS, rendu live), composants et apps <b>React</b>, images <b>SVG</b>, diagrammes <b>Mermaid</b>. Les fichiers Office (xlsx/docx…) ne sont PAS des artifacts — c'est la création de fichiers (section claude.ai)." },
      { name: "Itération & versions", desc: "Chaque demande construit une nouvelle version, navigable via le sélecteur en bas du panneau. Éditer un de vos anciens messages crée une <b>branche</b> de conversation avec ses propres artifacts." },
      { name: "Publication & remix", desc: "Bouton Publish → lien public (claude.ai/public/artifacts/…) utilisable même sans compte (sauf la partie IA). Tout utilisateur peut « Customize » : repartir de votre création dans son propre Claude. Code d'<b>embed</b> sur Free/Pro/Max. Team/Enterprise : partage interne à l'organisation uniquement." },
      { name: "Apps propulsées par Claude", desc: "Un artifact peut appeler Claude lui-même (API de complétion exposée dans l'environnement — <code>window.claude.complete(prompt)</code>) : quiz génératifs, assistants… L'utilisateur connecté consomme <b>son propre quota</b>, pas le vôtre — partager est gratuit, sans clé API." },
      { name: "Stockage persistant", desc: "Plans payants : un artifact <b>publié</b> peut stocker des données entre sessions (modes personnel ou partagé) — journaux, trackers. Attention : dépublier supprime définitivement les données stockées." },
      { name: "MCP dans les artifacts", desc: "Plans payants : un artifact peut lire/écrire dans vos services connectés (Asana, Google Calendar, Slack…) via les connecteurs MCP — vos prototypes deviennent de vrais petits outils." },
      { name: "Espace dédié & inspiration", desc: "Section « Artifacts » dans la barre latérale (Free/Pro/Max, pas sur mobile) : toutes vos créations + galerie Inspiration d'artifacts à remixer." },
      { name: "Stack & limites techniques", desc: "Environnement sandboxé mono-fichier : React 18, Tailwind, shadcn/ui (stack du skill officiel web-artifacts-builder) ; librairies via CDN ; pas d'appels réseau arbitraires ni de vraie base de données. Pour dépasser : migrer vers un vrai dépôt avec Claude Code." },
      { name: "Le bon réflexe", desc: "Prototype en artifact (zéro friction) → validation de l'idée → migration en vrai dépôt via Claude Code quand le prototype devient produit. Les « live artifacts » de Claude Cowork (desktop) ajoutent le rafraîchissement par connecteurs." },
    ],
  },

  /* ── 10. Projects & claude.ai ── */
  {
    id: "projects", short: "Projects", icon: "❖", color: "#A78BFA",
    title: "Projects, mémoire & connecteurs (claude.ai)",
    sub: "Vérifié sur support.claude.com — juin 2026",
    intro: `Le Project est votre espace de travail durable par produit : instructions, connaissances, mémoire dédiée. Disponible sur tous les plans (limite : 5 projets en Free ; instructions personnalisées et RAG selon plan).`,
    entries: [
      { name: "Instructions de projet", desc: "Ton, règles, rôle — appliquées à toutes les conversations du projet uniquement. Distinctes des préférences globales du compte." },
      { name: "Base de connaissances", desc: "Documents, code, PDF (jusqu'à 30 Mo/fichier ; PDF <100 pages analysés texte+visuel). La capacité de base est liée à la fenêtre de contexte." },
      { name: "Mode RAG (plans payants)", desc: "Au-delà d'environ 150K tokens de connaissances, Claude bascule automatiquement en récupération ciblée (RAG) — capacité étendue jusqu'à ~10×, sans configuration." },
      { name: "Connecteur GitHub", desc: "Bouton + dans les connaissances → sélection de dépôts, dossiers et fichiers à importer." },
      { name: "Connecteur Google Drive", desc: "Docs, Sheets, Slides, PDF importables dans les connaissances (projets privés)." },
      { name: "Mémoire par projet", desc: "Chaque projet a SA mémoire et son résumé, séparés de la mémoire générale (qui n'inclut pas les chats de projets). Synthèse mise à jour ~toutes les 24 h." },
      { name: "Mémoire : contrôles", desc: "Voir/éditer dans Réglages → Capacités ; chats incognito (icône fantôme) jamais mémorisés ; import/export de mémoire possible." },
      { name: "Partage (Team/Enterprise)", desc: "Projets privés ou partagés à l'organisation ; permissions « Can use » vs « Can edit » ; fil d'activité avec snapshots de conversations." },
      { name: "Recherche de chats", desc: "Retrouver et s'appuyer sur ses conversations passées — plans payants." },
      { name: "Stratégie vibe coder", desc: "Un Project par produit : specs en connaissances (synchronisées du dépôt via GitHub), instructions = votre CLAUDE.md côté chat, prototypes en artifacts." },
    ],
  },

  /* ── 11. Skills (écosystème) ── */
  {
    id: "skillsx", short: "Skills (écosystème)", icon: "❋", color: "#F2B450",
    title: "Skills : le savoir-faire portable",
    sub: "claude.ai, Claude Code et API partagent le même format",
    intro: `Une skill est un dossier avec un <code>SKILL.md</code> : des instructions spécialisées que Claude charge <b>quand la tâche s'y prête</b> (progressive disclosure : seule la description occupe le contexte en permanence). Le même format circule entre Claude Code, claude.ai et l'API.`,
    entries: [
      { name: "Anatomie d'une skill", desc: "Dossier : <code>SKILL.md</code> (frontmatter + instructions, visez < 500 lignes) + fichiers de référence et <code>scripts/</code> exécutables que les instructions mentionnent." },
      { name: "Frontmatter : contraintes exactes", desc: "<code>name</code> : 64 caractères max, minuscules/chiffres/tirets, mots « anthropic » et « claude » interdits. <code>description</code> : 1024 caractères max, à la 3e personne, dire CE QUE fait la skill ET QUAND l'utiliser — c'est elle qui pilote le déclenchement." },
      { name: "Progressive disclosure (3 niveaux)", desc: "N1 : métadonnées toujours en contexte (~100 tokens/skill). N2 : corps du SKILL.md chargé au déclenchement (< 5K tokens). N3 : fichiers liés lus et scripts <b>exécutés</b> à la demande — leur code n'entre jamais en contexte, seule leur sortie. Capacité quasi illimitée." },
      { name: "Skills Anthropic pré-construites", desc: "<b>xlsx</b>, <b>docx</b>, <b>pptx</b>, <b>pdf</b> : de vrais fichiers téléchargeables, pas du texte qui y ressemble. Sur claude.ai elles s'activent toutes seules à la création de documents. Source visible : github.com/anthropics/skills." },
      { name: "Sur claude.ai", desc: "Prérequis : « Code execution and file creation » activé (Réglages → Capacités). Upload de skills perso en <b>ZIP</b> (le dossier de la skill à la racine) via Customize → Skills, toggle par skill. Création possible en conversant avec Claude (skill-creator). Les « Styles » ont migré vers les skills." },
      { name: "Dans Claude Code", desc: "<code>.claude/skills/</code> (projet, git) et <code>~/.claude/skills/</code> (perso) ; les anciennes commandes .claude/commands/ ont fusionné avec les skills. Frontmatter étendu (context: fork, hooks, paths…) — voir la section Skills & cmd perso." },
      { name: "Via l'API", desc: "Endpoint <code>/v1/skills</code> (versionnées, partagées au niveau workspace), attachées via <code>container.skills</code> (max 8/requête) avec l'outil code execution ; 3 en-têtes beta requis ; bundle < 30 Mo ; pas d'accès réseau côté API." },
      { name: "Pas de synchronisation", desc: "claude.ai, Claude Code et l'API ont chacun leurs skills : uploads séparés. Le format, lui, est portable — et c'est devenu un standard ouvert (agentskills.io) adopté au-delà de Claude." },
      { name: "Skill vs CLAUDE.md vs commande", desc: "CLAUDE.md : toujours chargé (règles permanentes). Skill : chargée à la demande (savoir-faire spécialisé). Commande slash : déclenchée par vous (workflow explicite). Une skill moderne est les deux derniers à la fois." },
      { name: "Stratégie vibe coder", desc: "Tout ce que vous expliquez à Claude plus de deux fois mérite de devenir une skill. Commencez par votre process de déploiement et vos conventions de design." },
    ],
  },

  /* ── 11b. claude.ai : écosystème & plans ── */
  {
    id: "claudeai", short: "claude.ai & plans", icon: "✺", color: "#F472B6",
    title: "claude.ai : capacités, connecteurs & plans",
    sub: "Vérifié sur support.claude.com — juin 2026",
    intro: `La carte des capacités de l'app Claude pour un vibe coder, avec ce qui dépend du plan. Règle générale : l'usage est <b>mutualisé</b> entre claude.ai, Claude Code et l'app desktop (mêmes compteurs : sessions de 5 h + limite hebdomadaire).`,
    entries: [
      { name: "Recherche web", desc: "Disponible sur tous les plans, Free inclus." },
      { name: "Research (recherche approfondie)", desc: "Investigations multi-étapes (5-45 min) sur des centaines de sources, rapport cité ; interrogeable avec Google Workspace (Gmail, Calendar, Docs). Plans payants." },
      { name: "Création de fichiers réels", desc: "xlsx, docx, pptx, PDF téléchargeables (ou vers Google Drive) via l'environnement d'exécution — tous plans, 30 Mo max/fichier. Le réglage : « Code execution and file creation »." },
      { name: "Analyse de fichiers", desc: "Upload jusqu'à 30 Mo/fichier ; PDF < 100 pages analysés texte + visuel ; les plus gros passent par l'environnement d'exécution." },
      { name: "Connecteurs MCP distants", desc: "Brancher des services (répertoire officiel : <b>claude.ai/directory</b> — Drive, Gmail, Notion, Asana, Canva…) ou un serveur MCP custom par URL (OAuth géré). Free : 1 connecteur custom. Team/Enterprise : ajout par les Owners." },
      { name: "MCP local (desktop Mac)", desc: "L'app desktop accepte en plus les serveurs MCP locaux (claude_desktop_config.json) et les extensions desktop en un clic — format <b>.mcpb</b> (MCP Bundle, ex-.dxt)." },
      { name: "Claude in Chrome", desc: "Extension navigateur (bêta, plans payants) : Claude lit, clique et navigue à vos côtés — workflows multi-onglets, tâches planifiées, garde-fous anti-injection et confirmations sur les actions à risque." },
      { name: "Claude Cowork", desc: "La surface agentique de l'app desktop (Mac/Windows, plans payants) : tâches déléguées, projets persistants, live artifacts rafraîchis par vos connecteurs, computer use en preview." },
      { name: "Mémoire", desc: "Tous plans : Claude synthétise vos conversations (~24 h) et s'en souvient ; mémoire séparée par Project ; éditable dans les réglages ; chats incognito jamais mémorisés ; import/export possible." },
      { name: "Microsoft 365", desc: "Add-ins Claude pour Excel, PowerPoint, Word et Outlook (plans payants) — utile pour le versant « bureau » de vos produits." },
      { name: "Plans en bref", desc: "Free : usage limité, 5 Projects, 1 connecteur custom. Pro : ~5× Free + Claude Code + Research + RAG Projects. Max : 5× ou 20× Pro. Team/Enterprise : partage org, RBAC, contexte étendu (500K sur certains modèles Enterprise)." },
      { name: "Limites d'usage", desc: "Sessions de 5 h (reset) + plafond hebdomadaire, partagés entre claude.ai, Claude Code et desktop. Crédits d'usage supplémentaires activables sur les plans payants (/usage dans Claude Code pour suivre)." },
    ],
  },

  /* ── 12. Surfaces ── */
  {
    id: "surfaces", short: "Surfaces", icon: "⌥", color: "#5EE6D0",
    title: "Les surfaces : où travailler avec Claude Code",
    sub: "Terminal, web, desktop Mac, IDE — source : code.claude.com/docs",
    intro: `Le même agent, quatre habitats. Le réflexe : terminal pour la puissance, desktop pour le confort visuel, web pour déléguer dans le cloud, IDE pour rester dans l'éditeur.`,
    entries: [
      { name: "CLI (terminal)", desc: "L'expérience complète : tous les raccourcis, mode shell !, transcript Ctrl+O, vim, background agents, scripting -p. La référence." },
      { name: "Desktop (Mac)", desc: "Interface graphique : diffs côte à côte avec commentaires inline, terminal et navigateur de fichiers intégrés, panneau de preview (serveurs de dev), sessions parallèles, tâches planifiées, intégrations Slack/GitHub/Linear." },
      { name: "Web (claude.ai/code)", desc: "Sessions cloud sur vos dépôts GitHub : déléguer des tâches, /autofix-pr, routines planifiées, scripts d'environnement. Lancement direct ou <code>claude --remote</code> ; rapatriement par --teleport." },
      { name: "VS Code", desc: "Extension : panneau de chat, diffs inline, contexte auto depuis l'éditeur, @-mentions Cmd+Option+K, plan mode en document markdown. Raccourcis : Cmd+Esc (focus), Shift+Entrée (multiligne)." },
      { name: "JetBrains", desc: "Plugin (IntelliJ, WebStorm, PyCharm…) : Cmd+Esc pour ouvrir, diffs dans l'outil natif, partage de sélection et de diagnostics (lint/types)." },
      { name: "Continuité entre surfaces", desc: "/desktop envoie la session vers l'app Mac, /teleport rapatrie une session web, /remote-control pilote le terminal depuis claude.ai (y compris mobile), /mobile pour le QR code." },
    ],
  },
];

window.VL = VL;
