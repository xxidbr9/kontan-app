import Realm from "realm";

export const TRANSACTION_COLLECTION_NAME = 'transaction';

class TransactionSchema extends Realm.Object {
  static get schema(): Realm.ObjectSchema {
    return {
      name: TRANSACTION_COLLECTION_NAME,
      properties: {
        id: "string",
        description: "string",
        amount: "int",
        type: "string",
        createdAt: "date"
      },
      primaryKey: "id"
    }
  }
}


export default TransactionSchema