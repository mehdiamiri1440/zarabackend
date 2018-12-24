import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { user } from "../../Common/Metadata/userMetadata";

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
        console.log(result[0].password, password);
        result[0].password = password;
        this.update(result[0], callback);
      }
    });
  }
}
Object.seal(UserManager);
