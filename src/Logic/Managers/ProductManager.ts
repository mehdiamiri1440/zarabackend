import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { product } from "../../Common/Metadata/productMetaata";

export class ProductManager extends BaseRepository<product> {
  constructor() {
    super("product");
  }

  getByCategory(
    categoryCode: string,
    callback: (error: any, result: any) => void
  ) {
    this.find({ categoryCode: categoryCode }, callback);
  }
  search(phrase: string, callback: (error: any, result: any) => void) {
    this.find({ name: new RegExp(".*" + phrase + ".*") }, callback);
  }
}
Object.seal(ProductManager);
