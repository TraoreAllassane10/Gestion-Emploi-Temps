import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';

interface PaginationLinkItem {
    label: string;
    url: string | null;
    active: boolean;
}

interface PaginationLinksProps {
    links: PaginationLinkItem[];
}

const PaginationLinks = ({ links }: PaginationLinksProps) => {
    if (!links || links.length <= 3) return null;

    const prev = links[0];
    const next = links[links.length - 1];
    const pages = links.slice(1, -1);

    const navigate = (url: string | null) => {
        if (url) router.visit(url);
    };

    return (
        <div className="flex items-center justify-between px-1 pt-4">
            {/* Infos textuelles à gauche (optionnel) */}
            <p className="text-xs text-muted-foreground hidden sm:block">
                Page{' '}
                <span className="font-medium">
                    {pages.find((l) => l.active)?.label ?? '—'}
                </span>{' '}
                sur{' '}
                <span className="font-medium">{pages.length}</span>
            </p>

            <Pagination className="mx-0 w-auto">
                <PaginationContent className="gap-1">

                    {/* Précédent */}
                    <PaginationItem>
                        <PaginationPrevious
                            href={prev.url ?? '#'}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(prev.url);
                            }}
                            className={
                                !prev.url
                                    ? 'pointer-events-none opacity-40'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>

                    {/* Numéros de page */}
                    {pages.map((link, i) => {
                        // Affiche "..." pour les pages éloignées
                        const currentIndex = pages.findIndex((l) => l.active);
                        const showEllipsisBefore =
                            i === 1 && currentIndex > 3;
                        const showEllipsisAfter =
                            i === pages.length - 2 &&
                            currentIndex < pages.length - 4;

                        // Masquer les pages trop éloignées de la page active
                        const isNearActive =
                            Math.abs(i - currentIndex) <= 1 ||
                            i === 0 ||
                            i === pages.length - 1;

                        if (!isNearActive && !showEllipsisBefore && !showEllipsisAfter) {
                            return null;
                        }

                        if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                                <PaginationItem key={`ellipsis-${i}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={link.label}>
                                <PaginationLink
                                    href={link.url ?? '#'}
                                    isActive={link.active}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!link.active) navigate(link.url);
                                    }}
                                    className={
                                        link.active
                                            ? 'pointer-events-none cursor-default'
                                            : 'cursor-pointer'
                                    }
                                >
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    {/* Suivant */}
                    <PaginationItem>
                        <PaginationNext
                            href={next.url ?? '#'}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(next.url);
                            }}
                            className={
                                !next.url
                                    ? 'pointer-events-none opacity-40'
                                    : 'cursor-pointer'
                            }
                        />
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default PaginationLinks;