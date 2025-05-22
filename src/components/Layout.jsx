import { useState } from "react";
import HeaderPage from "./Header";
import Sidebar from "./SideBar";
import ScrollToTop from "./ScrollToTop";
import FooterDash from "./FooterDash";
import { ThemeProvider, useTheme } from "next-themes";

const Layout = ({ children, user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LayoutContent
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        {children}
      </LayoutContent>
    </ThemeProvider>
  );
};

const LayoutContent = ({ children, user, isSidebarOpen, setIsSidebarOpen }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-zinc-950" : "bg-gray-50"
      }`}
    >
      <div className="flex">
        <ScrollToTop />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          <div
            className={`fixed top-0 h-16 z-30 ${
              isSidebarOpen ? "md:left-64" : "md:left-16"
            } left-0 right-0 ${
              theme === "dark" ? "bg-zinc-950" : "bg-gray-50"
            } border-b ${
              theme === "dark" ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <HeaderPage
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              user={user}
            />
          </div>

          <main
            className={`flex-1 mt-8 pb-5 ${
              isSidebarOpen ? "md:ml-64" : "md:ml-8"
            } transition-all duration-200 ${
              theme === "dark" ? "bg-zinc-950" : "bg-gray-50"
            }`}
          >
            <div className="h-full w-full">{children}</div>
          </main>

          <FooterDash isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
