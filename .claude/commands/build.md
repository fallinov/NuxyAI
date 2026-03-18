---
description: Génère le build statique du projet Nuxy
---

Lance la génération du site statique Nuxt pour déploiement.

Exécute la commande :
```bash
npm run generate
```

Analyse le résultat du build et :
- Vérifie qu'il n'y a pas d'erreurs critiques
- Signale les warnings importants (ignorer les warnings de fonts)
- Indique la taille des chunks JavaScript
- Confirme que le build est prêt pour déploiement dans `.output/public`
