import { UserContext, UserDispatchContext } from "@/context/user/user-context";
import { UserResponse } from "@/domain/interfaces";
import { UserDispatch } from "@/domain/user-store";
import { render } from "@testing-library/react";
import { ReactElement } from "react";

interface CustomUserRenderOptions {
  user: UserResponse,
  dispatch: UserDispatch,
};

export const customUserRender = (
  component: ReactElement, 
  {user, dispatch}: CustomUserRenderOptions
) => {
  return render(
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {component}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
};
