import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { saveMonoHandler } from './features/mono/save-mono.handler';
import { healthCheckHandler } from './features/health-check/health-check.handler';
import { processMonoHandler } from './features/mono/process-mono.handler';

admin.initializeApp();

const db = admin.firestore();

export const mono = functions.https.onRequest((req, res) =>
  saveMonoHandler(req, res, db),
);
export const healthCheck = functions.https.onRequest(healthCheckHandler);

export const processTransaction = functions.firestore
  .document('transactions/{id}')
  .onWrite(processMonoHandler);
