const MigrationManager = require('./MigrationManager');

async function runRollback() {
    console.log('Rolling back migrations...');
    const manager = new MigrationManager();
    try {
        await manager.rollback();
        console.log('Rollback complete.');
    } catch (err) {
        console.error('Rollback failed:', err);
    }
}

if (require.main === module) {
    runRollback();
}

module.exports = runRollback;
