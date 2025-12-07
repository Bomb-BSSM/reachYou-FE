import React, { createContext, useContext, useState } from 'react';
import Alert from '@/components/alert';

interface AlertContextType {
  showAlert: (title: string, content?: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState<string | undefined>(undefined);

  const showAlert = (title: string, content?: string) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const hideAlert = () => {
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {isOpen && <Alert title={title} content={content} onClose={hideAlert} />}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be within AlertProvider');
  }
  return context;
};
