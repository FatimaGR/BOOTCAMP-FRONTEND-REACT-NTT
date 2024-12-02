import { UserResponse } from "@/domain/interfaces";
import { UserDispatch } from "@/domain/user-store";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage/useLocalStorage";
import { createContext, FC, PropsWithChildren, useContext, useReducer } from "react";
import { initialUser, userReducer } from "./user-reducer";

const UserContext = createContext<UserResponse | null>(null);
const UserDispatchContext = createContext<UserDispatch | undefined>(undefined);

const UserProvider: FC<PropsWithChildren> = ({children}) => {
  const { storedValue: localStorageUser } = useLocalStorage<typeof initialUser>("User", initialUser);
  const [user, dispatch] = useReducer(userReducer, localStorageUser || initialUser);

  return(
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
};

const useUser = () =>{
  const context = useContext(UserContext);
  if(!context){
    throw new Error("useUser must be in UserContext");
  }
  return context;
};

const useUserDispatch = () =>{
  const context = useContext(UserDispatchContext);
  if(!context){
    throw new Error("useUser must be in UserDispatchContext");
  }
  return context;
};

export { UserProvider, UserContext, UserDispatchContext, useUser, useUserDispatch };