import { googleSpreadsheetService, logger } from '../../services';

import { monoParserService } from './mono-parser.service';
import { Change } from 'firebase-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';
import { MonoTransaction } from './transaction.type';
import { validatorService } from './mono-validator.service';

function processRecord(
  change: Change<DocumentSnapshot>,
): Promise<FirebaseFirestore.WriteResult> {
  return change.after.ref.set({ processed: true }, { merge: true });
}

export async function processMonoHandler(change: Change<DocumentSnapshot>) {
  const record = change.after.data() as MonoTransaction;

  if (validatorService.isProcessed(record)) {
    return null;
  }

  if (validatorService.isPositiveAmount(record)) {
    return processRecord(change);
  }

  try {
    const {
      amount,
      date,
      monthIndex,
      description,
    } = monoParserService.toTransaction(record);

    await googleSpreadsheetService.initSpreadsheetDocument();

    await googleSpreadsheetService.setActiveSpreadsheetByIndex(monthIndex);

    // TODO: validate date
    // TODO: validate negative amount
    logger.log('Saving to g spreadsheet...', {
      date,
      amount,
      monthIndex,
      description,
    });

    await googleSpreadsheetService.addRow({
      [googleSpreadsheetService.headers.date]: date,
      [googleSpreadsheetService.headers.expense]: amount,
      [googleSpreadsheetService.headers.remarks]: description,
    });

    logger.log('Saved');

    return processRecord(change);
  } catch (e) {
    logger.error(e);
  }
}
