import { SeasonById } from './SeasonById';

export interface Catalog {
  readonly featured: FeaturedVideo;
  readonly seasons: SeasonById;
}

export interface FeaturedVideo {
  readonly description: string;
  readonly id: string;
  readonly season: SeasonName;
}

export const SeasonName = {
  SEASON_1: 's1',
  SEASON_2: 's2',
  SPECIALS: 'special',
  EXTRAS: 'extra',
} as const;
export type SeasonName = (typeof SeasonName)[keyof typeof SeasonName];

export interface Season {
  readonly episodes: ReadonlyArray<Episode>;
  readonly name: string;
}

export interface Episode {
  readonly id: string;
  readonly title: string;

  readonly description?: string;
  readonly parts?: ReadonlyArray<Part>;
  readonly releaseDate?: string;
}

export interface Part {
  readonly members: string;
  readonly timestamp: string;
}
