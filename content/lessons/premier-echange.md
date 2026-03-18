---
title: "Ton premier échange avec Claude Code"
description: "Apprends à formuler tes demandes et à itérer avec Claude Code."
phase: 1
module: 1
lessonNumber: "1.3"
duration: 20
difficulty: beginner
type: exercise
tags:
  - claude-code
  - prompt
  - conversation
concepts:
  - Prompt
  - contexte
  - itération
objectives:
  - Formuler un premier prompt
  - Comprendre la réponse de Claude
  - Itérer sur une demande
checklist:
  - id: first-prompt
    label: "Écrire ton premier prompt"
  - id: read-response
    label: "Lire et comprendre la réponse"
  - id: iterate
    label: "Reformuler pour améliorer le résultat"
  - id: save-work
    label: "Sauvegarder ton travail"
---

# Ton premier échange avec Claude Code

OK, Claude Code est installé. Maintenant, on va apprendre à lui parler. Parce que oui, la façon dont tu formules ta demande change complètement la qualité de la réponse.

## C'est quoi un prompt ?

Un **prompt**, c'est simplement ce que tu écris à l'IA. Ta question, ta demande, ton instruction. Plus ton prompt est clair et précis, meilleure sera la réponse.

C'est comme commander au restaurant : "un truc à manger" vs "un burger saignant avec des frites et une salade". Tu vois la différence.

## Étape 1 : Ton premier prompt

Ouvre ton terminal dans un dossier de projet (ou crée un dossier vide pour tester) et lance Claude Code :

::terminal-block
mkdir mon-premier-projet
cd mon-premier-projet
claude
::

Maintenant, essaie ce premier prompt :

::ai-conversation
user: Crée un fichier index.html avec une page web simple qui affiche "Hello World" en gros et un paragraphe de bienvenue.
assistant: Je vais créer ce fichier pour toi.

[Claude crée le fichier index.html avec le HTML, un titre h1 "Hello World" et un paragraphe de bienvenue, le tout avec un style CSS minimal.]

Le fichier `index.html` a été créé. Tu peux l'ouvrir dans ton navigateur pour voir le résultat.
::

Ouvre le fichier dans ton navigateur pour voir le résultat. Pas mal pour une première demande, non ?

## Étape 2 : Comprendre la réponse

Quand Claude te répond, prends le temps de **lire ce qu'il a fait**. Ne te contente pas de copier-coller. Regarde :

- **Le code généré** : est-ce que tu comprends chaque ligne ?
- **Les explications** : Claude explique souvent ce qu'il fait et pourquoi
- **La structure** : comment le code est organisé ?

Si quelque chose n'est pas clair, demande-lui :

::ai-conversation
user: Explique-moi la ligne avec <meta charset="UTF-8">, c'est quoi exactement ?
assistant: La balise `<meta charset="UTF-8">` indique au navigateur quel encodage de caractères utiliser pour afficher la page.

**UTF-8** est l'encodage le plus courant. Il permet d'afficher correctement les accents (é, è, ê), les emojis et les caractères spéciaux de toutes les langues.

Sans cette ligne, tu pourrais voir des caractères bizarres à la place des accents — par exemple "Ã©" au lieu de "é".
::

Tu vois ? Il suffit de demander. Claude est là pour ça.

## Étape 3 : Itérer pour améliorer

La vraie puissance de l'IA, c'est l'**itération**. Tu obtiens un premier résultat, puis tu affines. C'est comme sculpter : tu pars d'un bloc brut et tu précises petit à petit.

Essaie d'enchaîner avec ces demandes :

::ai-conversation
user: Ajoute un bouton qui change la couleur du fond quand on clique dessus.
assistant: [Claude modifie le fichier pour ajouter un bouton avec un événement JavaScript qui change la couleur de fond aléatoirement à chaque clic.]
::

Puis affine encore :

::ai-conversation
user: Fais en sorte que le bouton alterne entre 3 couleurs précises : bleu clair, vert menthe et lavande.
assistant: [Claude modifie le JavaScript pour faire alterner entre les 3 couleurs demandées avec un compteur.]
::

Tu vois le principe ? Chaque prompt précise un peu plus ce que tu veux. C'est comme ça qu'on travaille avec l'IA.

## Les règles d'or du bon prompt

Voici ce qui fait la différence entre un prompt qui donne un bon résultat et un prompt qui donne n'importe quoi :

### 1. Sois précis

| Prompt vague | Prompt précis |
|-------------|---------------|
| "Fais-moi un site" | "Crée une page HTML avec un titre, 3 paragraphes et un bouton" |
| "Corrige mon code" | "Mon code affiche 'undefined' au lieu du nom. Voici le code : ..." |
| "Ajoute du style" | "Ajoute du CSS : fond gris clair, texte centré, police sans-serif" |

### 2. Donne du contexte

Claude ne voit pas ton écran. Si tu travailles dans un projet, dis-lui :
- Quel langage / framework tu utilises
- Ce que le code est censé faire
- Ce qui ne marche pas

### 3. Montre, ne décris pas

Au lieu de dire "mon code marche pas", colle le code et l'erreur. Claude comprendra beaucoup mieux.

### 4. Itère plutôt que tout redemander

Si le résultat est à 80% de ce que tu veux, demande juste les 20% manquants. Pas besoin de tout recommencer.

## Étape 4 : Sauvegarder ton travail

Claude Code travaille directement avec tes fichiers. Quand il crée ou modifie du code, c'est fait sur ton disque. Mais c'est une bonne habitude de vérifier :

::terminal-block
ls -la
::

Tu devrais voir le fichier `index.html` que Claude a créé. Ouvre-le, vérifie que tout est là, et fais un commit si tu utilises Git :

::terminal-block
git init
git add index.html
git commit -m "Premier fichier créé avec Claude Code"
::

## Ce qu'on retient

- Un **prompt** c'est ta demande à l'IA — plus c'est clair, mieux c'est
- Lis toujours la réponse de Claude — comprendre le code, c'est le but
- **Itère** : un premier résultat + des ajustements = un super résultat
- Sois précis, donne du contexte, montre ton code

Tu viens de faire tes premiers pas avec Claude Code. Dans les prochaines leçons, on va aller plus loin et commencer à créer de vrais projets ensemble.
