import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { shoppingBasket } from "../../Common/Metadata/shoppingBasketMetadata";

export class ShoppingBasketManager extends BaseRepository<shoppingBasket> {
  constructor() {
    super("shoppingBasket");
  }
}
Object.seal(ShoppingBasketManager);
