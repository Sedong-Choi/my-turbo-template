import { LinkItem, ProfileMenuItem } from "@repo/ui/types";

export const userInfo = { name: "김예시", email: "example@example.com" };

export const navItems: LinkItem[] = [
    {
        text: "구인구직",
        href: "/incruits",
    },
    {
        text: "자유게시판",
        href: "/posts",
    },
];

export const profileMenuItems: ProfileMenuItem[] = [
    {
        text: "내 정보",
        href: "/profile",
    },
    {
        text: "설정",
        href: "/settings",
    }
];