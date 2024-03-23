export type PlaygroundType = {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  openingHours: string;
  isPublished: boolean;
  equipments: EquipmentType[];
  images?: string[];
  averageRating: number;
  ratings?: RatingType[];
  totalReviews?: number;
};

export type PlaygroundWrapper = {
  playground: PlaygroundType;
};

export type UserType = {
  id?: string;
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
  password?: string;
  isLoggedIn?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type RatingType = {
  user: UserType;
  comment: string;
  score: number;
  createdAt: string;
  updatedAt: string;
};

export type EquipmentType = {
  equipment: {
    id: number;
    name: string;
    description: string | null;
  };
};
