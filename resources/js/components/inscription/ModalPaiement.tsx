import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { fmt } from "@/utils/util";

export default function ModalPaiement({
    open,
    onClose,
    resteAPayer,
}: {
    open: boolean;
    onClose: () => void;
    resteAPayer: number;
}) {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('Mensualité');

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enregistrer un paiement</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="flex justify-between rounded-lg bg-muted/50 p-3 text-sm">
                        <span className="text-muted-foreground">
                            Reste à payer
                        </span>
                        <span className="font-bold text-rose-600">
                            {fmt(resteAPayer)}
                        </span>
                    </div>

                    <div className="space-y-2">
                        <Label>Type de paiement</Label>
                        <Select value={type} onValueChange={setType}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[
                                    "Frais d'inscription",
                                    'Mensualité',
                                    'Paiement partiel',
                                    'Solde total',
                                ].map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Montant (FCFA)</Label>
                        <Input
                            type="number"
                            placeholder="Ex : 50 000"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        onClick={onClose}
                        disabled={!montant || Number(montant) <= 0}
                        className="gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" /> Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}