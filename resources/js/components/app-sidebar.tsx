import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, etudiants, niveau, professeur, seance } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Building2,
    Calendar1,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    LayoutDashboard,
    LayoutGrid,
    Settings2,
    User2,
    UserCog,
    Users,
} from 'lucide-react';
import AppLogo from './app-logo';


const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutDashboard,
    },
    {
        title: 'Etudiant',
        href: "/etudiants",
        icon: Users,
    },
    {
        title: 'Inscriptions',
        href: "/inscriptions",
        icon: ClipboardList,
    },

    {
        title: 'Classes',
        href: niveau(),
        icon: GraduationCap,
    },
        {
        title: 'Professeurs',
        href: professeur(),
        icon: UserCog,
    },
    {
        title: 'Programmes',
        href: seance(),
        icon: CalendarDays,
    },
];
const footerNavItems: NavItem[] = [
    {
        title: 'Configurations',
        href: '/configurations',
        icon: Settings2,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
