import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/Navbar/Navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="flex ">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset />
          <div className="w-full">{children}</div>
        </SidebarProvider>
      </div>
    </div>
  );
}
