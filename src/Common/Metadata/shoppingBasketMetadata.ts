import { shoppingCartProduct } from "./productMetaata";
export class shoppingBasket {
  public _id: string = "";
  public productIds: Array<shoppingCartProduct> = [];
  public userId: string = "";
  public trackingCode: string = "";
  public status: string = "";
}
