const MigrationManager = require('./MigrationManager');

async function checkStatus() {
    console.log('Checking migration status...');
    const manager = new MigrationManager();
    try {
        await manager.status();
    } catch (err) {
        console.error('Status check failed:', err);
    }
}

if (require.main === module) {
    checkStatus();
}

module.exports = checkStatus;
