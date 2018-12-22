import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { country } from "../../Common/Metadata/countryMetadata";

export class CountryManager extends BaseRepository<country> {
  constructor() {
    super("country");
  }

  get(callback: (error: any, result: any) => void) {
    this.find({}, callback);
  }
}
Object.seal(CountryManager);
