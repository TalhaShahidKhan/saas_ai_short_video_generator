"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/configs/firebaseConfig";
import { AuthContext } from "@/context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function ThemeProvider({ children, ...props }) {
  const [user, setUser] = React.useState(null);
  const CreateUser = useMutation(api.users.CreateNewUser);
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user)
      if (user){
        const result = await CreateUser({
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        });
        setUser(result)
        console.log(result)
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuthContext must be used within an AuthContext.Provider"
    );
  }
  return context;
};
