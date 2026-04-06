const MigrationManager = require('./MigrationManager');

async function runMigrate() {
    console.log('Running migrations...');
    const manager = new MigrationManager();
    try {
        await manager.migrate();
        console.log('Migrations complete.');
    } catch (err) {
        console.error('Migration failed:', err);
    }
}

if (require.main === module) {
    runMigrate();
}

module.exports = runMigrate;
