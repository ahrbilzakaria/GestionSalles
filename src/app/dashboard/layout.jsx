import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b">
              <div className="flex items-center gap-2 px-3">
                <SidebarTrigger />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
              {children}
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>
        <Toaster></Toaster>
      </body>
    </html>
  );
}
