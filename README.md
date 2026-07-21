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

## Déploiement (Hostinger, sous-domaine de kawwwa.fr)

L'application est 100 % statique : aucun serveur Node.js n'est requis en
production. TOHIJRI est déployé en tant que sous-domaine du site vitrine
existant : `tohijri.kawwwa.fr`.

Le déploiement est automatisé via GitHub Actions
([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) : à chaque
push sur `main`, le site est construit (lint + tests + build) puis envoyé
par FTP dans le dossier du sous-domaine sur Hostinger.

### 1. Créer le sous-domaine dans hPanel

hPanel → **Domaines → Sous-domaines** → créer `tohijri` pour `kawwwa.fr`.
Hostinger crée alors un dossier dédié (généralement
`public_html/tohijri/`, mais cela peut varier selon la configuration du
compte — à vérifier dans le Gestionnaire de fichiers après création).

### 2. Secrets GitHub requis

(Settings → Secrets and variables → Actions, saisis directement dans
GitHub, jamais transmis ailleurs) :

| Secret | Valeur |
|---|---|
| `FTP_SERVER` | Hôte FTP Hostinger du compte (ex. `ftp.kawwwa.fr` ou l'IP donnée par hPanel) |
| `FTP_USERNAME` | Identifiant du compte FTP Hostinger |
| `FTP_PASSWORD` | Mot de passe du compte FTP Hostinger |

Ces valeurs se trouvent dans hPanel → **Fichiers → Comptes FTP**. Le champ
`server-dir` dans `deploy.yml` doit correspondre au dossier réel du
sous-domaine (`public_html/tohijri/` par défaut — à ajuster si différent).

### Déploiement manuel (sans GitHub)

1. `npm run build` génère le dossier `dist/` (`index.html` + `assets/` +
   `favicon.svg`).
2. Transférer **le contenu** de `dist/` (pas le dossier lui-même) dans le
   dossier du sous-domaine (ex. `public_html/tohijri/`) sur Hostinger.

La balise `<link rel="canonical">` et les balises Open Graph dans
`index.html` pointent vers `https://tohijri.kawwwa.fr/`.
