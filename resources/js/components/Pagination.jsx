import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { router } from '@inertiajs/react';


const PaginationLinks = ({ links }) => {
    return (
        <Pagination className="mt-6">
            <PaginationContent>
                {links.map((link, index) => (
                    <PaginationItem key={index}>
                        {/* Bouton Précédent */}
                        {link.label.includes('Previous') && (
                            <PaginationPrevious
                                href={link.url || '#'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) router.visit(link.url);
                                }}
                                className={
                                    !link.url
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                }
                            />
                        )}

                        {/* Bouton Next */}
                        {link.label.includes('Next') && (
                            <PaginationNext
                                href={link.url || '#'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (link.url) router.visit(link.url);
                                }}
                                className={
                                    !link.url
                                        ? 'cursor-not-allowed opacity-50'
                                        : ''
                                }
                            />
                        )}

                        {/* Nombres */}
                        {!link.label.includes('Previous') &&
                            !link.label.includes('Next') && (
                                <PaginationLink
                                    href={link.url || '#'}
                                    isActive={link.active}
                                    className={`${link.active && 'bg-red-500 text-white'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (link.url) router.visit(link.url);
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            )}
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationLinks;
