import Realm from "realm";


export const BALANCE_COLLECTION_NAME = 'balance';
export const KEY_BALANCE_ID = 'balance_key';

class BalanceSchema extends Realm.Object {
  static get schema(): Realm.ObjectSchema {
    return {
      name: BALANCE_COLLECTION_NAME,
      properties: {
        id: "string",
        total: "int",
      },
      primaryKey: "id"
    }
  }
}


export default BalanceSchema