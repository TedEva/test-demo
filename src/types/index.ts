export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  location: string;
  category: string;
}

export interface BookingForm {
  destinationId: string;
  startDate: string;
  endDate: string;
  guests: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}