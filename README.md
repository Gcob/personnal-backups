# Backup Script

Ce projet fournit un système de sauvegarde automatique en utilisant Node.js et cron. 
Il permet de créer des sauvegardes régulières, compressées et gérées de manière efficace.

## Installation

1. **Cloner le dépôt :**

```bash
git clone <url-du-repository>
cd <nom-du-dossier>
```

2. **Installer les dépendances :**

```bash
npm i
```

3. **Configurer les paramètres :**

Copiez le fichier `config.example.js` en `config.js` :

```bash
cp config.example.js config.js
```

Modifiez `config.js` pour spécifier les répertoires à sauvegarder, le répertoire de destination des sauvegardes, 
la fréquence des sauvegardes et la période de rétention des sauvegardes.

4. **Configurer la tâche cron :**

Pour enregistrer la tâche cron, utilisez la commande suivante :

```bash
npm run manageCron register
```

Pour supprimer la tâche cron, utilisez :

```bash
npm run manageCron remove
```

## Fonctionnement

- Les sauvegardes sont compressées en utilisant `archiver` et stockées dans le répertoire `./backups`.
- Les sauvegardes anciennes sont supprimées en fonction des périodes de rétention définies dans le fichier `config.js`.

## Mettre en Pause

Pour mettre en pause les sauvegardes, vous pouvez supprimer la tâche cron avec :

```bash
npm run manageCron remove
```

Pour reprendre les sauvegardes, réenregistrez la tâche cron :

```bash
npm run manageCron register
```

## Retirer le Projet

Pour retirer le projet, supprimez simplement le répertoire du projet. 
Assurez-vous également de supprimer la tâche cron si elle est encore active :

```bash
npm run manageCron remove
```