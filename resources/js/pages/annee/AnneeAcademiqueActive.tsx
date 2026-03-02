import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
import useAnnee from '@/hooks/useAnnee';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { Annee } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface AnneeAcademiqueActiveProps {
    anneeActive: Annee;
    annees: Annee[];
    [key: string]: any;
}

const AnneeAcademiqueActive = () => {
    const { anneeActive, annees } = usePage<AnneeAcademiqueActiveProps>().props;
    const [annee, setAnnee] = useState('');

    const {changeAnnee} = useAnnee()

    const updateAnneeActive = () => {
        if (! annee) {
            return ;
        }
        
        changeAnnee(annee)
    }

    return (
        <AppLayout>
            <ConfigurationLayout>
                <h1 className="text-2xl font-bold">Année Académique Active</h1>
                <div className="rounded-md bg-green-100 p-5 text-black">
                    Année Académiqe Active :{' '}
                    <span className="font-bold text-green-500">
                        {anneeActive.libelle}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="sheet-demo-name">Années Académiques</Label>

                    <div className="flex gap-2">
                        <NativeSelect
                            className="w-full"
                            value={annee}
                            onChange={(e) => setAnnee(e.target.value)}
                        >
                            <NativeSelectOption value="">
                                Changer d'année
                            </NativeSelectOption>

                            {annees.map((annee) => (
                                <NativeSelectOption
                                    key={annee.id}
                                    value={annee.id}
                                >
                                    {annee.libelle}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>

                        {annee && (
                            <Button className="bg-red-500" onClick={updateAnneeActive}>Changer</Button>
                        )}
                    </div>
                </div>
            </ConfigurationLayout>
        </AppLayout>
    );
};

export default AnneeAcademiqueActive;
