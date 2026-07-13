export interface User {
  id: string;
  email: string;
  name: string;
  username: string;
  profileImageUrl: string | null;
  role: "user" | "business";
  bio: string | null;
  address: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  numOfDealPosted?: number;
  offerClicks?: number;
  usernameChangeLockedUntil: string;
}

export interface UpdateUserData {
  name?: string;
  profileImageUrl?: string;
  bio?: string;
  address?: string;
  website?: string;
};

export interface UsernameCheckResult {
  available: boolean;
  suggestion: string | null;
}



