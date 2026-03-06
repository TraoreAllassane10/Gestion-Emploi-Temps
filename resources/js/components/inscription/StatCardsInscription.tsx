import { GraduationCap, Users } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function StatCardsInscription({ stats }: any) {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
            {[
                {
                    label: 'Total inscriptions',
                    value: stats.total_inscription,
                    Icon: Users,
                    bg: 'bg-blue-50',
                    color: 'text-blue-600',
                },
                {
                    label: "Inscriptions durant l'annee active",
                    value: stats.total_inscription_annee,
                    Icon: GraduationCap,
                    bg: 'bg-emerald-50',
                    color: 'text-emerald-600',
                },
            ].map(({ label, value, Icon, bg, color }) => (
                <Card key={label} className="border shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className={`rounded-lg p-2 ${bg}`}>
                            <Icon className={`h-4 w-4 ${color}`} />
                        </div>
                        <div>
                            <p className="text-xl font-bold tracking-tight">
                                {value}
                            </p>
                            <p className="text-xs leading-tight text-muted-foreground">
                                {label}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
