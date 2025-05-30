import { Photo } from '../../domain/entities/Photo';
import { Container } from '../../infra/container/Container';

export default class PhotoService {
  private container = Container.getInstance();

  async getPhotos(): Promise<Photo[]> {
    return await this.container.photosUseCase.execute();
  }
}
