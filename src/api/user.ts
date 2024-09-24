import axios from "axios";
import { User, UserOnlyRequired } from "@/types";

//todo: firebase user 생성 시 user 테이블에 email, firebase uid 저장하도록
export const signin = async (params: UserOnlyRequired): Promise<User> => {
  try {
    const response = await axios.post("/api/users/signin", params);
    return response.data;
  } catch (error) {
    console.error("Error fetching signin:", error);
    throw new Error("로그인 중 오류가 발생했습니다.");
  }
};
