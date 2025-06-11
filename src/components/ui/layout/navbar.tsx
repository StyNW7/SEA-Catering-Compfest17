// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { MenuIcon, Package2Icon, SunIcon, MoonIcon, LogOutIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { useSession, signOut } from "next-auth/react";
// import Image from "next/image"; // For your logo

// export function Navbar() {

//   const pathname = usePathname();
//   const { data: session, status } = useSession();
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     // Check local storage or system preference for dark mode
//     const storedTheme = localStorage.getItem('theme');
//     if (storedTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//       setIsDarkMode(true);
//     } else if (storedTheme === 'light') {
//       document.documentElement.classList.remove('dark');
//       setIsDarkMode(false);
//     } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
//       document.documentElement.classList.add('dark');
//       setIsDarkMode(true);
//     }
//   }, []);

//   const toggleDarkMode = () => {
//     const newMode = !isDarkMode;
//     setIsDarkMode(newMode);
//     if (newMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   };

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Menu / Meal Plans", href: "/menu" },
//     { name: "Subscription", href: "/subscribe" },
//     { name: "Testimonials", href: "/testimonials" },
//     { name: "Contact Us", href: "/contact" },
//   ];

//   return (
//     <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
//       <Link href="/" className="flex items-center gap-2 font-semibold">
//         {/* Replace with your actual logo */}
//         <Image
//           src="/images/logo.png" // Make sure you have a logo.png in your public/images folder
//           alt="SEA Catering Logo"
//           width={40}
//           height={40}
//           className="rounded-full"
//         />
//         <span className="text-lg">SEA Catering</span>
//       </Link>
//       <nav className="hidden md:flex md:items-center md:gap-5 lg:gap-6 text-sm font-medium">
//         {navLinks.map((link) => (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={`transition-colors hover:text-foreground ${
//               pathname === link.href ? "text-foreground" : "text-muted-foreground"
//             }`}
//           >
//             {link.name}
//           </Link>
//         ))}
//         {/* Conditional Dashboard Link */}
//         {status === "authenticated" && (
//           <Link
//             href={session.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"}
//             className={`transition-colors hover:text-foreground ${
//               pathname.startsWith("/dashboard") ? "text-foreground" : "text-muted-foreground"
//             }`}
//           >
//             Dashboard
//           </Link>
//         )}
//       </nav>

//       <div className="flex items-center gap-4">
//         {/* Dark Mode Toggle */}
//         <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
//           {isDarkMode ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
//           <span className="sr-only">Toggle dark mode</span>
//         </Button>

//         {/* Auth Buttons */}
//         {status === "loading" && (
//           <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div> // Placeholder for loading state
//         )}
//         {status === "unauthenticated" && (
//           <Button asChild>
//             <Link href="/auth/login">Login</Link>
//           </Button>
//         )}
//         {status === "authenticated" && (
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-medium hidden sm:inline">{session.user.name || session.user.email}</span>
//             <Button variant="ghost" size="icon" onClick={() => signOut()}>
//               <LogOutIcon className="h-5 w-5" />
//               <span className="sr-only">Sign Out</span>
//             </Button>
//           </div>
//         )}
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="shrink-0 md:hidden">
//               <MenuIcon className="h-5 w-5" />
//               <span className="sr-only">Toggle navigation menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left">
//             <nav className="grid gap-6 text-lg font-medium">
//               <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
//                 <Package2Icon className="h-6 w-6" />
//                 <span className="sr-only">SEA Catering</span>
//               </Link>
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className={`hover:text-foreground ${
//                     pathname === link.href ? "text-foreground" : "text-muted-foreground"
//                   }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//               {status === "authenticated" && (
//                 <Link
//                   href={session.user.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/user"}
//                   className={`hover:text-foreground ${
//                     pathname.startsWith("/dashboard") ? "text-foreground" : "text-muted-foreground"
//                   }`}
//                 >
//                   Dashboard
//                 </Link>
//               )}
//               {status === "authenticated" && (
//                 <Button variant="ghost" className="justify-start pl-0" onClick={() => signOut()}>
//                   <LogOutIcon className="h-5 w-5 mr-2" /> Sign Out
//                 </Button>
//               )}
//             </nav>
//           </SheetContent>
//         </Sheet>
//       </div>
//     </header>
//   );
// }