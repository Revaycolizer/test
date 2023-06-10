// import { useUser } from "@/app/(main)/middleware";
import { Spinner } from "@chakra-ui/react";
import { redirect, usePathname } from "next/navigation";


import { useUser } from "./middleware";
import { supabase } from "@/app/libs/supabase";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
  const NewComponent = async() => {
    const { user, isLoading } = useUser();

    // console.log(user)

    // if (isLoading) return <Spinner />;
    const {data} = await supabase.auth.getSession();
    if (!data?.session?.user) redirect("/");
    // if (!user) redirect("/");

    return <Component />;
  };

  return NewComponent;
};