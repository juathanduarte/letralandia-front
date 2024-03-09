// import { useQuery, useQueryClient } from '@tanstack/react-query';
// import React, {
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from 'react';

// import { BLABLACAMPUS_ACCESS_TOKEN_KEY, BLABLACAMPUS_REFRESH_TOKEN_KEY } from '../constants/keys';
// import { api } from '../services/api';
// import { me } from '../services/user';
// import { useUserStore } from '../stores/user';
// import { User } from '../types/User';
// import { getAsyncStorage, removeAsyncStorage, setAsyncStorage } from '../utils/AsyncStorage';

// export type AuthContextData = {
//   user?: User;
//   signedIn: boolean;
//   signIn: (accessToken: string, refreshToken: string) => Promise<void>;
//   signOut: () => Promise<void>;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// export const AuthContext = createContext({} as AuthContextData);

// export function AuthProvider({ children }: AuthProviderProps) {
//   const queryClient = useQueryClient();

//   const setUser = useUserStore((state) => state.setUser);

//   const [signedIn, setSignedIn] = useState<boolean>(false);

//   useEffect(() => {
//     async function getStoredData() {
//       const storedAccessToken = await getAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY });
//       setSignedIn(!!storedAccessToken);
//     }
//     getStoredData();
//   }, []);

//   const { data, isSuccess, isFetching } = useQuery({
//     queryKey: ['users', 'me'],
//     queryFn: me,
//     staleTime: Infinity,
//     enabled: signedIn,
//   });

//   useEffect(() => {
//     if (!data) return;
//     setUser(data);
//   }, [data]);

//   const signIn = useCallback(async (accessToken: string, refreshToken: string) => {
//     await setAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY, value: accessToken });
//     await setAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY, value: refreshToken });

//     api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//     setSignedIn(true);
//   }, []);

//   const signOut = useCallback(async () => {
//     await removeAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY });
//     await removeAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY });

//     api.defaults.headers.common.Authorization = undefined;

//     setSignedIn(false);
//     queryClient.removeQueries();
//   }, [queryClient]);

//   const contextValues = useMemo(
//     () => ({
//       user: data,
//       signedIn: isSuccess && signedIn,
//       signIn,
//       signOut,
//     }),

//     [data, isSuccess, signedIn, signIn, signOut]
//   );
//   return (
//     <AuthContext.Provider value={contextValues}>{!isFetching && children}</AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   return useContext(AuthContext);
// }