import { Card, CardContent } from "./ui/card";

function StatCard({
  label, value, icon: Icon, color, bg,
}: { label: string; value: number | string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-lg ${bg}`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <div>
          <p className="text-xl font-bold tracking-tight">{value}</p>
          <p className="text-xs text-muted-foreground leading-tight">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default StatCard;