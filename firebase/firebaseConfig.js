const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const admin = require('firebase-admin');
const client = new SecretManagerServiceClient();

async function initializeFirebase() {
    const secretName = 'projects/test-nodejs-303220/secrets/api-keys/versions/latest';
    const [version] = await client.accessSecretVersion({ name: secretName });
    const serviceAccount = JSON.parse(version.payload.data.toString('utf8'));
    serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    const db = admin.firestore();
    console.log("Firebase initialized successfully.");
    return db;
}

let dbInstance;

module.exports.getDb = async function() {
    if (!dbInstance) {
        dbInstance = await initializeFirebase();
    }
    return dbInstance;
}
