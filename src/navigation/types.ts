import { ROUTES } from '../constants/routes';

export type SearchStackParamList = {
  [ROUTES.SEARCH_RESULTS]: undefined;
  [ROUTES.ROOM_DETAILS]: {
    roomId: string;
  };
  [ROUTES.CHECKOUT]: {
    roomId: string;
  };
  [ROUTES.PAYMENT_SUCCESS]: {
    roomId: string;
    paymentMethod: string;
  };
};
