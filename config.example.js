// config.example.js

export default {
    sourceDirs: ['./data'], // Répertoires à sauvegarder
    backupDir: './backups', // Répertoire des sauvegardes
    backupFrequency: 5, // Fréquence des sauvegardes en minutes
    retentionPeriods: {
        '5m': 3, // Garder les 3 derniers backups de 5 minutes
        '1h': 3, // Garder les 3 derniers backups horaires
        '1d': 7, // Garder les 7 derniers backups journaliers
        '1m': 12, // Garder les 12 derniers backups mensuels
        '1y': 1   // Garder le backup annuel
    }
};
