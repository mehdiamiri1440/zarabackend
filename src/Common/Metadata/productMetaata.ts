export class product {
  public _id: string = "";
  public name: string = "";
  public image: Array<string> = [];
  public decription: string = "";
  public color: Array<string> = [];
  public size: Array<string> = [];
  public price: string = "";
  public categoryCode: string = "";
}

export class shoppingCartProduct extends product {
  public count: number = 0;
}
