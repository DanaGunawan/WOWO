import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "./theme-provider";
import { isUserOnline } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { protectedRoutes } from "@/routes/routes";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AvatarWithBadge from "./ui/avatar-with-badge";

const AsideBar = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const isOnline = isUserOnline(user?._id);

  return (
    <aside className="fixed inset-y-0 left-0 z-9999 h-svh w-11 bg-primary/85 shadow-sm">
      <div className="flex h-full w-full flex-col items-center justify-between px-1 py-2">
        {/* Top: Logo */}
        <Logo
          imgClass="size-7"
          showText={false}
          textClass="text-white"
          url={protectedRoutes.CHAT}
        />

        {/* Bottom: Theme toggle + Avatar */}
        <div className="flex flex-col items-center gap-3">
          <Button
            className="rounded-full border-0"
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div role="button" className="cursor-pointer">
                <AvatarWithBadge
                  name={user?.name || "unknown"}
                  src={user?.avatar || ""}
                  isOnline={isOnline}
                />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="z-9999 w-48 rounded-lg"
              align="end"
              side="right"
            >
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
};

export default AsideBar;