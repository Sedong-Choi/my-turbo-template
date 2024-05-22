"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarProps,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
interface NavItem {
  text: string;
  href: string;
}
interface MenuItems extends NavItem{
  class: string[];
  data?: UserInfo;
  type? : "profile" | undefined
}
interface UserInfo {
  email: string;
  name: string;
}
export default function CustomNavbar(args:NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false);

  const [userInfo, setUserInfo] = useState<UserInfo | undefined>({
    email: "test@test.com",
    name: "sedong",
  });

  // TODO nav data api로 받아 올 수 있도록 변경
  const navItems: NavItem[] = [
    {
      text: "구인구직",
      href: "/incruits",
    },
    {
      text: "자유게시판",
      href: "/posts",
    },
  ];
  const menuItems: MenuItems[] = [
    {
      text:"Simple Profile",
      href :"#",
      class:[],
      data:{
        email:userInfo?.email ?? "",
        name :userInfo?.name ??"",
      },
      type:"profile"
    },
    {
      text: "프로필",
      href: "/profiles",
      class:[]
    },
    {
      text: "작성글 목록",
      href: "/dashboard",
      class:[]
    },
    {
      text: "로그아웃",
      href: "/logout",
      class:["danger"]
    },
  ];
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} {...args}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold hidden md:flex text-inherit">움직</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.text}>
            <Link href={item.href}>{item.text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      {isLoggedIn ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" color="secondary" items={menuItems}>
              {(item)=>(
                item?.type ==='profile' ?
                <DropdownItem key={item.data?.email}>
                  <>
                    <p className="font-semibold">
                      {item.data?.email}
                    </p>
                    <p className="font-semibold">
                      {item.data?.name}
                    </p>
                  </>
                </DropdownItem>
                :<DropdownItem key={item.text} as={Link} href={item.href} className={item?.class.join(" ")}>
                {item.text}
              </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem>
            {/* TODO  */}
            <Link
              // href="/login"
              onClick={() => setIsLoggedIn(true)}
            >
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/sign-up" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href={item.href}
              size="lg"
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

// // TODO to utils
// function capitalize(word: string) {
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }
