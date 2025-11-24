<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Liste des séances</title>

    <style>
        body {
            font-family: sans-serif;
            font-size: 12px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th,
        table td {
            border: 1px solid #999;
            padding: 6px;
            text-align: left;
        }
    </style>
</head>

<body>

    <h2>Liste des séances</h2>

    <table>
        <thead>
            <tr>
                <th>Jours</th>
                <th>Date</th>
                <th>Heure Debut</th>
                <th>Heure Fin</th>
                <th>Cours</th>
                <th>Professeur</th>
                <th>Salle</th>
                <th>Niveau</th>
            </tr>
        </thead>
        <tbody>
            @forelse ($seances as $s)
                <tr>
                    <td>{{ $s->jours }}</td>
                    <td>{{ \Carbon\Carbon::parse($s->date)->format('d-m-Y') }}</td>
                    <td>{{ $s->heure_debut }}</td>
                    <td>{{ $s->heure_fin }}</td>
                    <td>{{ $s->cours->nom }}</td>
                    <td>{{ $s->professeur->nom }} {{ $s->professeur->prenom }}</td>
                    <td>{{ $s->salle->nom }}</td>
                    <td>{{ $s->niveau->nom }}</td>
                </tr>
            @empty
                <p>Aucune séance</p>
            @endforelse
        </tbody>
    </table>

</body>

</html>
