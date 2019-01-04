import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { product } from "../../Common/Metadata/productMetaata";

export class ProductManager extends BaseRepository<product> {
  constructor() {
    super("product");
  }

  getByCategory(
    categoryName: string,
    callback: (error: any, result: any) => void
  ) {
    this.find({ categoryName: categoryName }, callback);
  }
  search(phrase: string, callback: (error: any, result: any) => void) {
    this.find({ name: new RegExp(".*" + phrase + ".*") }, callback);
  }
  getIsNew(callback: (error: any, result: any) => void) {
    this.find({ isNew: true }, callback);
  }
}
Object.seal(ProductManager);
