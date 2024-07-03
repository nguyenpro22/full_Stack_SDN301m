'use client';

import { useState } from 'react';

const useModal = (value?: boolean) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => (value ? value : false));

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  return { isOpen, handleClose, handleOpen, setIsOpen };
};

export default useModal;
