import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isCallModalOpen: boolean;
  openCallModal: () => void;
  closeCallModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const openCallModal = () => setIsCallModalOpen(true);
  const closeCallModal = () => setIsCallModalOpen(false);

  return (
    <ModalContext.Provider value={{ isCallModalOpen, openCallModal, closeCallModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};