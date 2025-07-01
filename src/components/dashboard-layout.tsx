'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, Heart, Search, CalendarDays, Target, Video, Users2, FileText, Settings, BarChart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';

export function DashboardLayout({ children, pageTitle }: { children: React.ReactNode; pageTitle: string }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <div className="min-h-screen lg:flex">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center gap-2">
               <div className="p-1.5 rounded-lg bg-primary">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-semibold text-primary">ConnectVerse</h1>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Event Management" isActive={pathname === '/events'}>
                  <Link href="/events">
                    <CalendarDays />
                    <span>Event Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Real-Time Dashboard" isActive={pathname === '/'}>
                  <Link href="/">
                    <BarChart />
                    <span>Real-Time Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Matching Tracker" isActive={pathname === '/tracking'}>
                  <Link href="/tracking">
                    <Target />
                    <span>Matching Tracker</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Meeting Monitoring" isActive={pathname === '/meetings'}>
                  <Link href="/meetings">
                    <Video />
                    <span>Meeting Monitoring</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Participant Management" isActive={pathname === '/participants'}>
                  <Link href="/participants">
                    <Users2 />
                    <span>Participant Management</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reports" isActive={pathname === '/reports'}>
                  <Link href="/reports">
                    <FileText />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="AI Matching Settings" isActive={pathname === '/ai-matching-settings'}>
                  <Link href="/ai-matching-settings">
                    <Settings />
                    <span>AI Matching Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter />
        </Sidebar>
        <SidebarInset>
          <div className="flex flex-col h-full">
            <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 shrink-0">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <h1 className="text-lg font-semibold md:text-xl">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-9" />
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
                <UserNav />
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 space-y-6 bg-background">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
