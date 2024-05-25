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
  SelectPhaseFirstGame: { profileGender: string };
  SelectPhaseSecondGame: { profileGender: string };
  SelectPhaseThirdGame: { profileGender: string };
  FirstGame: { gameId: number };
  SecondGame: undefined;
  ThirdGame: undefined;
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
