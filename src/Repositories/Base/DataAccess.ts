var MongoClient = require("mongodb").MongoClient;
const chalk = require("chalk");

class DataAccess {
  static ModelInstance: any;

  constructor() {}

  static async connect() {
    if (DataAccess.ModelInstance) return DataAccess.ModelInstance;
    MongoClient.connect(
      process.env.DB_URL,
      { useNewUrlParser: true },
      function(err, client) {
        //db.collection("tickets", function(err, collection) {});
        DataAccess.ModelInstance = client.db(process.env.DB_NAME);
      }
    );
  }
  static async test() {
    console.log(chalk.cyan("DB Connection Starting..."));
    await DataAccess.connect();
    console.log(chalk.bold.green("Connect to DB Successfully!"));
  }
}

export = DataAccess;
