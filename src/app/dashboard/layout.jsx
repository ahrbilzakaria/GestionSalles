"use client";
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import withAuth from "./withauth";

// Import the FiliereProvider
// Ensure correct path

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">
        {/* Wrap everything inside FiliereProvider */}
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="">
            <header className="flex w-full  h-16 shrink-0 items-center gap-2 bg-white border-b fixed">
              <div className="flex items-center gap-2 px-3  ">
                <SidebarTrigger />
              </div>
            </header>
            <div className="mt-16">{children}</div>
            {/* Child pages can now access the FiliereContext */}
          </SidebarInset>
        </SidebarProvider>
        <Toaster /> {/* Toast notifications will also be available */}
      </body>
    </html>
  );
}

export default withAuth(RootLayout);
