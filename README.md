# TOHIJRI

Convertisseur de date grégorienne en date hégirienne (calendrier civil tabulaire), 100 % côté client.

## Stack

React, Vite, TypeScript (mode strict), Vitest.

## Scripts

```bash
npm run dev       # serveur de développement
npm run lint      # ESLint
npm run test      # Vitest (watch)
npm run test:run  # Vitest (une passe)
npm run build     # build de production dans dist/
npm run preview   # prévisualiser le build
```

## Déploiement (Hostinger)

L'application est 100 % statique : aucun serveur Node.js n'est requis en
production. Le déploiement est automatisé via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) : à chaque
push sur `main`, le site est construit (lint + tests + build) puis envoyé
par FTP dans `public_html/` sur Hostinger.

Secrets GitHub requis (Settings → Secrets and variables → Actions) :

| Secret | Valeur |
|---|---|
| `FTP_SERVER` | Hôte FTP Hostinger (ex. `ftp.tohijri.fr` ou l'IP donnée par hPanel) |
| `FTP_USERNAME` | Identifiant du compte FTP Hostinger |
| `FTP_PASSWORD` | Mot de passe du compte FTP Hostinger |

Ces valeurs se trouvent dans hPanel → **Fichiers → Comptes FTP**.

### Déploiement manuel (sans GitHub)

1. `npm run build` génère le dossier `dist/` (`index.html` + `assets/` +
   `favicon.svg`).
2. Transférer **le contenu** de `dist/` (pas le dossier lui-même) dans
   `public_html/` sur l'hébergement Hostinger.

La balise `<link rel="canonical">` et les balises Open Graph dans
`index.html` pointent vers `https://tohijri.fr/` ; à adapter si le nom de
domaine final diffère.
