
export interface LinkItem {
    text: string;
    href: string;
}
export interface UserInfo {
    email: string;
    name: string;
    id?: number;
    image?: string;
}

export interface ProfileMenuItem extends LinkItem {
    class?: string[];
}

export interface CustomNavbarProps {
    userInfo?: UserInfo;
    navItems: LinkItem[];
    menuItems: LinkItem[];
    isLoggedIn?: boolean;
    position?: "static" | "fixed";
    maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    isBlurred?: boolean;
    signOut?: () => void;
}