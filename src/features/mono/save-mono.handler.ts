import { Request, Response } from 'express';
import { logger } from '../../services';

import { firestore } from 'firebase-admin';

export async function saveMonoHandler(
  req: Request,
  res: Response,
  db: firestore.Firestore,
) {
  const item = req.body.data.statementItem;

  // TODO: validation
  logger.log('Mono record', item);

  try {
    await db.collection('transactions').doc(item.id).set(item, { merge: true });

    res.send('Ok');
  } catch (e) {
    logger.error(e);

    res.send(400);
  }
}
