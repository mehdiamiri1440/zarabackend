import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { user } from "../../Common/Metadata/userMetadata";

export class UserManager extends BaseRepository<user> {
  constructor() {
    super("user");
  }

  login(username: string, callback: (error: any, result: any) => void) {
    this.find({ username: username }, callback);
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
        result.password = password;
        this.update(result, callback);
      }
    });
  }
}
Object.seal(UserManager);
