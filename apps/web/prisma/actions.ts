"use server";

import prisma from "./prisma";
import { LinkItem } from "@repo/ui/types";

export const getNavItems = async (): Promise<LinkItem[]> => {
    try {
        const navItems = await prisma.env.findFirst({
            where: {
                key: "navItems"
            },
            select:{
                value:true
            }
        });
        return JSON.parse(navItems?.value || "[]");
    } catch (e) {
        console.log('error in getNavItems', { e });
        return [];
    }

}

export const getMenuItems = async (): Promise<LinkItem[]> => {
    try {
        const menuItems = await prisma.env.findFirst({
            where: {
                key: "profileMenuItems"
            },
            select:{
                value:true
            }
        });
        return JSON.parse(menuItems?.value || "[]")
    } catch (e) {
        console.log('error in getMenuItems', { e });
        return [];
    }
}