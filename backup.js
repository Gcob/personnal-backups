// backup.js

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';
import archiver from 'archiver';

// Promises pour exec
const execPromise = util.promisify(exec);

// Charger la configuration
import config from './config.js';

// Fonction pour créer une archive compressée
const createArchive = (sourceDir, output) => {
    return new Promise((resolve, reject) => {
        const archive = archiver('zip', { zlib: { level: 9 } });
        const outputStream = fs.createWriteStream(output);

        outputStream.on('close', () => resolve());
        archive.on('error', err => reject(err));

        archive.pipe(outputStream);
        archive.directory(sourceDir, false);
        archive.finalize();
    });
};

// Fonction principale pour gérer les sauvegardes
const backup = async () => {
    try {
        const now = new Date();
        const timestamp = now.toISOString().replace(/:/g, '-');
        const backupName = `backup-${timestamp}.zip`;
        const backupPath = path.join(config.backupDir, backupName);

        console.log(`Création de la sauvegarde : ${backupPath}`);

        // Créer une archive compressée
        await createArchive(config.sourceDirs[0], backupPath);

        console.log(`Sauvegarde terminée : ${backupPath}`);

        // Gestion des backups expirés
        const files = fs.readdirSync(config.backupDir);
        files.sort().reverse();
        const expiredFiles = files.slice(config.retentionPeriods['5m'] + 3); // Ajustez selon la fréquence

        for (const file of expiredFiles) {
            fs.unlinkSync(path.join(config.backupDir, file));
            console.log(`Backup expiré supprimé : ${file}`);
        }
    } catch (err) {
        console.error('Erreur lors de la sauvegarde :', err);
    }
};

backup();
