import { atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

//Next.js에서 persistAtom을 쓰기 위한 구성
const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false,
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "sessionUser",
  storage: sessionStorage,
});

export const persistAtomEffect = param => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

export const userInfoState = atom({
  key: "UserInfo", // unique ID (with respect to other atoms/selectors)
  default: {
    id: "",
    email: "",
  }, // default value (aka initial value)
  effects_UNSTABLE: [persistAtomEffect],
});
