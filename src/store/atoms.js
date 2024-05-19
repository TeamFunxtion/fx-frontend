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

// 유저 정보
export const userInfoState = atom({
  key: "UserInfo",
  default: {
    id: "",
    email: "",
    roleId: 0,
    point: 0,
  },
  effects_UNSTABLE: [persistAtomEffect],
});

// 글로벌 모달
export const globalModalState = atom({
  key: "globalModal",
  default: {
    payment: false,
  },
});
