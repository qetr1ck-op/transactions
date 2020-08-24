import { MonoTransaction } from './transaction.type';

type Validator = (transaction: MonoTransaction) => boolean;

class ValidatorService {
  isPositiveAmount: Validator = (transaction) => {
    return transaction.amount > 0;
  };

  isProcessed: Validator = (transaction) => {
    return transaction.processed;
  };
}

export const validatorService = new ValidatorService();
