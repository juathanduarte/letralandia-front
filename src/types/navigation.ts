import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  CreateProfile: undefined;
  SelectProfile: { reload: number };
  Tabs: { screen: keyof RootStackParamList; params?: any };
  Home: { profileId: number };
  ParentArea: { profileId: number };
  Alphabet: { profileGender: string };
  SelectPhaseFirstGame: {
    profileGender: string;
    gameId: number;
    profileId: number;
    returnData?: boolean;
  };
  SelectPhaseSecondGame: {
    profileGender: string;
    gameId: number;
    profileId: number;
    returnData?: boolean;
  };
  SelectPhaseThirdGame: {
    profileGender: string;
    gameId: number;
    profileId: number;
    returnData?: boolean;
  };
  FirstGame: { profileId: number; gameId: number; phaseId: number; profileGender: string };
  SecondGame: { profileId: number; gameId: number; phaseId: number; profileGender: string };
  ThirdGame: { profileId: number; gameId: number; phaseId: number; profileGender: string };
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
