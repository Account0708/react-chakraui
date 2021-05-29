import axios from "axios";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import { useMassage } from "./useMassage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMassage } = useMassage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);

  const login = useCallback(
    (id: string) => {
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdomin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdomin });
            showMassage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMassage({ title: "ユーザーが見つかりません", status: "error" });
            setLoading(false);
          }
        })
        .catch(() => {
          showMassage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history, showMassage, setLoginUser]
  );
  return { login, loading };
};
