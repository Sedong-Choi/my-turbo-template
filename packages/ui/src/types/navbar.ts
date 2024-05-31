
export interface LinkItem {
    text: string;
    href: string;
}
export interface UserInfo {
    email: string;
    name: string;
}

export interface ProfileMenuItem extends LinkItem{
    class? : string[];
}

export interface CustomNavbarProps {
    userInfo?: UserInfo;
    navItems: LinkItem[];
    menuItems: LinkItem[];
    isLoggedIn?: boolean;
    position?: "static" | "fixed";
    maxWidth?: "sm"| "md"| "lg"| "xl"| "2xl"| "full";
    isBlurred?: boolean;
    // TODO remove this after auth logic is implemented
    setIsLoggedIn? : (isLoggedIn: boolean) => void;
}