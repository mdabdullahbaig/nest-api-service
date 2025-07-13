export class Product {
  //   /**
  //    * Product properties
  //    * @property id - Unique identifier for the product
  //    * @property title - Name of the product
  //    * @property description - Description of the product
  //    * @property price - Price of the product
  //    */
  //   id: number;
  //   title: string;
  //   description: string;
  //   price: number;

  //   /**
  //    * Creates a new Product instance with the given properties.
  //    * @param id - Unique identifier for the product
  //    * @param title - Name of the product
  //    * @param description - Description of the product
  //    * @param price - Price of the product
  //    */
  //   constructor(id: number, title: string, description: string, price: number) {
  //     this.id = id;
  //     this.title = title;
  //     this.description = description;
  //     this.price = price;
  //   }

  /**
   * Creates a new Product instance with the given properties.
   * @param id - Unique identifier for the product
   * @param title - Name of the product
   * @param description - Description of the product
   * @param price - Price of the product
   */
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
