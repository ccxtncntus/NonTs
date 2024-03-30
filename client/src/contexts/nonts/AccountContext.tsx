import { createContext, ReactNode, useState } from 'react';

type accounts = {
  createAt: Date;
  email: string;
  name: string;
  role: string;
  _id: string;
};

export type AccountContextType = {
  account: accounts | null;
  setAccount: (value: accounts | null) => void;
};

export const AccountContext = createContext<AccountContextType>({
  account: null,
  setAccount: () => {},
});

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [account, setAccount] = useState<accounts | null>(null);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};
