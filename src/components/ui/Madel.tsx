import type { ModalProps } from '@/types';
import { motion } from 'framer-motion';


const Modal = ({ children, onClose, className = "" }: ModalProps) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
        className={`bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;