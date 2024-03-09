import { StackScreenProps } from '@react-navigation/stack';
// import { Ride } from './Ride';
// import { User } from './User';
// import { IRideInfo } from '../services/ride/getRideInfo';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  SelectProfile: undefined;
  // RequestRide: { data: Ride };
  // RideInformations: {
  //   data: {
  //     ride: Ride;
  //   };
  // };
  // CreateAssessment: {
  //   data: {
  //     user: User;
  //     ride: IRideInfo;
  //   };
  // };
  // VisitProfile: {
  //   data: {
  //     user: User;
  //   };
  // };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}