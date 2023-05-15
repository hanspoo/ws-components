import crypto from "crypto";

export class PassService {
  hash(plain: string): string {
    return crypto.createHash("sha256").update(plain).digest("base64");
  }
  comparePassword(plain: string, hash: string) {
    return this.hash(plain) === hash;
  }
}
