import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Années',
        href: '/annee',
    },
];

const Index = () => {
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Filière</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter une filière
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle filière</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une nouvelle filière
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom de la filière
                                        </Label>
                                        <Input id="sheet-demo-name" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <Button type="submit">Enregistrer</Button>
                                    <SheetClose asChild>
                                        <Button variant="outline">
                                            Fermer
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Card>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted">
                                        <TableHead>Libellé</TableHead>
                                        {/* <TableHead>Date de Début</TableHead>
                                        <TableHead>Date de Fin</TableHead> */}
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Développement Web et Mobile
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link>
                                                <Edit
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                            <Link>
                                                <Trash
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Sécurité Informatique
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link>
                                                <Edit
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                            <Link>
                                                <Trash
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Finance Comptabilité et Gestion
                                            d'Entreprise
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link>
                                                <Edit
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                            <Link>
                                                <Trash
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Gestion commerciale
                                        </TableCell>

                                        <TableCell className="flex gap-2">
                                            <Link>
                                                <Edit
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                            <Link>
                                                <Trash
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Ressource Humaine et Communication
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link>
                                                <Edit
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                            <Link>
                                                <Trash
                                                    size={24}
                                                    className="text-gray-500"
                                                />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
