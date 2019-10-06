export class Albums {
  category: string;
  id: string;

  artist: string;
  images: string;
  name: string;
  link: string;
  price: string;
  releaseDate: string;
  rights: string;
  title: string;
  itemCount: string;
  isFavorite: boolean;

  constructor() {
    this.category = "";
    this.id = "";

    this.artist = "";
    this.images = '';
    this.name = "";
    this.link = "";
    this.price = "";
    this.releaseDate = "";
    this.rights = "";
    this.title = "";
    this.itemCount = "";
  }
}
