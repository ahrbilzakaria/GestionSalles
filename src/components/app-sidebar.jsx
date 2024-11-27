"use client";
import * as React from "react";
import { GalleryVerticalEnd, GraduationCap, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";

// Utility function to get cookies by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop().split(";").shift();
    try {
      return JSON.parse(cookieValue); // Parse the cookie value as JSON
    } catch (e) {
      return null; // In case the cookie is not a valid JSON
    }
  }
  return null;
};

const data = {
  navMain: [
    {
      title: "Management",
      items: [
        {
          title: "Overview",
          url: "/dashboard/home",
        },
        {
          title: "Manage Filieres",
          url: "/dashboard/manage-filiere",
        },
        {
          title: "Manage Rooms",
          url: "/mr",
        },
      ],
    },
    {
      title: "Operations",
      items: [
        {
          title: "Reservation Requests",
          url: "/rr",
        },
        {
          title: "Schedules",
          url: "/s",
        },
        {
          title: "Room Availability",
          url: "/ra",
        },
        {
          title: "Conflict Resolution",
          url: "/rs",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Reports and Analytics",
          url: "/raa",
        },
      ],
    },
    {
      title: "User",
      items: [
        {
          title: "My Reservations",
          url: "/r",
        },
        {
          title: "Notifications",
          url: "/n",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const router = usePathname();
  const out = useRouter();
  const [user, setUser] = React.useState(null);

  // Check for user token in cookies and update user state
  React.useEffect(() => {
    const userToken = getCookie("userToken"); // Read user token from cookies
    if (userToken) {
      setUser(userToken); // Set user data if token is found
    } else {
      out.push("/login"); // Redirect to login if no user token
    }
  }, [out]);

  const handleRefresh = () => {
    out.push("/"); // Reload the page
  };

  const isActive = (url) => router === url;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">
                    G-SALLES
                    <span className="font-light text-sm text-muted-foreground">
                      {" "}
                      platform
                    </span>
                  </span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(item.url)}
                          className={isActive(item.url) ? "bg-secondary " : ""}
                        >
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button
          onClick={() => {
            document.cookie =
              "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/"; // Remove the cookie
            handleRefresh(); // Redirect to home
          }}
        >
          <LogOut /> Sign out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
