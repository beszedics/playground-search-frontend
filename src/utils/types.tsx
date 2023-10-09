export type PlaygroundType = {
  id: number;
  name: string;
  address: string;
  longitude: number;
  latitude: number;
  openingHours: string;
  equipments: EquipmentType[];
  images?: string[];
  averageRating: number;
  ratings?: RatingType[];
  totalReviews?: number;
};

export type UserType = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
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
