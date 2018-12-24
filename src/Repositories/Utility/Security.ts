import { hash, genSaltSync, compareSync } from "bcryptjs";
const salt = genSaltSync(10);
export class Security {
  generatePassword() {
    let password = "",
      possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 8; i++)
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    return password;
  }
  hashText(text: string) {
    return new Promise((resolve, reject) => {
      hash(text, salt).then(hashedText => {
        resolve(hashedText);
      });
    });
  }
  compareText(text: string, hashedText: string) {
    return compareSync(text, hashedText);
  }
}
