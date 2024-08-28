// manageCron.js

import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import util from 'util';

// Promises pour exec
const execPromise = util.promisify(exec);

// Charger la configuration
import config from './config.js';

// Chemin des scripts
const BACKUP_SCRIPT = path.resolve('./backup.js');
const CRON_JOB = `*/${config.backupFrequency} * * * * node ${BACKUP_SCRIPT}`;

// Fonction pour enregistrer ou mettre à jour la tâche cron
const registerCronJob = async () => {
    try {
        // Vérifier les tâches cron existantes
        const { stdout } = await execPromise('crontab -l');
        const currentCrontab = stdout.trim();

        // Enlever les anciennes occurrences de la tâche cron
        const newCrontab = currentCrontab
            .split('\n')
            .filter(line => !line.includes(BACKUP_SCRIPT))
            .concat(CRON_JOB)
            .join('\n');

        fs.writeFileSync('/tmp/crontab.tmp', newCrontab);
        await execPromise('crontab /tmp/crontab.tmp');
        console.log('Tâche cron enregistrée ou mise à jour.');
    } catch (err) {
        console.error('Erreur lors de l\'enregistrement de la tâche cron:', err);
    }
};

// Fonction pour supprimer une tâche cron
const removeCronJob = async () => {
    try {
        // Vérifier les tâches cron existantes
        const { stdout } = await execPromise('crontab -l');
        const currentCrontab = stdout.trim();
        if (currentCrontab.includes(CRON_JOB)) {
            // Supprimer la tâche cron
            const newCrontab = currentCrontab.split('\n').filter(line => line !== CRON_JOB).join('\n');
            fs.writeFileSync('/tmp/crontab.tmp', newCrontab);
            await execPromise('crontab /tmp/crontab.tmp');
            console.log('Tâche cron supprimée.');
        } else {
            console.log('La tâche cron n\'est pas présente.');
        }
    } catch (err) {
        console.error('Erreur lors de la suppression de la tâche cron:', err);
    }
};

// Commande CLI
const command = process.argv[2];
if (command === 'register') {
    registerCronJob();
} else if (command === 'remove') {
    removeCronJob();
} else {
    console.error('Usage: node manageCron.js [register|remove]');
}
