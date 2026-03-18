# Tests de validation - Console pédagogique Nuxy

Ce document contient 4 procédures de test pour valider le bon fonctionnement de la console pédagogique et des messages d'aide.

---

## 🧪 Test 1 : Variable non déclarée (ReferenceError)

### Objectif
Valider que le message pédagogique s'affiche correctement pour une variable non déclarée.

### Code à tester
```javascript
console.log('Test 1 : Variable non déclarée')
a = 10
console.log(a)
```

### Résultat attendu

#### ✅ Message pédagogique affiché
```
❌ Variable 'a' non déclarée

Vous essayez d'utiliser la variable 'a' mais elle n'existe pas encore.

💡 Conseil : Déclarez d'abord votre variable avec 'let', 'const' ou 'var'

📖 Voir un exemple ▼ (bouton cliquable)
```

#### ✅ Exemple de code (au clic sur "Voir un exemple")
```javascript
let a = /* votre valeur */
console.log(a)
```

#### ✅ Section "En savoir plus"
```
ℹ️ En savoir plus : Variables et déclarations
```

#### ✅ Section "Détails techniques" (repliée par défaut)
```
▼ Détails techniques
  a is not defined
```

### Critères de validation
- [ ] Le message pédagogique s'affiche avec le bon titre
- [ ] Le conseil apparaît avec l'icône 💡
- [ ] L'exemple est masqué par défaut
- [ ] L'exemple s'affiche au clic sur "Voir un exemple"
- [ ] Les détails techniques sont repliés par défaut
- [ ] Le style visuel est adapté (fond rouge clair, bordure rouge)

---

## 🧪 Test 2 : Erreur de syntaxe (Parenthèse manquante)

### Objectif
Valider la détection d'erreurs de syntaxe et l'affichage du message adapté.

### Code à tester
```javascript
console.log('Test 2 : Erreur de syntaxe')
if (true) {
  console.log('Oups, il manque une accolade'
```

### Résultat attendu

#### ✅ Message pédagogique affiché
```
❌ Parenthèse, accolade ou crochet manquant

Votre code est incomplet. Il manque probablement une parenthèse ),
une accolade } ou un crochet ].

💡 Conseil : Vérifiez que chaque ( a son ), chaque { a son },
et chaque [ a son ]

📖 Voir un exemple ▼
```

#### ✅ Exemple de code (au clic)
```javascript
// ✓ Correct
if (condition) {
  console.log("ok")
}

// ✗ Incorrect (manque })
if (condition) {
  console.log("ok")
```

#### ✅ Section "En savoir plus"
```
ℹ️ En savoir plus : Syntaxe de base
```

### Critères de validation
- [ ] L'erreur de syntaxe est détectée avant exécution
- [ ] Le message explique clairement le problème
- [ ] Le conseil propose une vérification concrète
- [ ] L'exemple montre un code correct ET incorrect

---

## 🧪 Test 3 : Warning pédagogique (Utilisation de var)

### Objectif
Valider l'affichage des warnings pour mauvaises pratiques.

### Code à tester
```javascript
console.log('Test 3 : Mauvaise pratique')
var x = 10
var y = 20
console.log(x + y)
```

### Résultat attendu

#### ✅ Warning pédagogique affiché AVANT les logs
```
⚠️ Utilisation de "var" détectée

Il est recommandé d'utiliser "let" ou "const" au lieu de "var"
en JavaScript moderne.

💡 Conseil : Utilisez "const" pour les valeurs qui ne changent pas,
et "let" pour les variables

📖 Voir un exemple ▼
```

#### ✅ Exemple (au clic)
```javascript
// ✓ Recommandé
const PI = 3.14
let compteur = 0

// ⚠ Ancien style
var x = 10
```

#### ✅ Logs normaux affichés après
```
› Test 3 : Mauvaise pratique
› 30
```

### Critères de validation
- [ ] Le warning apparaît AVANT les résultats d'exécution
- [ ] Le style du warning est différent (fond orange clair)
- [ ] L'icône ⚠️ ou triangle d'avertissement est visible
- [ ] Le code s'exécute quand même (pas bloquant)
- [ ] Les logs normaux s'affichent après le warning

---

## 🧪 Test 4 : Formatage avancé (Objets, Tableaux, Fonctions)

### Objectif
Valider le formatage intelligent des types complexes.

### Code à tester
```javascript
console.log('Test 4 : Formatage avancé')

// Objet simple
const user = { nom: 'Alice', age: 25, ville: 'Paris' }
console.log('Objet:', user)

// Tableau
const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('Tableau:', nombres)

// Fonction
function saluer(nom) {
  return `Bonjour ${nom}!`
}
console.log('Fonction:', saluer)

// Contexte persistant : utiliser la variable user
console.log('Nom:', user.nom)
```

### Résultat attendu

#### ✅ Formatage des logs
```
› Test 4 : Formatage avancé

› Objet: { nom: Alice, age: 25, ville: Paris }

› Tableau: [1, 2, 3, ... +7 items]

› Fonction: [Function: saluer]

› Nom: Alice
```

### Critères de validation
- [ ] L'objet est formaté sur une ligne avec `{ key: value, ... }`
- [ ] Le tableau long est tronqué avec "... +N items"
- [ ] La fonction s'affiche comme `[Function: nom]`
- [ ] Le contexte persistant fonctionne (user accessible dans le 2ème appel)
- [ ] Tous les logs sont clairement séparés visuellement
- [ ] La coloration par type (log normal) est appliquée

---

## 🧪 Test Bonus : Exécution multiple avec contexte persistant

### Objectif
Valider que les variables déclarées persistent entre les exécutions.

### Procédure
1. **Première exécution :**
```javascript
let compteur = 0
console.log('Compteur initial:', compteur)
```

**Résultat attendu :**
```
› Compteur initial: 0
```

2. **Deuxième exécution (sans réinitialiser) :**
```javascript
compteur++
console.log('Compteur incrémenté:', compteur)
```

**Résultat attendu :**
```
› Compteur incrémenté: 1
```

3. **Troisième exécution :**
```javascript
compteur = compteur + 5
console.log('Compteur après ajout:', compteur)
```

**Résultat attendu :**
```
› Compteur après ajout: 6
```

4. **Cliquer sur "Effacer Console" et réexécuter :**
```javascript
console.log('Compteur après reset:', compteur)
```

**Résultat attendu :**
```
❌ Variable 'compteur' non déclarée
(Message pédagogique complet)
```

### Critères de validation
- [ ] Les variables persistent entre les exécutions
- [ ] Les valeurs sont correctement mises à jour
- [ ] Le bouton "Effacer Console" réinitialise le contexte
- [ ] Après reset, les variables ne sont plus accessibles
- [ ] Le message pédagogique s'affiche après le reset

---

## 📋 Checklist globale de validation

### Design et UX
- [ ] Les messages pédagogiques sont visuellement distincts (bordure colorée à gauche)
- [ ] Les couleurs sont adaptées au dark mode
- [ ] Les exemples sont dépliables/repliables
- [ ] Les icônes sont cohérentes (💡 pour conseils, ℹ️ pour info, etc.)
- [ ] La police monospace est utilisée pour le code
- [ ] Le scrollbar personnalisé fonctionne

### Fonctionnalités
- [ ] Mode strict activé (détecte les variables non déclarées)
- [ ] Warnings détectés avant exécution
- [ ] Erreurs formatées avec messages pédagogiques
- [ ] Contexte persistant entre exécutions
- [ ] Bouton "Effacer Console" réinitialise tout
- [ ] Bouton "Tout Effacer" vide l'éditeur ET la console
- [ ] Raccourci clavier Ctrl+Entrée / Cmd+Entrée fonctionne

### Messages pédagogiques
- [ ] Titre clair et explicite
- [ ] Explication compréhensible pour débutants
- [ ] Conseil actionnable
- [ ] Exemple de code correct
- [ ] Lien "En savoir plus" présent
- [ ] Détails techniques masqués par défaut

### Performance
- [ ] Pas de ralentissement avec beaucoup de logs
- [ ] Pas d'erreur console du navigateur
- [ ] Build statique fonctionne
- [ ] Compatible mobile (responsive)

---

## 🎯 Résultats attendus finaux

Après avoir exécuté les 4 tests principaux, vous devriez constater :

1. ✅ **Messages pédagogiques clairs** adaptés aux débutants
2. ✅ **Warnings non bloquants** pour les mauvaises pratiques
3. ✅ **Formatage intelligent** des types complexes
4. ✅ **Contexte persistant** entre exécutions
5. ✅ **Design professionnel** et cohérent
6. ✅ **Mode strict** fonctionnel
7. ✅ **Exemples interactifs** dépliables
8. ✅ **Expérience utilisateur** fluide et intuitive

---

## 📝 Notes pour les tests

- Testez dans **Chrome, Firefox et Safari** si possible
- Testez en **mode clair ET dark**
- Testez sur **mobile** (responsive)
- Vérifiez la **console du navigateur** (F12) pour détecter d'éventuelles erreurs JavaScript
- Prenez des **captures d'écran** pour documenter les résultats

---

## 🐛 Problèmes connus à surveiller

- La variable `startTime` doit être accessible dans try et catch ✅ (corrigé)
- Les erreurs doivent montrer le message pédagogique, pas juste le message brut
- Les warnings doivent apparaître AVANT les logs
- Le contexte doit persister même après une erreur
- Les exemples dépliables ne doivent pas casser la mise en page

---

**Bonne validation ! 🚀**

Si un test échoue, notez le numéro du test et la description du problème pour faciliter le débogage.
