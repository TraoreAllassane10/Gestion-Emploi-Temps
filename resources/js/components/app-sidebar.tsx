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
import { annee, cours, dashboard, filiere, niveau, professeur, salle } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Book,
    BookA,
    BookOpen,
    Calendar1,
    Folder,
    House,
    LayoutGrid,
    LucideMoveUpLeft,
    User,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Annee Scolaire',
        href: annee(),
        icon: Book,
    },
    {
        title: 'Niveau',
        href: niveau(),
        icon: LucideMoveUpLeft,
    },
    {
        title: 'Filière',
        href: filiere(),
        icon: BookOpen,
    },
    {
        title: 'Professeur',
        href: professeur(),
        icon: User,
    },
    {
        title: 'Salle',
        href: salle(),
        icon: House,
    },
    {
        title: 'Cours',
        href: cours(),
        icon: BookA,
    },
    {
        title: 'Emploi du temps',
        href: dashboard(),
        icon: Calendar1,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
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
