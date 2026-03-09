<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Reçu de Paiement</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 14px;
            color: #333;
        }

        .container {
            width: 100%;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h2 {
            margin: 0;
        }

        .info {
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table th,
        table td {
            border: 1px solid #ddd;
            padding: 8px;
        }

        table th {
            background-color: #f2f2f2;
            text-align: left;
        }

        .footer {
            margin-top: 40px;
            text-align: right;
        }

        .signature {
            margin-top: 60px;
        }
    </style>

</head>

<body>

    <div class="container">

        <div class="header">
            <h2>REÇU DE PAIEMENT</h2>
            <p>Reçu N°: REC-2026-00045</p>
        </div>

        <div class="info">
            <strong>Date :</strong> {{ $date }} <br>
            <strong>Mode de paiement :</strong> {{ $inscription->methode_paiement }} <br>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Référence</th>
                    <th>IP Étudiant</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Montant</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{{ $reference }}</td>
                    <td>{{ $inscription->etudiant->ip }}</td>
                    <td>{{ $inscription->etudiant->nom }}</td>
                    <td>{{ $inscription->etudiant->prenom }}</td>
                    <td>{{ $montant }}</td>
                </tr>
            </tbody>
        </table>

        <div class="footer">
            <p><strong>Total payé : {{ $montant }} FCFA</strong></p>
            <p><strong>Reste à payer : {{ $reste }} FCFA</strong></p>
            <div class="signature">
                <p>Signature de l'etudiant</p>
            </div>

            <div class="signature">
                <p>Signature du receveur</p>
            </div>
        </div>

    </div>

</body>

</html>
