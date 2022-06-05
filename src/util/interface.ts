export interface User {
  id: number;
  username: string | null;
  address: string | null;
  bio: string | null;
  twitterHandle: string | null;
  instagramHandle: string | null;
  websiteUrl: string | null;
  discordUrl: string | null;
  totalKidnappedCount: number | null;
  totalUrsaKidnappedCount: number | null;
  totalMinoKidnappedCount: number | null;
  totalKidnapCount: number | null;
  totalUrsaKidnapCount: number | null;
  totalMinoKidnapCount: number | null;
  totalHunyClaimed: string | null;
  refineryHunyClaimed: string | null;
  guildId: number | null;
  level: number | null;
}

export interface Guild {
  id: number;
  name: string;
  leaderAddress: string | null;
  commanderAddresses: string[];
  guildLevel: number | null;
  guildCrestId: number | null;
  guildCrest: {
    colour: string | null;
    design: number | null;
  };
  guildSigil: {
    name: string | null;
    colour: string | null;
    design: number | null;
  };
  guildBanner: {
    colour: string | null;
    design: number | null;
  };
  description: string | null;
  maxCapacity: number | null;
  currentSize: number | null;
  crestImageId: number | null;
  crestImageUrl: null;
}
