import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import {
    Sheet,
    SheetClose,
    SheetContent,
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
        title: 'Seance',
        href: '/seance',
    },
];

const Index = () => {
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">Emploi du temps</h1>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    Ajouter une séance
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle séance</SheetTitle>
                                    {/* <SheetDescription>
                                        Ajouter une nouvelle séance
                                    </SheetDescription> */}
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Niveau
                                        </Label>
                                        <NativeSelect className="w-full">
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="">
                                                IDA 1
                                            </NativeSelectOption>
                                            <NativeSelectOption value="">
                                                IDA 2
                                            </NativeSelectOption>
                                            <NativeSelectOption value="todo">
                                                Licence 1 FCGE
                                            </NativeSelectOption>
                                            <NativeSelectOption value="in-progress">
                                                Licence 2 FCGE
                                            </NativeSelectOption>
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Cours
                                        </Label>
                                        <NativeSelect className="w-full">
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="">
                                                Merise
                                            </NativeSelectOption>
                                            <NativeSelectOption value="">
                                                Algorithme
                                            </NativeSelectOption>
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Professeur
                                        </Label>
                                        <NativeSelect className="w-full">
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="">
                                                Traore Allassane
                                            </NativeSelectOption>
                                            <NativeSelectOption value="todo">
                                                Kone Ibrahim
                                            </NativeSelectOption>
                                            <NativeSelectOption value="in-progress">
                                                Kouassi Jean
                                            </NativeSelectOption>
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Salle
                                        </Label>
                                        <NativeSelect className="w-full">
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="">
                                                Salle Marketing
                                            </NativeSelectOption>
                                            <NativeSelectOption value="todo">
                                                Salle Compta
                                            </NativeSelectOption>
                                            <NativeSelectOption value="in-progress">
                                                Salle Info
                                            </NativeSelectOption>
                                        </NativeSelect>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Jour
                                        </Label>
                                        <NativeSelect className="w-full">
                                            <NativeSelectOption value=""></NativeSelectOption>
                                            <NativeSelectOption value="">
                                                Lundi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="todo">
                                                Mardi
                                            </NativeSelectOption>
                                            <NativeSelectOption value="in-progress">
                                                Mercredi
                                            </NativeSelectOption>
                                        </NativeSelect>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <Label htmlFor="sheet-demo-name">
                                                Heure Début
                                            </Label>
                                            <Input
                                                type="time"
                                                id="sheet-demo-name"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="sheet-demo-name">
                                                Heure Fin
                                            </Label>
                                            <Input
                                                type="time"
                                                id="sheet-demo-name"
                                            />
                                        </div>
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
                                    <TableRow className="bg-muted/60">
                                        <TableHead className="font-semibold">
                                            Jour
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Début
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Fin
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Cours
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Professeur
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Salle
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Niveau
                                        </TableHead>
                                        <TableHead className="text-center font-semibold">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium">
                                            Samedi
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            07h30
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            17h15
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Merise
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            M.Traore Allassane
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Salle Info
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            IDA 2
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
                                            Dimanche
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            07h30
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            17h15
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Merise
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            M.Traore Allassane
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            Salle Info
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            IDA 2
                                        </TableCell>
                                        <TableCell className="flex gap-2">
                                            <Link>
                                            <Edit
                                                size={20}
                                                className="cursor-pointer text-blue-600 hover:text-blue-800"
                                            />
                                        </Link>

                                        <Link>
                                            <Trash
                                                size={20}
                                                className="cursor-pointer text-red-600 hover:text-red-800"
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
