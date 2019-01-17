import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { user } from "../../Common/Metadata/userMetadata";
import { ObjectId } from "mongodb";

export class UserManager extends BaseRepository<user> {
  constructor() {
    super("user");
  }

  getUserByEmail(email: string, callback: (error: any, result: any) => void) {
    this.find({ email: email }, callback);
  }
  signup(user: user, callback: (error: any, result: any) => void) {
    this.create(user, callback);
  }
  resetPassword(
    email: string,
    password: string,
    callback: (error: any, result: any) => void
  ) {
    this.find({ email: email }, (error, result) => {
      if (error) callback(error, result);
      else {
        result[0].password = password;
        this.update(result[0], callback);
      }
    });
  }
  search(phrase: string, callback: (error: any, result: any) => void) {
    this.find(
      {
        $or: [
          { firstName: new RegExp(".*" + phrase + ".*") },
          { lastName: new RegExp(".*" + phrase + ".*") },
          { username: new RegExp(".*" + phrase + ".*") }
        ]
      },
      callback
    );
  }
  showMe(userId: string, callback: (error: any, result: any) => void) {
    this.find({ _id: ObjectId(userId) }, callback);
  }
}
Object.seal(UserManager);
