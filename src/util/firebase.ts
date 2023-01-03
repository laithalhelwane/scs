import admin, { ServiceAccount } from 'firebase-admin';

import serviceAccount from '../cleaning-service-b75e9-firebase-adminsdk-53gvg-a42ae6271b.json';
// const serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export default admin