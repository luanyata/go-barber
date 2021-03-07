export interface Provider {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface RouteParams {
  providerId: string;
}

export interface AvailabilityItem {
  hour: number;
  available: boolean;
}
