import { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  CreateProfile: undefined;
  SelectProfile: undefined;
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
