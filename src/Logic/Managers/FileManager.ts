import { BaseRepository } from "../../Repositories/Base/BaseRepository";
import { file } from "../../Common/Metadata/fileMetadata";

export class FileManager extends BaseRepository<file> {
  constructor() {
    super("file");
  }
}
Object.seal(FileManager);
