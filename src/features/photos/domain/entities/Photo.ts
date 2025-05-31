export interface PhotoSpec {
  height: number;
  width: number;
  url: string;
}

export interface Photo {
  id: string;
  h: PhotoSpec;
  l: PhotoSpec;
  c: PhotoSpec;
}

export class PhotoEntity implements Photo {
  constructor(
    public readonly id: string,
    public readonly h: PhotoSpec,
    public readonly l: PhotoSpec,
    public readonly c: PhotoSpec
  ) {}

  static fromRaw(data: { id: string; h: PhotoSpec; l: PhotoSpec; c: PhotoSpec }): PhotoEntity {
    return new PhotoEntity(data.id, data.h, data.l, data.c);
  }
} 