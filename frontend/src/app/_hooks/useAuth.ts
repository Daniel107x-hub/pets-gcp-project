import { useEffect, useState } from "react";
import { getCurrentUser } from "../actions/auth";
import { redirect } from "next/navigation";
import { User } from "../_types/User";

const useAuth = () => {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMe = async () => {
      const user = await getCurrentUser();
      if(!user) redirect("/");
      setUser(user);
      setLoading(false);
    }
    getMe();
  },[]);

  return {user, loading}
};

export default useAuth;