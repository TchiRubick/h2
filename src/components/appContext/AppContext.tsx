import { createContext, FC, ReactNode, useContext } from 'react';
import { notification } from 'antd';

type Propscontext = {
  opennotification: (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description: string
  ) => void;
};

type AppProviderProps = {
  children: ReactNode;
};
const AppContext = createContext<Propscontext | null>(null);

export const useNotif = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useNotification doit être utilisé à l'intérieur du fournisseur NotificationProvider"
    );
  }

  return context;
};

export const ModificationProvider: FC<AppProviderProps> = ({ children }) => {
  const [apis, contextHolder] = notification.useNotification();

  const opennotification = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description: string
  ) => {
    apis[type]({
      message,
      description,
    });
  };

  return (
    <AppContext.Provider value={{ opennotification }}>
      {children}
      {contextHolder}
    </AppContext.Provider>
  );
};

export default AppContext;
