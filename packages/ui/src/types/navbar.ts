
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