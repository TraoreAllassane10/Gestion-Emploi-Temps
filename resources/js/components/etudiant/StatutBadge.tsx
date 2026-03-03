import { statutConfig, StatutEtudiant } from "@/pages/etudiant/data/mock";

function StatutBadge({ statut }: { statut: StatutEtudiant }) {
  const { className, dotClass } = statutConfig[statut]
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {statut}
    </span>
  )
}

export default StatutBadge;