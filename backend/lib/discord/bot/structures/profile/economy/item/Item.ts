// Implement more item types than role
// Make a type called ItemType
// Make the generic type T an ItemType (DO NOT DO "T extends ItemType")

import { IItem } from "./IItem";

// Make an interface for the constructor
export class Item<T = ItemType> {
  public type: T;
  public id: string;
  public price: number;

  public constructor(data: IItem<T>) {
    this.type = data.type;
    this.id = data.id;
    this.price = data.price;
  }
}
