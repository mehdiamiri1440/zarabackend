export class product {
  public _id: string = "";
  public name: string = "";
  public images: Array<string> = [];
  public decription: string = "";
  public color: Array<string> = [];
  public size: Array<string> = [];
  public price: string = "";
  public categoryName: string = "";
  public isNew: boolean = false;
  public hashTag: Array<string> = [];
  public registerDate: number = Date.now();
  public isAvailable: boolean = true;
}

export class shoppingCartProduct extends product {
  public count: number = 0;
}
