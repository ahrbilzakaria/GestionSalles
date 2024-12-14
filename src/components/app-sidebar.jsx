import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { GraduationCap, LogOut } from "lucide-react";

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
import { Button } from "@/app/components/ui/button";

const data = {
  RespoSalles: [
    {
      title: "Management",
      items: [
        { title: "Overview", url: "/dashboard/home" },
        { title: "Manage Rooms", url: "/dashboard/manage-rooms" },
      ],
    },
    {
      title: "User",
      items: [{ title: "Notifications", url: "/dashboard/notifications" }],
    },
  ],
  Coordinateur: [
    {
      title: "Management",
      items: [
        { title: "Overview", url: "/dashboard/home" },
        { title: "Manage Filieres", url: "/dashboard/manage-filieres" },
        { title: "Manage Matieres", url: "/dashboard/manage-matieres" },
      ],
    },
    {
      title: "User",
      items: [{ title: "Notifications", url: "/dashboard/notifications" }],
    },
  ],
  Professeur: [
    {
      title: "Management",
      items: [{ title: "Overview", url: "/dashboard/home" }],
    },
    {
      title: "Operations",
      items: [
        {
          title: "Reservation Requests",
          url: "/dashboard/reservation_requests",
        },
      ],
    },
    {
      title: "User",
      items: [{ title: "Notifications", url: "/dashboard/notifications" }],
    },
  ],
};

export async function AppSidebar() {
  // Await the cookies API to read the cookie value
  const cookieStore = cookies();
  const token = await cookieStore.get("userToken");

  // Redirect to login if no token exists
  if (!token) {
    redirect("/login");
  }

  let user;
  try {
    user = JSON.parse(token.value); // Parse user data
  } catch {
    redirect("/login"); // Redirect if token parsing fails
  }

  const roleData = data[user?.role];
  if (!roleData) {
    redirect("/login"); // Redirect if role is invalid
  }

  const isActive = (currentPath, url) => currentPath === url;

  return (
    <Sidebar>
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
                  <span>v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {roleData.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive(
                            window.location.pathname,
                            subItem.url
                          )}
                          className={
                            isActive(window.location.pathname, subItem.url)
                              ? "bg-secondary"
                              : ""
                          }
                        >
                          <a href={subItem.url}>{subItem.title}</a>
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
            redirect("/");
          }}
        >
          <LogOut /> Sign out
        </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
