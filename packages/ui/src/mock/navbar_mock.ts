import { LinkItem, ProfileMenuItem } from "@repo/ui/types";

export const userInfo = { name: "Example", email: "example@example.com" };

export const navItems: LinkItem[] = [
    {
        text: "Jobs",
        href: "/incruits",
    },
    {
        text: "Blog",
        href: "/posts",
    },
];

export const profileMenuItems: ProfileMenuItem[] = [
    {
        text: "Profile",
        href: "/profile",
    },
    {
        text: "Settings",
        href: "/settings",
    }
];