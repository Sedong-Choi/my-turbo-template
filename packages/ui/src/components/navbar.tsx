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

import { ThemeSwitch } from "./theme-switch";
import { CustomNavbarProps, ProfileMenuItem } from "../types";

const CustomNavbar = ({
  userInfo,
  navItems,
  menuItems,
  // isLoggedIn,
  // setIsLoggedIn,
  ...props
}: CustomNavbarProps) => {
  const ref = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);

  // login 상태에따른 isLoggin 건내주는 로직 만들기
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} ref={ref} {...props}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold hidden md:flex text-inherit">
            {process.env.APP_NAME ?? "My App"}
          </p>
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
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
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
            <DropdownMenu aria-label="Profile Actions" color="secondary">
              <DropdownItem textValue={`${userInfo?.name} ${userInfo?.email}`}>
                <p>{userInfo?.name}</p>
                <p>{userInfo?.email}</p>
              </DropdownItem>
              {menuItems?.map((item: ProfileMenuItem) => (
                <DropdownItem
                  key={item.text}
                  as={Link}
                  href={item.href}
                  className={item?.class?.join(" ")}
                >
                  {item.text}
                </DropdownItem>
              ))}
              <DropdownItem
                  key="logout"
                  as={Link}
                  href="/logout"
                  className="danger"
                >
                  Log Out
                </DropdownItem>
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
    </Navbar>
  );
};
export default CustomNavbar;
