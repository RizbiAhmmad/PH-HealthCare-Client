"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, HeartPulse, LogOut, LayoutDashboard } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkAuth, logoutAction } from "@/app/_actions/auth.actions";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function PublicNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await checkAuth();
      setIsAuthenticated(result.isAuthenticated);
      setUser(result.user);
      setIsLoading(false);
    };
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    setIsAuthenticated(false);
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Consultations", href: "/consultation" },
    { name: "Diagnostics", href: "/diagnostics" },
    { name: "Health Plans", href: "/health-plans" },
    { name: "Medicines", href: "/medicine" },
    { name: "NGOs", href: "/ngos" },
  ];

  const getDashboardUrl = (role?: string) => {
    if (!role) return "/";
    const roleLower = role.toLowerCase();
    if (roleLower.includes("admin")) return "/admin/dashboard";
    if (roleLower.includes("doctor")) return "/doctor/dashboard";
    if (roleLower.includes("patient")) return "/patient/dashboard";
    return "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-primary hidden sm:inline-block">
            PH Health
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-primary ${
                  isActive
                    ? "text-primary font-semibold border-b-2 border-primary pb-0.5"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons / User Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoading && isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.email}
                    </p>
                    <p className="text-xs text-primary capitalize">
                      {user.role.toLowerCase().replace("_", " ")}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardUrl(user.role)} className="flex items-center w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            !isLoading && (
              <Button variant="outline" asChild>
                <Link href="/login">Log in</Link>
              </Button>
            )
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          {!isLoading && isAuthenticated && user ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={getDashboardUrl(user.role)}>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
          ) : (
            !isLoading && (
              <Button variant="outline" size="sm" asChild className="sm:hidden">
                <Link href="/login">Log in</Link>
              </Button>
            )
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left font-bold text-xl text-primary flex items-center gap-2 mb-6">
                <HeartPulse className="h-6 w-6" /> PH Health
              </SheetTitle>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-2 py-1 text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.name}
                  </Link>
                ))}
                {!isAuthenticated ? (
                  <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/login">Log in</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/register">Sign up</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-4 border-t pt-4">
                    <div className="px-2 py-1">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                      <p className="text-xs text-primary capitalize">{user?.role.toLowerCase().replace("_", " ")}</p>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={getDashboardUrl(user?.role)}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}