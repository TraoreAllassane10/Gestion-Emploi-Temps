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
        title: 'Professeur',
        href: '/professeur',
    },
];

const Index = () => {
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Professeur</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter un professeur
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouveau professeur</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une nouveau professeur
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom
                                        </Label>
                                        <Input id="sheet-demo-name" />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Prenom
                                        </Label>
                                        <Input id="sheet-demo-name" />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Email
                                        </Label>
                                        <Input id="sheet-demo-name" />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Telephone
                                        </Label>
                                        <Input id="sheet-demo-name" />
                                    </div>
                                        <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Discipline Enseigné
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
                                        <TableHead>Nom</TableHead>
                                        <TableHead>Prenom</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Télephone</TableHead>
                                        <TableHead>Discipline</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Traore 
                                        </TableCell>
                                          <TableCell className="font-medium">
                                             Allassane
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             Allassane@gmail.com
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             0564639933
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             Engenerie Backend
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
                                            Kouassi
                                        </TableCell>
                                          <TableCell className="font-medium">
                                             Jean
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             jean@gmail.com
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             0708036954
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             Merise
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
                                            Kone
                                        </TableCell>
                                          <TableCell className="font-medium">
                                             Ibrahim
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             ibrahim@gmail.com
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             0506874596
                                        </TableCell>
                                         <TableCell className="font-medium">
                                             Algorithmique
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
