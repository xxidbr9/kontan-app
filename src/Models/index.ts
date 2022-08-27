import Realm from "realm";
import BalanceSchema from "./balance.schema";
import TransactionSchema from "./transaction.schema";

const DB_FILE_NAME = 'kontan.realm';

const realmConfig: Realm.Configuration = {
  path: DB_FILE_NAME,
  schema: [
    TransactionSchema.schema,
    BalanceSchema.schema
  ],
}

export default realmConfig