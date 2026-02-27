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
import { dashboard, seance } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar1, LayoutGrid, Settings2 } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inscriptions',
        href: '#',
        icon: LayoutGrid,
    },
    {
        title: 'Personnel',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Niveau',
        href: dashboard(),
        icon: LayoutGrid,
    },

    // {
    //     title: 'Paiement Scolarité',
    //     href: dashboard(),
    //     icon: LayoutGrid,
    // },

    // {
    //     title: 'Annee Scolaire',
    //     href: annee(),
    //     icon: Book,
    // },
    // {
    //     title: 'Etudiant',
    //     href: etudiants(),
    //     icon: User2,
    // },
    // {
    //     title: 'Filière',
    //     href: filiere(),
    //     icon: GraduationCap,
    // },
    // {
    //     title: 'Niveau',
    //     href: niveau(),
    //     icon: LucideMoveUpLeft,
    // },
    // {
    //     title: 'Professeur',
    //     href: professeur(),
    //     icon: User,
    // },
    // {
    //     title: 'Salle',
    //     href: salle(),
    //     icon: Building2,
    // },
    // {
    //     title: 'Cours',
    //     href: cours(),
    //     icon: BookOpen,
    // },
    {
        title: 'Emploi du temps',
        href: seance(),
        icon: Calendar1,
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
