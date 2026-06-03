/* Bilingual content for the interactive course "Guide de conception".
   Each leaf is { fr, en }. Consumed by app.jsx via the t() helper. */
window.COURSE = {
  meta: {
    institution: { fr: "Conservatoire national supérieur de musique et de danse de Paris", en: "Paris National Conservatory of Music and Dance" },
    kicker: { fr: "Guide de conception", en: "Design guide" },
    title: { fr: "Concevoir un cours, pas une suite de vidéos", en: "Designing a course, not a string of videos" },
    subtitle: {
      fr: "Le parcours qui accompagne les expert·es dans la collaboration avec notre équipe d'ingénierie pédagogique.",
      en: "The journey that guides experts through the collaboration with our learning-engineering team."
    },
    start: { fr: "Commencer le parcours", en: "Start the journey" },
    resume: { fr: "Reprendre où j'en étais", en: "Resume where I left off" },
    chaptersLabel: { fr: "8 chapitres", en: "8 chapters" },
    minutesLabel: { fr: "≈ 25 min de lecture", en: "≈ 25 min read" },
    intro: {
      fr: "Vous allez concevoir un cours en ligne avec nous. Ce guide explique comment nous travaillons ensemble : ce que vous apportez, ce que nous prenons en charge, et comment nous transformons votre matière en un véritable parcours d'apprentissage.",
      en: "You are about to design an online course with us. This guide explains how we work together: what you bring, what we take care of, and how we turn your material into a genuine learning journey."
    }
  },

  ui: {
    contents: { fr: "Sommaire", en: "Contents" },
    chapter: { fr: "Chapitre", en: "Chapter" },
    prev: { fr: "Précédent", en: "Previous" },
    next: { fr: "Suivant", en: "Next" },
    finish: { fr: "Terminer le parcours", en: "Finish the journey" },
    progress: { fr: "Progression", en: "Progress" },
    completed: { fr: "terminé", en: "completed" },
    yourProgress: { fr: "Votre progression", en: "Your progress" },
    restart: { fr: "Recommencer", en: "Restart" },
    checkpoint: { fr: "Point d'étape", en: "Checkpoint" },
    verify: { fr: "Vérifier", en: "Check" },
    correct: { fr: "Bonne réponse", en: "Correct" },
    incorrect: { fr: "Pas tout à fait", en: "Not quite" },
    tapCard: { fr: "Cliquez pour retourner la carte", en: "Click to flip the card" },
    backToWorkshop: { fr: "Accéder à l'atelier de rédaction", en: "Go to the writing workshop" },
    done: { fr: "Chapitre terminé", en: "Chapter complete" }
  },

  // ── Chapter navigation labels + glyph + accent ──────────────
  nav: [
    { id: "essentiel", num: 1, label: { fr: "Un cours, pas des vidéos", en: "A course, not videos" }, glyph: "★" },
    { id: "asynchrone", num: 2, label: { fr: "Le distanciel asynchrone", en: "Asynchronous learning" }, glyph: "◷" },
    { id: "livrables", num: 3, label: { fr: "Votre rôle : 5 livrables", en: "Your role: 5 deliverables" }, glyph: "✎" },
    { id: "equipe", num: 4, label: { fr: "Le rôle des IP", en: "What our team does" }, glyph: "◆" },
    { id: "etapes", num: 5, label: { fr: "Les étapes & la charge", en: "Steps & workload" }, glyph: "↺" },
    { id: "atelier", num: 6, label: { fr: "L'atelier de rédaction", en: "The writing workshop" }, glyph: "✐" },
    { id: "vigilance", num: 7, label: { fr: "Vigilance & checklist", en: "Watch points & checklist" }, glyph: "!" },
    { id: "campus", num: 8, label: { fr: "Le Campus & la suite", en: "Le Campus & next steps" }, glyph: "→" }
  ],

  // ════════════════════════════════════════════════════════════
  ch: {
    // 1 ─────────────────────────────────────────────────────────
    essentiel: {
      kicker: { fr: "Pourquoi un cours, pas une vidéo", en: "Why a course, not a video" },
      title: { fr: "Un cours, pas une suite de vidéos", en: "A course, not a string of videos" },
      lead: {
        fr: "Beaucoup de cours en ligne sont des successions de vidéos qui <b>informent</b> plus qu'elles ne <b>forment</b>. Au CNSMDP, ce n'est pas notre conception d'un cours.",
        en: "Many online courses are just successions of videos that <b>inform</b> more than they <b>teach</b>. At the CNSMDP, that is not our idea of a course."
      },
      body: {
        fr: "On peut avoir l'impression d'apprendre en étant simplement informé. Mais une <b>formation</b> ancre des concepts et fait acquérir des compétences. C'est tout l'enjeu : former, mais à distance — et seul·e derrière un écran, sans votre présence pour réguler.",
        en: "You can feel like you are learning simply by being informed. But genuine <b>training</b> anchors concepts and builds skills. That is the whole challenge: to teach — but remotely, with the learner alone behind a screen, without your presence to guide them."
      },
      // informer vs former toggle
      compare: {
        title: { fr: "Informer ou former ?", en: "Inform or train?" },
        sub: { fr: "Deux intentions très différentes derrière un même écran.", en: "Two very different intentions behind the same screen." },
        a: {
          label: { fr: "Informer", en: "Inform" },
          tag: { fr: "Une suite de vidéos", en: "A string of videos" },
          points: {
            fr: ["L'apprenant·e regarde et écoute", "Le savoir défile, linéaire", "On retient peu, on ne pratique pas", "Sensation d'apprendre sans ancrage"],
            en: ["The learner watches and listens", "Knowledge scrolls by, linear", "Little is retained, nothing practised", "A feeling of learning without anchoring"]
          }
        },
        b: {
          label: { fr: "Former", en: "Train" },
          tag: { fr: "Un parcours vécu", en: "A lived journey" },
          points: {
            fr: ["L'apprenant·e agit, pratique, répète", "Le parcours alterne les formats", "Les concepts s'ancrent durablement", "Des compétences réellement acquises"],
            en: ["The learner acts, practises, repeats", "The journey alternates formats", "Concepts anchor durably", "Skills genuinely acquired"]
          }
        }
      },
      callout1: {
        kind: "important",
        title: { fr: "Le e-learning n'est pas une réplique de votre cours présentiel", en: "E-learning is not a replica of your in-person class" },
        body: {
          fr: "Nous ne cherchons pas à reproduire à l'identique votre enseignement en salle. Le distanciel demande une adaptation pour reconstruire la relation pédagogique — <b>mais cette adaptation, c'est notre métier, pas le vôtre</b>.",
          en: "We are not trying to reproduce your classroom teaching identically. Distance learning requires adaptation to rebuild the teaching relationship — <b>but that adaptation is our job, not yours</b>."
        }
      },
      bringsTitle: { fr: "Ce que le e-learning apporte", en: "What e-learning brings" },
      brings: {
        fr: [
          ["Autonomie & flexibilité", "Rythme personnel pour l'apprenant·e, retour en arrière possible."],
          ["Richesse multimédia", "Visuels, sons, interactivité pour illustrer votre propos."],
          ["Rayonnement", "Visibilité nationale et internationale de votre expertise."]
        ],
        en: [
          ["Autonomy & flexibility", "A personal pace for the learner, the ability to go back."],
          ["Multimedia richness", "Visuals, sound, interactivity to illustrate your ideas."],
          ["Reach", "National and international visibility for your expertise."]
        ]
      },
      callout2: {
        kind: "tip",
        title: { fr: "Notre challenge commun", en: "Our shared challenge" },
        body: {
          fr: "Faire en sorte que l'apprenant·e ne consomme pas passivement votre cours, mais le <b>vive</b>, le <b>pratique</b>, s'entraîne et répète — réellement, à distance.",
          en: "Making sure the learner does not consume your course passively, but <b>lives</b> it, <b>practises</b> it, trains and repeats — genuinely, at a distance."
        }
      },
      quiz: {
        q: { fr: "Selon nous, qu'est-ce qui distingue un vrai cours d'une suite de vidéos ?", en: "In our view, what sets a real course apart from a string of videos?" },
        options: {
          fr: ["Il dure plus longtemps", "Il fait pratiquer et ancre des compétences", "Il est filmé en haute qualité"],
          en: ["It lasts longer", "It makes you practise and anchors skills", "It is filmed in high quality"]
        },
        answer: 1,
        explain: { fr: "Former, ce n'est pas informer : un cours fait agir, pratiquer et répéter pour ancrer durablement les compétences.", en: "Training is not informing: a course makes you act, practise and repeat to durably anchor skills." }
      },
      openq: {
        badge: { fr: "À vous de chercher", en: "Your turn to research" },
        title: { fr: "Partez en exploration", en: "Go exploring" },
        intro: {
          fr: "Avant d'aller plus loin, cherchez en ligne des <b>ressources pédagogiques interactives</b> que vous avez appréciées (un cours, un module, une expérience interactive…). Pour chacune, indiquez son nom, un lien si possible, et <b>ce qui vous a plu</b>. <b>Au moins une réponse est nécessaire</b> pour continuer ; les trois sont les bienvenues.",
          en: "Before going further, search online for <b>interactive learning resources</b> you have enjoyed (a course, a module, an interactive experience…). For each, give its name, a link if possible, and <b>what you liked</b> about it. <b>At least one answer is required</b> to continue; all three are welcome."
        },
        placeholders: {
          fr: [
            "Ressource 1 — nom, lien, et ce que vous avez apprécié…",
            "Ressource 2 — nom, lien, et ce que vous avez apprécié…",
            "Ressource 3 — nom, lien, et ce que vous avez apprécié…"
          ],
          en: [
            "Resource 1 — name, link, and what you liked…",
            "Resource 2 — name, link, and what you liked…",
            "Resource 3 — name, link, and what you liked…"
          ]
        },
        progress: { fr: "ressource(s) renseignée(s)", en: "resource(s) filled in" },
        lockedHint: { fr: "Renseignez au moins une ressource pour débloquer le chapitre suivant.", en: "Fill in at least one resource to unlock the next chapter." },
        success: { fr: "Bravo — votre inspiration est notée. Le chapitre suivant est débloqué.", en: "Well done — your inspiration is saved. The next chapter is unlocked." }
      }
    },

    // 2 ─────────────────────────────────────────────────────────
    asynchrone: {
      kicker: { fr: "Le distanciel asynchrone", en: "Asynchronous distance learning" },
      title: { fr: "Comprendre le distanciel asynchrone", en: "Understanding asynchronous distance learning" },
      lead: {
        fr: "En présentiel, vous pilotez le temps en direct. En e-learning asynchrone, l'apprenant·e est seul·e, maître de son temps — vous n'êtes pas là pour réguler.",
        en: "In the classroom you steer the timing live. In asynchronous e-learning the learner is alone, in charge of their own time — you are not there to guide them."
      },
      writingTitle: { fr: "La conséquence pour votre écriture", en: "What this means for your writing" },
      writingBody: {
        fr: "C'est pourquoi <b>votre contenu écrit doit être complet et explicite</b> : tout ce que vous diriez à l'oral, les précisions que vous apporteriez spontanément, les exemples que vous choisiriez selon le contexte — tout cela doit figurer dans votre texte.",
        en: "This is why <b>your written content must be complete and explicit</b>: everything you would say out loud, the clarifications you would add spontaneously, the examples you would pick depending on context — all of it must be in your text."
      },
      callout1: {
        kind: "note",
        title: { fr: "Transposer votre présence", en: "Transpose your presence" },
        body: {
          fr: "Ce n'est pas « se filmer en faisant cours ». L'enjeu est de <b>transposer votre présence</b> dans le support, pour un apprenant·e actif et engagé — pas un cours linéaire de 30 minutes de vidéo.",
          en: "It is not about \u201Cfilming yourself teaching\u201D. The goal is to <b>transpose your presence</b> into the material, for an active, engaged learner — not a linear 30-minute video lecture."
        }
      },
      whoTitle: { fr: "Qui fait quoi", en: "Who does what" },
      whoSub: { fr: "Une collaboration en allers-retours entre vous et notre équipe.", en: "A back-and-forth collaboration between you and our team." },
      who: [
        {
          owner: "expert",
          title: { fr: "Écriture développée", en: "Developed writing" },
          by: { fr: "Vous", en: "You" },
          body: { fr: "Les concepts comme vous les enseignez, avec vos exemples, vos anecdotes, vos ressources.", en: "The concepts the way you teach them, with your examples, your anecdotes, your resources." }
        },
        {
          owner: "ip",
          title: { fr: "Scénarisation", en: "Scenarisation" },
          by: { fr: "Nous", en: "Us" },
          body: { fr: "Nous découpons, alternons les formats (lecture, écoute, vidéo, exercice) et créons les activités interactives.", en: "We segment it, alternate formats (reading, listening, video, exercise) and build the interactive activities." }
        },
        {
          owner: "both",
          title: { fr: "Allers-retours", en: "Back-and-forth" },
          by: { fr: "Ensemble", en: "Together" },
          body: { fr: "Vous relisez, corrigez et complétez ce que nous avons transformé.", en: "You review, correct and complete what we have transformed." }
        }
      ],
      callout2: {
        kind: "note",
        title: { fr: "Le rythme appartient à l'apprenant·e", en: "Pacing belongs to the learner" },
        body: {
          fr: "Il avance, fait pause, revient en arrière. Vous et nous structurons le <b>parcours</b> en amont ; lui régule sa <b>progression</b>.",
          en: "They move forward, pause, go back. You and we structure the <b>path</b> beforehand; they manage their own <b>progression</b>."
        }
      },
      quiz: {
        q: { fr: "Pourquoi votre texte doit-il être plus complet qu'en présentiel ?", en: "Why must your text be more complete than in a classroom?" },
        options: {
          fr: ["Parce que l'apprenant·e est seul·e : vous n'êtes pas là pour préciser à l'oral", "Parce que les textes longs sont mieux notés", "Parce que la vidéo coûte cher"],
          en: ["Because the learner is alone: you are not there to clarify out loud", "Because long texts score better", "Because video is expensive"]
        },
        answer: 0,
        explain: { fr: "En asynchrone, tout ce que vous diriez spontanément doit figurer dans le texte : c'est lui qui porte votre présence.", en: "In asynchronous learning, everything you would say spontaneously must be in the text: it carries your presence." }
      }
    },

    // 3 ─────────────────────────────────────────────────────────
    livrables: {
      kicker: { fr: "Votre rôle — vos 5 livrables", en: "Your role — your 5 deliverables" },
      title: { fr: "Votre rôle : la matière première pédagogique", en: "Your role: the raw pedagogical material" },
      lead: {
        fr: "Votre livrable, c'est la <b>matière première pédagogique</b> de votre cours. Concrètement, cinq types de contenus — retournez chaque carte pour les découvrir.",
        en: "Your deliverable is the <b>raw pedagogical material</b> of your course. In practice, five kinds of content — flip each card to discover them."
      },
      cards: [
        {
          glyph: "❶",
          title: { fr: "Un plan structuré", en: "A structured outline" },
          short: { fr: "Parties & chapitres", en: "Parts & chapters" },
          body: {
            fr: "Organisez votre contenu en grandes <b>parties</b> (≈ 1h30 à 2h), découpées en <b>chapitres</b> (≈ 30 à 45 min). Indiquez la progression logique. <i>Inutile de découper plus finement : nos IP re-segmenteront chaque chapitre en leçons de 15–20 min.</i>",
            en: "Organise your content into broad <b>parts</b> (≈ 1h30 to 2h), split into <b>chapters</b> (≈ 30 to 45 min). Indicate the logical progression. <i>No need to segment more finely: our IPs will re-segment each chapter into 15–20 min lessons.</i>"
          }
        },
        {
          glyph: "❷",
          title: { fr: "Un contenu rédigé & développé", en: "Written & developed content" },
          short: { fr: "Le cœur du travail", en: "The heart of the work" },
          body: {
            fr: "Écrivez <b>comme si vous le dictiez à un collègue</b> qui devrait le donner à votre place : explications entières, ton direct (« Vous allez entendre… »), exemples développés. N'hésitez pas à écrire « trop » — il est plus facile de raccourcir que de compléter.",
            en: "Write <b>as if dictating it to a colleague</b> who would deliver it in your place: full explanations, a direct tone (\u201CYou are about to hear…\u201D), developed examples. Do not hesitate to write \u201Ctoo much\u201D — it is easier to cut than to fill in."
          }
        },
        {
          glyph: "❸",
          title: { fr: "Vos ressources pédagogiques", en: "Your teaching resources" },
          short: { fr: "Audio, images, partitions", en: "Audio, images, scores" },
          body: {
            fr: "Vous seul·e savez quels exemples illustrent le mieux votre propos. Fournissez les fichiers audio (avec minutage précis), images, schémas, partitions, liens d'écoute — et décrivez les indications visuelles souhaitées.",
            en: "You alone know which examples best illustrate your point. Provide audio files (with precise timecodes), images, diagrams, scores, listening links — and describe the visual cues you want."
          }
        },
        {
          glyph: "❹",
          title: { fr: "Vos idées d'évaluation", en: "Your assessment ideas" },
          short: { fr: "Quiz : vous validez", en: "Quizzes: you validate" },
          body: {
            fr: "Signalez au fil du texte les moments de vérification, les erreurs fréquentes de vos étudiant·es, vos idées de questions — même brutes. <b>Vous n'avez pas à rédiger les quiz : nous les concevons</b>, vous les validez.",
            en: "Flag, as you write, the checkpoints, your students' common mistakes, your question ideas — even rough ones. <b>You don't write the full quizzes: we design them</b>, you validate them."
          }
        },
        {
          glyph: "❺",
          title: { fr: "Les moments en vidéo", en: "The video moments" },
          short: { fr: "Capsules 3–5 min", en: "3–5 min capsules" },
          body: {
            fr: "Repérez les passages qui gagneraient à être dits face caméra (intro, anecdote, synthèse, démonstration). Nous tournons ensemble ces capsules (3–5 min) au studio, script préparé avec vous.",
            en: "Spot the passages that would gain from being said on camera (intro, anecdote, summary, demonstration). We film these short capsules (3–5 min) together at the studio, with a script prepared with you."
          }
        }
      ],
      callout1: {
        kind: "tip",
        title: { fr: "Astuce — la dictée vocale", en: "Tip — voice dictation" },
        body: {
          fr: "Si l'écriture vous semble fastidieuse, dictez votre cours : dans l'atelier, cliquez sur le micro, placez le curseur dans un champ et parlez — le texte s'écrit tout seul. Vous pouvez même <b>dicter la ponctuation</b> (« virgule », « point », « à la ligne »). Relisez et structurez ensuite.",
          en: "If writing feels tedious, dictate your course: in the workshop, click the microphone, place the cursor in a field and speak — the text writes itself. You can even <b>dictate punctuation</b> (\u201Ccomma\u201D, \u201Cperiod\u201D, \u201Cnew line\u201D). Then reread and structure it."
        }
      },
      simTitle: { fr: "Combien écrire ?", en: "How much should you write?" },
      simBody: {
        fr: "Repère de volume : pour <b>10 minutes</b> de cours, prévoyez <b>900 à 1 200 mots</b> de script brut. Déplacez le curseur pour estimer le volume selon la durée visée.",
        en: "Volume benchmark: for <b>10 minutes</b> of course, plan <b>900 to 1,200 words</b> of raw script. Move the slider to estimate the volume for a target duration."
      },
      callout2: {
        kind: "note",
        title: { fr: "Des repères, pas des contraintes", en: "Benchmarks, not constraints" },
        body: {
          fr: "Un cours plus « littéraire » donnera plus à écrire ; un cours « expérientiel » (ressources, exercices) demandera moins de rédaction.",
          en: "A more \u201Cliterary\u201D course will mean more to write; an \u201Cexperiential\u201D course (resources, exercises) will require less writing."
        }
      },
      fillin: {
        badge: { fr: "À votre tour", en: "Your turn" },
        title: { fr: "Estimez votre cours", en: "Estimate your course" },
        intro: { fr: "Renseignez la durée visée de votre cours — nous calculons le volume de script à prévoir, avec les mêmes repères que le simulateur.", en: "Enter your course's target duration — we compute the script volume to plan, with the same benchmarks as the simulator above." },
        pre: { fr: "Mon cours durera environ", en: "My course will last about" },
        hUnit: { fr: "h", en: "h" },
        mUnit: { fr: "min", en: "min" },
        mid: { fr: "soit", en: "that is" },
        resultUnit: { fr: "mots de script brut", en: "words of raw script" },
        empty: { fr: "— saisissez une durée —", en: "— enter a duration —" },
        detail: { fr: "Sur la base de 90 à 120 mots par minute.", en: "Based on 90 to 120 words per minute." },
        breakdown: { fr: "≈ {pages} pages · {read} min de lecture du script", en: "≈ {pages} pages · {read} min to read the script" }
      }
    },

    // 4 ─────────────────────────────────────────────────────────
    equipe: {
      kicker: { fr: "Ce que fait notre équipe", en: "What our team does" },
      title: { fr: "Le rôle des ingénieurs pédagogiques", en: "The role of the learning engineers" },
      lead: {
        fr: "Une fois votre cours écrit, voici ce que nous prenons en charge pour le rendre efficient en ligne.",
        en: "Once your course is written, here is what we take care of to make it effective online."
      },
      items: [
        { icon: "scissors", title: { fr: "Découpage pédagogique", en: "Pedagogical segmentation" }, body: { fr: "Nous re-segmentons vos chapitres (30–45 min) en leçons courtes de 15 à 20 min adaptées à l'écran. Vous n'avez pas à le faire : raisonnez en parties et chapitres.", en: "We re-segment your chapters (30–45 min) into short 15–20 min lessons suited to the screen. You don't have to do this: think in parts and chapters." } },
        { icon: "target", title: { fr: "Objectifs pédagogiques", en: "Learning objectives" }, body: { fr: "« À la fin de cette leçon, vous saurez / serez capable de… » : ils structurent le contenu et les évaluations.", en: "\u201CBy the end of this lesson, you will know / be able to…\u201D: they structure the content and assessments." } },
        { icon: "image", title: { fr: "Médiatisation", en: "Mediatisation" }, body: { fr: "Schémas dynamiques, motion design, traitement audio/vidéo, illustrations chartées.", en: "Dynamic diagrams, motion design, audio/video processing, on-brand illustrations." } },
        { icon: "puzzle", title: { fr: "Activités interactives", en: "Interactive activities" }, body: { fr: "Quiz, textes à trous, questions ouvertes, modules sur-mesure ; nous rédigeons les explications, vous vérifiez l'exactitude.", en: "Quizzes, fill-in-the-blanks, open questions, bespoke modules; we write the explanations, you check accuracy." } },
        { icon: "book", title: { fr: "Storyboard & réécriture pour l'écran", en: "Storyboard & rewriting for the screen" }, body: { fr: "Plan visuel complet, texte adapté à l'asynchrone.", en: "A full visual plan, text adapted to asynchronous learning." } },
        { icon: "film", title: { fr: "Production & intégration", en: "Production & integration" }, body: { fr: "Tournages, animations, assemblage dans l'outil auteur, tests avec des personnes extérieures.", en: "Filming, animations, assembly in the authoring tool, testing with outside people." } }
      ],
      callout1: {
        kind: "important",
        title: { fr: "Un engagement fort", en: "A strong commitment" },
        body: {
          fr: "Toute la production technique — intégration, graphisme, illustrations, montage, postproduction — est prise en charge par notre équipe : <b>3 à 5 mois de travail</b> de notre côté.",
          en: "All the technical production — integration, graphic design, illustrations, editing, post-production — is handled by our team: <b>3 to 5 months of work</b> on our side."
        }
      }
    },

    // 5 ─────────────────────────────────────────────────────────
    etapes: {
      kicker: { fr: "Étapes & charge de travail", en: "Steps & workload" },
      title: { fr: "Les étapes et la charge de travail", en: "The steps and the workload" },
      lead: {
        fr: "La collaboration est itérative. N'attendez pas d'avoir tout terminé — cliquez sur chaque escale pour voir le détail.",
        en: "The collaboration is iterative. Do not wait until everything is finished — click each stop to see the detail."
      },
      steps: [
        { owner: "both", title: { fr: "Cadrage", en: "Framing" }, by: { fr: "Ensemble", en: "Together" }, body: { fr: "Public visé, thématiques, progression ; on valide le plan général.", en: "Target audience, themes, progression; we validate the overall outline." } },
        { owner: "expert", title: { fr: "Rédaction de la 1ʳᵉ partie", en: "Writing the 1st part" }, by: { fr: "Vous", en: "You" }, body: { fr: "Envoyez-la dès qu'elle est prête, même imparfaite : c'est le meilleur moyen de caler le niveau de détail attendu.", en: "Send it as soon as it is ready, even imperfect: the best way to calibrate the expected level of detail." } },
        { owner: "both", title: { fr: "Retour et ajustement", en: "Feedback & adjustment" }, by: { fr: "Ensemble", en: "Together" }, body: { fr: "Ce qui est clair, ce qui manque, nos questions.", en: "What is clear, what is missing, our questions." } },
        { owner: "expert", title: { fr: "Rédaction des parties suivantes", en: "Writing the following parts" }, by: { fr: "Vous", en: "You" }, body: { fr: "Plus fluide, le niveau attendu étant désormais compris.", en: "Smoother, now that the expected level is understood." } },
        { owner: "ip", title: { fr: "Scénarisation et production", en: "Scenarisation & production" }, by: { fr: "Nous", en: "Us" }, body: { fr: "Vous relisez et validez au fur et à mesure.", en: "You review and validate as we go." } },
        { owner: "both", title: { fr: "Corrections finales", en: "Final corrections" }, by: { fr: "Ensemble", en: "Together" }, body: { fr: "Revue du cours terminé, tests, ajustements.", en: "Review of the finished course, testing, adjustments." } }
      ],
      callout1: {
        kind: "note",
        title: { fr: "Estimation pour un cours de 4–5 h (3 parties)", en: "Estimate for a 4–5 h course (3 parts)" },
        body: {
          fr: "<b>~40 heures de votre temps</b> — cadrage ~3h, rédaction ~21h (7h/partie), relectures ~6h, validation des quiz ~3h, tournage ~4h, validation finale ~3h.",
          en: "<b>~40 hours of your time</b> — framing ~3h, writing ~21h (7h/part), reviews ~6h, quiz validation ~3h, filming ~4h, final validation ~3h."
        }
      },
      // workload breakdown for the bar viz
      workload: [
        { label: { fr: "Cadrage", en: "Framing" }, h: 3 },
        { label: { fr: "Rédaction", en: "Writing" }, h: 21 },
        { label: { fr: "Relectures", en: "Reviews" }, h: 6 },
        { label: { fr: "Validation quiz", en: "Quiz validation" }, h: 3 },
        { label: { fr: "Tournage", en: "Filming" }, h: 4 },
        { label: { fr: "Validation finale", en: "Final validation" }, h: 3 }
      ]
    },

    // 5b ─ NEW: Atelier de rédaction ─────────────────────────────
    atelier: {
      kicker: { fr: "Un outil pour vous accompagner", en: "A tool to support you" },
      title: { fr: "L'atelier de rédaction", en: "The writing workshop" },
      lead: {
        fr: "Pour vous faciliter la tâche, nous avons conçu un <b>atelier de rédaction</b> en ligne. Il vous aide à produire votre matière première au format attendu par l'équipe — sans vous soucier de la mise en forme technique.",
        en: "To make your task easier, we built an online <b>writing workshop</b>. It helps you produce your raw material in the format expected by the team — without worrying about technical formatting."
      },
      toolUrl: "https://chrislays.github.io/cnsmdp-elearning-beta/atelier-redaction.html",
      openLabel: { fr: "Ouvrir l'atelier de rédaction", en: "Open the writing workshop" },
      shotCaption: { fr: "Déposez ici une capture de l'atelier", en: "Drop a screenshot of the workshop here" },
      featuresTitle: { fr: "Ce que l'atelier vous permet", en: "What the workshop lets you do" },
      features: [
        { icon: "feather", title: { fr: "Écrire ou dicter", en: "Write or dictate" }, body: { fr: "Rédigez directement, ou dictez à la voix — la ponctuation comprise. Le texte s'écrit pour vous.", en: "Write directly, or dictate by voice — punctuation included. The text writes itself for you." } },
        { icon: "book", title: { fr: "Importer un document", en: "Import a document" }, body: { fr: "Word, PDF, PowerPoint, ODT, RTF… converti automatiquement et inséré comme blocs dans le chapitre choisi.", en: "Word, PDF, PowerPoint, ODT, RTF… automatically converted and inserted as blocks in the chosen chapter." } },
        { icon: "layers", title: { fr: "Structurer en blocs", en: "Structure into blocks" }, body: { fr: "Organisez en chapitres et blocs : texte, ressource, extrait audio, idée d'évaluation.", en: "Organise into chapters and blocks: text, resource, audio excerpt, assessment idea." } },
        { icon: "headphones", title: { fr: "Ressources & audio minuté", en: "Resources & timed audio" }, body: { fr: "Joignez vos ressources avec leurs références, et vos extraits audio avec un minutage précis.", en: "Attach your resources with their references, and your audio excerpts with precise timecodes." } },
        { icon: "puzzle", title: { fr: "Idées d'évaluation", en: "Assessment ideas" }, body: { fr: "Notez au fil du texte vos idées de questions et les erreurs fréquentes de vos étudiant·es.", en: "Jot down, as you write, your question ideas and your students' common mistakes." } },
        { icon: "image", title: { fr: "Aperçu côté apprenant·e", en: "Learner-side preview" }, body: { fr: "Visualisez une vue approximative de votre cours tel que l'apprenant·e le découvrira.", en: "See an approximate view of your course as the learner will discover it." } }
      ],
      flowTitle: { fr: "En pratique, en 4 temps", en: "In practice, in 4 steps" },
      flow: [
        { n: "1", title: { fr: "Écrire ou importer", en: "Write or import" }, body: { fr: "Partez d'une page blanche, dictez, ou importez un document existant.", en: "Start from a blank page, dictate, or import an existing document." } },
        { n: "2", title: { fr: "Structurer & enrichir", en: "Structure & enrich" }, body: { fr: "Découpez en blocs, ajoutez ressources, audios et idées de quiz.", en: "Break into blocks, add resources, audio and quiz ideas." } },
        { n: "3", title: { fr: "Prévisualiser", en: "Preview" }, body: { fr: "Vérifiez le rendu côté apprenant·e et ajustez.", en: "Check the learner-side rendering and adjust." } },
        { n: "4", title: { fr: "Exporter & envoyer", en: "Export & send" }, body: { fr: "Téléchargez le fichier au bon format et envoyez-le à votre interlocuteur·rice.", en: "Download the file in the right format and send it to your contact." } }
      ],
      callout1: {
        kind: "tip",
        title: { fr: "Tout y est, au bon format", en: "Everything is there, in the right format" },
        body: {
          fr: "À l'export, l'atelier rassemble <b>votre contenu, vos ressources avec leurs références, vos extraits audio minutés et vos idées d'évaluation</b> dans un seul fichier — exactement la matière première dont nous avons besoin pour démarrer.",
          en: "On export, the workshop gathers <b>your content, your resources with their references, your timed audio excerpts and your assessment ideas</b> into a single file — exactly the raw material we need to get started."
        }
      },
      callout2: {
        kind: "note",
        title: { fr: "L'outil sert le contenu, pas l'inverse", en: "The tool serves the content, not the other way round" },
        body: {
          fr: "L'atelier est une commodité, pas une obligation : si vous préférez un simple document Word, c'est parfait aussi. L'essentiel reste votre matière pédagogique.",
          en: "The workshop is a convenience, not an obligation: if you prefer a plain Word document, that works too. What matters is your pedagogical material."
        }
      },
      markdownTitle: { fr: "Pourquoi le Markdown ?", en: "Why Markdown?" },
      markdownIntro: {
        fr: "Nous utilisons le langage <b>Markdown</b> dans cet éditeur. C'est un format texte simple et léger : quelques signes (#, *, -) suffisent à structurer le contenu, sans dépendre d'un logiciel propriétaire.",
        en: "We use the <b>Markdown</b> language in this editor. It is a simple, lightweight text format: a few symbols (#, *, -) are enough to structure content, without depending on any proprietary software."
      },
      markdownWhy: {
        fr: "L'objectif est d'obtenir un contenu de cours <b>authentique et pérenne</b> — une source unique, propre et lisible, que nous pouvons ensuite <b>décliner dans tous les formats numériques</b> sans le réécrire.",
        en: "The goal is to obtain <b>authentic and durable</b> course content — a single, clean, readable source that we can then <b>decline into every digital format</b> without rewriting it."
      },
      markdownFormats: [
        { icon: "globe", label: { fr: "Web", en: "Web" } },
        { icon: "puzzle", label: { fr: "Interactivités", en: "Interactivities" } },
        { icon: "film", label: { fr: "Scripts vidéo", en: "Video scripts" } },
        { icon: "book", label: { fr: "PDF", en: "PDF" } },
        { icon: "layers", label: { fr: "Wiki", en: "Wiki" } },
        { icon: "feather", label: { fr: "Ebooks", en: "Ebooks" } },
        { icon: "quote", label: { fr: "Formats papier", en: "Print formats" } }
      ],
      // ── Interactive Markdown studio ──
      mdStudioHint: { fr: "Choisissez un format de sortie — le même contenu se transforme.", en: "Pick an output format — the same content transforms." },
      mdSourceLabel: { fr: "Source unique · Markdown", en: "Single source · Markdown" },
      mdSyntaxLegend: {
        fr: [["#", "titre"], ["**", "gras"], ["-", "liste"], ["&gt;", "citation"], ["[ ]( )", "lien / média"]],
        en: [["#", "heading"], ["**", "bold"], ["-", "list"], ["&gt;", "quote"], ["[ ]( )", "link / media"]]
      },
      mdSource: {
        fr: [
          { t: "h1", md: "# Le phrasé baroque" },
          { t: "p", md: "L'**articulation** distingue le jeu" },
          { t: "p", md: "baroque du jeu romantique." },
          { t: "li", md: "- inégalités rythmiques" },
          { t: "li", md: "- ornements improvisés" },
          { t: "quote", md: "> « La musique doit toucher le cœur. »" },
          { t: "media", md: "[Écouter l'exemple](audio/ex-1.mp3)" }
        ],
        en: [
          { t: "h1", md: "# Baroque phrasing" },
          { t: "p", md: "**Articulation** sets baroque playing" },
          { t: "p", md: "apart from romantic playing." },
          { t: "li", md: "- rhythmic inequalities" },
          { t: "li", md: "- improvised ornaments" },
          { t: "quote", md: "> \u201CMusic must touch the heart.\u201D" },
          { t: "media", md: "[Listen to the example](audio/ex-1.mp3)" }
        ]
      },
      // rendered content shared across mediums
      mdContent: {
        fr: { title: "Le phrasé baroque", body: "L'articulation distingue le jeu baroque du jeu romantique.", list: ["inégalités rythmiques", "ornements improvisés"], quote: "« La musique doit toucher le cœur. »", cite: "C.P.E. Bach", media: "Écouter l'exemple" },
        en: { title: "Baroque phrasing", body: "Articulation sets baroque playing apart from romantic playing.", list: ["rhythmic inequalities", "improvised ornaments"], quote: "\u201CMusic must touch the heart.\u201D", cite: "C.P.E. Bach", media: "Listen to the example" }
      },
      mdFormats: [
        { id: "web", icon: "globe", label: { fr: "Web", en: "Web" }, why: { fr: "Le Markdown se convertit directement en <b>HTML responsive</b> : titres, liens et lecteur audio intégrés, lisible sur tout écran.", en: "Markdown converts straight to <b>responsive HTML</b>: headings, links and an embedded audio player, readable on any screen." } },
        { id: "interactif", icon: "puzzle", label: { fr: "Interactivités", en: "Interactivities" }, why: { fr: "Les listes et exemples deviennent des <b>quiz, modules cliquables</b> et activités — la structure du Markdown sert de squelette.", en: "Lists and examples become <b>quizzes, clickable modules</b> and activities — the Markdown structure serves as the skeleton." } },
        { id: "video", icon: "film", label: { fr: "Script vidéo", en: "Video script" }, why: { fr: "Le texte devient un <b>script minuté</b> ; les titres découpent les séquences, les citations deviennent des incrustations.", en: "The text becomes a <b>timed script</b>; headings cut the sequences, quotes become on-screen captions." } },
        { id: "pdf", icon: "book", label: { fr: "PDF", en: "PDF" }, why: { fr: "Une <b>mise en page paginée</b>, prête à imprimer, archiver ou distribuer — sans retoucher le contenu.", en: "A <b>paginated layout</b>, ready to print, archive or distribute — without touching the content." } },
        { id: "wiki", icon: "layers", label: { fr: "Wiki", en: "Wiki" }, why: { fr: "Les pages se <b>relient entre elles</b> avec une table des matières automatique — idéal pour une base de connaissances.", en: "Pages <b>link to each other</b> with an automatic table of contents — ideal for a knowledge base." } },
        { id: "ebook", icon: "feather", label: { fr: "Ebook", en: "Ebook" }, why: { fr: "Un <b>EPUB redimensionnable</b> que l'apprenant·e lit sur liseuse ou mobile, hors-ligne, à sa taille de police.", en: "A <b>resizable EPUB</b> the learner reads on an e-reader or phone, offline, at their own font size." } },
        { id: "papier", icon: "quote", label: { fr: "Papier", en: "Print" }, why: { fr: "Un <b>livret imprimé</b> — support de cours, programme de concert, partition annotée — depuis la même source.", en: "A <b>printed booklet</b> — course handout, concert programme, annotated score — from the same source." } }
      ],
      // ── Markdown sandbox exercise ──
      sandbox: {
        badge: { fr: "Exercice · bac à sable", en: "Exercise · sandbox" },
        title: { fr: "Apprenez le Markdown en 10 minutes", en: "Learn Markdown in 10 minutes" },
        duration: 10,
        durationLabel: { fr: "≈ 10 min", en: "≈ 10 min" },
        intro: {
          fr: "Un mini-atelier guidé : à chaque étape, une consigne. Vous écrivez à gauche, le résultat s'affiche à droite. Pas de piège — tout s'apprend en faisant.",
          en: "A short guided workshop: one instruction per step. You write on the left, the result shows on the right. No traps — you learn by doing."
        },
        objectivesLabel: { fr: "Ce que vous saurez faire", en: "What you'll be able to do" },
        objectives: {
          fr: ["Créer des titres et hiérarchiser", "Mettre en gras et en italique", "Faire des listes", "Citer et insérer un lien"],
          en: ["Create headings and structure", "Make text bold and italic", "Build lists", "Quote and insert a link"]
        },
        startLabel: { fr: "Commencer l'exercice", en: "Start the exercise" },
        editorLabel: { fr: "À vous d'écrire", en: "Your turn to write" },
        previewLabel: { fr: "Aperçu en direct", en: "Live preview" },
        previewEmpty: { fr: "Votre rendu apparaîtra ici.", en: "Your rendering will appear here." },
        placeholder: { fr: "Écrivez votre Markdown ici…", en: "Write your Markdown here…" },
        validate: { fr: "Valider", en: "Check" },
        next: { fr: "Étape suivante", en: "Next step" },
        finishLabel: { fr: "Terminer", en: "Finish" },
        showExample: { fr: "Voir un indice", en: "Show a hint" },
        hideExample: { fr: "Masquer l'indice", en: "Hide the hint" },
        detected: { fr: "Détecté", en: "Detected" },
        notYet: { fr: "Pas encore — relisez la consigne et réessayez.", en: "Not yet — re-read the instruction and try again." },
        consigne: { fr: "Consigne", en: "Task" },
        timeLabel: { fr: "Temps", en: "Time" },
        timeUp: { fr: "Temps conseillé écoulé — prenez le temps qu'il vous faut.", en: "Suggested time is up — take all the time you need." },
        tasks: [
          { type: "h1", instruction: { fr: "Écrivez un <b>titre de niveau 1</b> : un signe <code>#</code> suivi d'une espace, puis votre texte.", en: "Write a <b>level-1 heading</b>: a <code>#</code> sign followed by a space, then your text." }, hint: "# Le phrasé baroque",
            success: { fr: "Parfait. Un <code>#</code> = titre de niveau 1. Ajoutez des dièses pour descendre dans la hiérarchie : <code>##</code> pour un niveau 2, <code>###</code> pour un niveau 3.", en: "Perfect. One <code>#</code> = level-1 heading. Add more hashes to go down the hierarchy: <code>##</code> for level 2, <code>###</code> for level 3." } },
          { type: "h2", instruction: { fr: "À votre tour : écrivez un <b>titre de niveau 2</b> avec <code>##</code>.", en: "Your turn: write a <b>level-2 heading</b> with <code>##</code>." }, hint: "## Origines",
            success: { fr: "Bien vu. La hiérarchie des titres structure votre cours — c'est elle que nous réutilisons pour découper les leçons.", en: "Nicely done. The heading hierarchy structures your course — it's what we reuse to segment lessons." } },
          { type: "italic", instruction: { fr: "Mettez un mot en <i>italique</i> en l'entourant d'astérisques : <code>*mot*</code>.", en: "Make a word <i>italic</i> by wrapping it in asterisks: <code>*word*</code>." }, hint: "*expressif*",
            success: { fr: "Bravo. Une paire d'astérisques met en italique. Les underscores marchent aussi : <code>_mot_</code>.", en: "Bravo. A pair of asterisks makes italics. Underscores work too: <code>_word_</code>." } },
          { type: "bold", instruction: { fr: "Mettez un mot en <b>gras</b> avec <b>deux</b> astérisques : <code>**mot**</code>.", en: "Make a word <b>bold</b> with <b>two</b> asterisks: <code>**word**</code>." }, hint: "**articulation**",
            success: { fr: "Excellent. Deux astérisques = gras. Et trois <code>***mot***</code> = gras italique.", en: "Excellent. Two asterisks = bold. And three <code>***word***</code> = bold italic." } },
          { type: "list", instruction: { fr: "Écrivez une <b>liste à puces</b> d'au moins deux éléments : commencez chaque ligne par <code>- </code>.", en: "Write a <b>bulleted list</b> of at least two items: start each line with <code>- </code>." }, hint: "- inégalités rythmiques\n- ornements improvisés",
            success: { fr: "Une liste ! Pour une liste <b>numérotée</b>, commencez les lignes par <code>1.</code> <code>2.</code> <code>3.</code>", en: "A list! For a <b>numbered</b> list, start lines with <code>1.</code> <code>2.</code> <code>3.</code>" } },
          { type: "quote", instruction: { fr: "Insérez une <b>citation</b> : commencez la ligne par <code>></code> suivi d'une espace.", en: "Insert a <b>quote</b>: start the line with <code>></code> followed by a space." }, hint: "> La musique doit toucher le cœur.",
            success: { fr: "Belle citation. Le <code>></code> crée un bloc mis en retrait, idéal pour un extrait ou une parole d'auteur.", en: "Lovely quote. The <code>></code> creates an indented block, ideal for an excerpt or an author's words." } },
          { type: "link", instruction: { fr: "Créez un <b>lien</b> : le texte entre crochets, l'adresse entre parenthèses — <code>[texte](adresse)</code>.", en: "Create a <b>link</b>: text in brackets, address in parentheses — <code>[text](address)</code>." }, hint: "[Écouter l'exemple](audio/ex-1.mp3)",
            success: { fr: "Lien créé ! Pour insérer une <b>image</b>, ajoutez un <code>!</code> devant : <code>![légende](image.jpg)</code>.", en: "Link created! To insert an <b>image</b>, add a <code>!</code> in front: <code>![caption](image.jpg)</code>." } }
        ],
        doneTitle: { fr: "Bravo — vous maîtrisez les bases.", en: "Bravo — you've got the basics." },
        doneBody: { fr: "Vous savez désormais structurer un contenu en Markdown : titres, emphase, listes, citations et liens… Mais pour vous faciliter la tâche, nous vous avons créé un éditeur de cours qui vous permet d'insérer des blocs de titres, de paragraphes et bien d'autres choses — sans écrire un seul caractère de Markdown.", en: "You can now structure content in Markdown: headings, emphasis, lists, quotes and links… But to make your task easier, we built a course editor that lets you insert blocks of headings, paragraphs and much more — without writing a single character of Markdown." },
        timeUsed: { fr: "Temps utilisé", en: "Time used" },
        restart: { fr: "Recommencer l'exercice", en: "Restart the exercise" },
        openTool: { fr: "Passer à l'atelier", en: "Go to the workshop" }
      }
    },

    // 6 ─────────────────────────────────────────────────────────
    vigilance: {
      kicker: { fr: "Points de vigilance", en: "Points to watch" },
      title: { fr: "Points de vigilance & checklist", en: "Points to watch & checklist" },
      lead: {
        fr: "Quelques exigences à ne pas négliger — puis cochez votre checklist de démarrage. Elle est sauvegardée automatiquement.",
        en: "A few requirements not to overlook — then tick your start-up checklist. It is saved automatically."
      },
      watch: [
        { title: { fr: "Exigence sonore", en: "Sound quality" }, body: { fr: "Fournissez des fichiers sources de la plus haute qualité possible.", en: "Provide source files of the highest possible quality." } },
        { title: { fr: "Rigueur des sources", en: "Rigorous sourcing" }, body: { fr: "Citez tout (images, textes, partitions) selon les normes APA.", en: "Cite everything (images, texts, scores) following APA standards." } },
        { title: { fr: "Droit d'auteur", en: "Copyright" }, body: { fr: "Privilégiez le libre de droits ou les enregistrements du CNSMDP. Pour le commercial, donnez les minutages exacts — droit de courte citation : 30 secondes max.", en: "Favour royalty-free material or CNSMDP recordings. For commercial works, give the exact timecodes — short-quotation right: 30 seconds max." } },
        { title: { fr: "N'attendez pas d'avoir tout fini", en: "Don't wait until everything is done" }, body: { fr: "Envoyez d'abord la première partie.", en: "Send the first part first." } }
      ],
      checklistTitle: { fr: "Votre checklist de démarrage", en: "Your start-up checklist" },
      checklist: {
        fr: [
          "J'ai lu ce guide dans son intégralité.",
          "J'ai défini les grandes parties de mon cours (plan général).",
          "J'ai identifié mes principales ressources (audio, visuels, liens).",
          "J'ai noté les erreurs fréquentes de mes étudiant·es sur ce sujet.",
          "J'ai convenu d'un premier rendez-vous de cadrage avec l'équipe."
        ],
        en: [
          "I have read this guide in full.",
          "I have defined the broad parts of my course (overall outline).",
          "I have identified my main resources (audio, visuals, links).",
          "I have noted my students' common mistakes on this topic.",
          "I have agreed on a first framing meeting with the team."
        ]
      },
      checklistDone: { fr: "Checklist complète — vous êtes prêt·e à démarrer.", en: "Checklist complete — you are ready to begin." }
    },

    // 7 ─────────────────────────────────────────────────────────
    campus: {
      kicker: { fr: "Exemples de cours produits", en: "Examples of courses produced" },
      title: { fr: "Le Campus — nos cours en ligne", en: "Le Campus — our online courses" },
      lead: {
        fr: "Nos cours sont publiés sur <b>Le Campus — Conservatoire augmenté</b>, la plateforme de formation à distance du CNSMDP. Le meilleur moyen de vous projeter : parcourir un cours déjà en ligne.",
        en: "Our courses are published on <b>Le Campus — Conservatoire augmenté</b>, the CNSMDP's distance-learning platform. The best way to picture it: browse a course already online."
      },
      portalLabel: { fr: "Ouvrir le portail des cours", en: "Open the course portal" },
      portalUrl: "https://campus.cnsmdplus.com/courses/",
      callout1: {
        kind: "note",
        title: { fr: "Un parcours unique pour chaque cours", en: "A unique path for each course" },
        body: {
          fr: "Les exemples s'ouvrent dans un nouvel onglet. Nous concevons un parcours et des activités <b>uniques</b> pour chaque cours — le vôtre ne ressemblera à aucun autre.",
          en: "Examples open in a new tab. We design a <b>unique</b> path and activities for each course — yours will look like no other."
        }
      },
      recapTitle: { fr: "Auto-évaluation finale", en: "Final self-assessment" },
      recapSub: { fr: "Trois questions pour vérifier l'essentiel avant de vous lancer.", en: "Three questions to check the essentials before you begin." },
      recap: [
        {
          q: { fr: "Qui re-découpe les chapitres en leçons courtes de 15–20 min ?", en: "Who re-segments chapters into short 15–20 min lessons?" },
          options: { fr: ["L'expert, en amont", "L'équipe d'ingénierie pédagogique", "Personne, le chapitre reste tel quel"], en: ["The expert, beforehand", "The learning-engineering team", "No one, the chapter stays as is"] },
          answer: 1,
          explain: { fr: "Vous raisonnez en parties et chapitres ; nous nous chargeons du découpage en leçons.", en: "You think in parts and chapters; we handle the segmentation into lessons." }
        },
        {
          q: { fr: "Combien de mots prévoir pour 10 minutes de cours ?", en: "How many words for 10 minutes of course?" },
          options: { fr: ["100 à 200 mots", "900 à 1 200 mots", "5 000 mots minimum"], en: ["100 to 200 words", "900 to 1,200 words", "5,000 words minimum"] },
          answer: 1,
          explain: { fr: "≈ 900 à 1 200 mots de script brut pour 10 minutes — un repère, pas une contrainte.", en: "≈ 900 to 1,200 words of raw script for 10 minutes — a benchmark, not a constraint." }
        },
        {
          q: { fr: "Quand envoyer votre première partie ?", en: "When should you send your first part?" },
          options: { fr: ["Quand tout le cours est fini", "Dès qu'elle est prête, même imparfaite", "Seulement après le tournage"], en: ["When the whole course is finished", "As soon as it is ready, even imperfect", "Only after filming"] },
          answer: 1,
          explain: { fr: "Envoyez-la tôt : c'est le meilleur moyen de caler ensemble le niveau de détail attendu.", en: "Send it early: the best way to calibrate together the expected level of detail." }
        }
      ],
      finalTitle: { fr: "Presque prêt·e", en: "Almost ready" },
      finalBody: {
        fr: "Vous avez parcouru l'essentiel de la collaboration. Prochaine étape : la rédaction, dans l'atelier.",
        en: "You have been through the essentials of the collaboration. Next step: the writing, in the workshop."
      }
    }
  }
};
