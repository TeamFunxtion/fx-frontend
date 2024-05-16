import { userInfoState } from "@/store/atoms";
import api from "@/utils/api";
import { useRecoilState } from "recoil";

export default function useUserInfo() {
  const [user, setUser] = useRecoilState(userInfoState);

  const getUserDetail = async () => {
    const result = await api.get(`/members/${user.id}`);
    // console.log(result);
    const {
      data: { resultCode, data },
    } = result;
    if (resultCode === "200") {
      setUser(data);
    }
  };

  return {
    user,
    setUser,
    getUserDetail,
  };
}
