export interface Hotel {
  id: string;
  name: string;
  reviewScore: number;
  checkOutDate: Date;
  checkInDate: Date;
  currency: string;
  reviewCount: number;
  strikeThroughPrice: {
    value: number;
  };
  grossPrice: {
    value: number;
  };
}
