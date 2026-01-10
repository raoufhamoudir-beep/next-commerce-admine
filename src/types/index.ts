import type { ReactNode } from "react";

export interface DropdownProps {
  icon: ReactNode;
  label: string;
  isOpen: boolean;
  toggle: () => void;
  children: ReactNode;
  isCollapsed: boolean;
  isActive?: boolean;
}


export interface NavItemProps {
  icon?: ReactNode;
  label: string;
  to: string;
  isSubItem?: boolean; // Replaced 'side'
  isHot?: boolean; // Replaced 'hot'
  isCollapsed?: boolean;
  onClick?: () => void;
}

export interface SectionLabelProps {
  label: string;
  isCollapsed: boolean;
}


export interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  name?: string;       // Add ? (Optional)
  link?: string;       // Add ? (Optional)
  isPaid?: boolean;    // Add ? (Optional)
  orders?: number;     // Add ? (Optional)
}

export interface Categories {
  name: string;
  image: string;
  id: string;
}

export interface faqs {
  question: string;
  answer: string;
  id: string;
}

export interface Store {
logo: string;
 storeName: string;
   _id: string;
   faqs: faqs[];
   Categories: Categories[]
}


export interface UserStore {
logo: string;
 storeName: string;
   _id: string
}

export  interface User {
  _id: string;
  name: string;
  email: string;
  Stores: UserStore[];
  isPaid: boolean; // هل دفع الاشتراك؟
  orders: number,
  repoName: string,

}


export interface HeaderProps {
  toggleSidebar: () => void;
  openLanguagePanel: () => void;
  openAccountPanel: () => void;
  isPaid?: boolean;
}

export interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string; // Optional custom class
}


export interface AccountPanelProps {
  user?: User;
  hide: () => void;
}


export interface LanguagePanelProps {
  hide: () => void;
}

export interface LanguageOption {
  code: string;
  label: string;
  native: string;
}