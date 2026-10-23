import { News } from '../models/entities/News.js';

export class NewsMapper {
  static toDomain(raw: any): News {
    return new News(
      raw.id,
      raw.category_id,
      raw.title,
      raw.summary,
      raw.content,
      raw.image_url,
      raw.published_at,
      raw.author,
      raw.source,
      raw.badge_bg
    );
  }

  static toDomainList(rawList: any[]): News[] {
    return rawList.map(item => NewsMapper.toDomain(item));
  }
}