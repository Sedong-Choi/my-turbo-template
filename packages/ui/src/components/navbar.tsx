"use client";

import { useRef, useState } from "react";
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
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import { ThemeSwitch } from "./theme-switch";
import { CustomNavbarProps, ProfileMenuItem } from "../types";
const CustomNavbar = ({
  userInfo,
  navItems,
  menuItems,
  isLoggedIn,
  signOut,
  ...props
}: CustomNavbarProps) => {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} ref={ref} {...props}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link
            aria-label="Home"
            className="flex justify-start items-center gap-2 tap-highlight-transparent transition-opacity active:opacity-50"
            href="/"
          >
            <p className="font-bold hidden md:flex text-inherit">
              {process.env.APP_NAME ?? "My App"}
            </p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarMenu>
        {navItems?.map((item, index) => (
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
            >
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
      <NavbarContent className="hidden sm:flex" justify="center">
        {navItems?.map((item) => (
          <NavbarItem key={item.text}>
            <Link href={item.href}>{item.text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {isLoggedIn ? (
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
            <DropdownMenu aria-label="Profile Actions" color="secondary">
              <DropdownItem textValue={`${userInfo?.name} ${userInfo?.email}`}>
                <p>{userInfo?.name}</p>
                <p>{userInfo?.email}</p>
              </DropdownItem>
              {menuItems?.map((item: ProfileMenuItem) => (
                <DropdownItem
                  key={item.text}
                  as={NextLink}
                  href={item.href}
                  className={item?.class?.join(" ")}
                >
                  {item.text}
                </DropdownItem>
              ))}
              <DropdownItem
                key="logout"
                as="button"
                onClick={()=>signOut()}
                className="danger"
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link
                as={NextLink}
                href="/login"
              >
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={NextLink} color="primary" href="/sign-up" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
export default CustomNavbar;
