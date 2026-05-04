export type SearchStackParamList = {
  SearchResults: undefined;
  RoomDetails: {
    roomId: string;
  };
  Checkout: {
    roomId: string;
  };
  PaymentSuccess: {
    roomId: string;
    paymentMethod: string;
  };
};
