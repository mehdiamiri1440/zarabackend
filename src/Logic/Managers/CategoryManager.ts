import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { category } from "../../Common/Metadata/categoryMetadata";

export class CategoryManager extends BaseRepository<category> {
  constructor() {
    super("category");
  }
}
Object.seal(CategoryManager);
