import { EVOLUTION_MENSUELLE } from "@/pages/dashboard-mock";
import { fmtCompact } from "@/utils/util";

export default function BarChart() { 
    const max = Math.max(...EVOLUTION_MENSUELLE.map((m) => m.attendu));
    
    return (
        <div className="flex h-36 items-end gap-2 px-1">
            {EVOLUTION_MENSUELLE.map((m, i) => {
                const hA = Math.round((m.attendu / max) * 100);
                const hP = Math.round((m.paye / max) * 100);
                const isLast = i === EVOLUTION_MENSUELLE.length - 1;
                return (
                    <div
                        key={m.mois}
                        className="group relative flex flex-1 flex-col items-center gap-1"
                    >
                        {/* Tooltip hover */}
                        <div className="pointer-events-none absolute -top-16 left-1/2 z-10 -translate-x-1/2 rounded-lg border bg-popover px-2.5 py-1.5 text-xs whitespace-nowrap opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                            <p className="mb-0.5 font-bold">{m.mois}</p>
                            <p className="text-emerald-600">
                                Payé : {fmtCompact(m.paye)} XOF
                            </p>
                            <p className="text-muted-foreground">
                                Prévu : {fmtCompact(m.attendu)} XOF
                            </p>
                        </div>
                        <div className="flex h-32 w-full items-end gap-0.5">
                            <div
                                className="flex-1 rounded-t-sm bg-primary/10"
                                style={{ height: `${hA}%` }}
                            />
                            <div
                                className={`flex-1 rounded-t-sm transition-all ${isLast ? 'bg-primary/40' : 'bg-primary'}`}
                                style={{ height: `${hP}%` }}
                            />
                        </div>
                        <p
                            className={`text-[11px] font-medium ${isLast ? 'font-bold text-primary' : 'text-muted-foreground'}`}
                        >
                            {m.mois}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}