// backend/src/models/News.ts
export class News {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly summary: string,
    public readonly content: string,
    public readonly imageUrl: string,
    public readonly publishedAt: Date,
    public readonly author: string,
    public readonly source: string,
    public readonly badgeBg?: string
  ) {}
}