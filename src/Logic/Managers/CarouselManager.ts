import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { carousel } from "../../Common/Metadata/carouselMetaData";

export class CarouselManager extends BaseRepository<carousel> {
  constructor() {
    super("carousel");
  }
}
Object.seal(CarouselManager);
