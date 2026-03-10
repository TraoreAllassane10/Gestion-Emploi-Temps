<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
        }

        .container {
            width: 100%;
            border: 1px solid #000;
            padding: 15px;
        }

        .header {
            text-align: center;
        }

        .header h3 {
            margin: 0;
            font-size: 14px;
        }

        .header h4 {
            margin: 3px 0;
        }

        .numero {
            text-align: right;
            color: red;
            font-weight: bold;
        }

        table {
            width: 100%;
            margin-top: 15px;
        }

        td {
            padding: 5px;
        }

        .label {
            width: 35%;
        }

        .line {
            border-bottom: 1px solid black;
        }

        .footer {
            margin-top: 25px;
        }

        .signature {
            margin-top: 40px;
        }
    </style>

</head>

<body>

    <div class="container">

        <div class="header">

            <h3>INSTITUT NATIONAL D’INTELLIGENCE NUMERIQUE, ECONOMIQUE ET COMMERCIALE</h3>

            <h4>INEC - DALOA</h4>

            <h4>REÇU DE RÈGLEMENT DES FRAIS D’ECOLE</h4>

        </div>

        <p class="numero">
            N° {{ $paiement->id }}
        </p>

        <table>

            <tr>
                <td class="label">Nom et prénoms :</td>
                <td class="line">
                    {{ $paiement->inscription->etudiant->nom }}
                    {{ $paiement->inscription->etudiant->prenom }}
                </td>
            </tr>

            <tr>
                <td class="label">Matricule / IP :</td>
                <td class="line">
                    {{ $paiement->inscription->etudiant->ip }}
                </td>
            </tr>

            <tr>
                <td class="label">Classe :</td>
                <td class="line">
                    @foreach ($paiement->inscription->niveaux as $niveau)
                        {{ $niveau->nom ?? '' }}
                    @endforeach

                </td>
            </tr>

            <tr>
                <td class="label">Montant réglé :</td>
                <td class="line">
                    {{ number_format($paiement->montant, 0, ',', ' ') }} FCFA
                </td>
            </tr>

            <tr>
                <td class="label">Mode de règlement :</td>
                <td class="line">
                    {{ $paiement->methode_paiement }}
                </td>
            </tr>

            <tr>
                <td class="label">Date :</td>
                <td class="line">
                    {{ $paiement->date_paiement }}
                </td>
            </tr>

            <tr>
                <td class="label">Reste à payer :</td>
                <td class="line">
                    {{ number_format($reste, 0, ',', ' ') }} FCFA
                </td>
            </tr>

        </table>

        <div class="footer">

            <table width="100%">

                <tr>

                    <td>

                        <div class="signature">
                            Signature de l'étudiant
                        </div>

                    </td>

                    <td style="text-align:right">

                        <div class="signature">
                            Cachet et signature de l’agent
                        </div>

                    </td>

                </tr>

            </table>

        </div>

    </div>

</body>

</html>
