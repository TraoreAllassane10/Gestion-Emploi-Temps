<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Certificat de scolarité</title>

    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
        }

        .header {
            text-align: left;
            margin-bottom: 10px;
        }

        .header h2 {
            margin: 0;
            font-size: 16px;
        }

        .header h3 {
            margin: 5px 0;
            font-size: 24px;
            text-decoration: underline;
            text-align: center;
            margin-top: 20px;
        }

        p {
            font-size: 16px;
        }

        table {
            border-collapse: collapse;
            width: 100%;
        }

        table th,
        td {
            border: 1px solid black;
            text-align: center;
            padding: 12px;
            font-size: 14px;
        }

        .footer {
            margin-top: 50px;
            text-align: right;
        }
    </style>

</head>

<body>

    <div class="header">

      <table>
         <td style="border: none; text-align: left;">
             <img src="{{ public_path('./images/logo_inec.jpg') }}" alt="INEC SA" width="100" height="100"
            onerror="this.style.display='none'">
         </td>
      </table>
        {{-- <h2>INSTITUT NATIONAL D'INTELLIGENCE NUMÉRIQUE</h2> --}}
        <h3>CERTIFICAT DE SCOLARITE</h3>

    </div>
    {{-- @dd($etudiant); --}}
    <div>
        <p>Je soussignés, Institut National d'Intelligence Numérique Economique et Commerciale (INEC) certifie que: </p>
        <p>L'étudiant(e) : <span style="font-weight: bold; text-transform: uppercase;">{{ $etudiant['nom'] }} {{ $etudiant['prenom'] }}</span> née le
            <span
                style="font-weight: bold">{{ \Carbon\Carbon::parse($etudiant['date_naissance'])->format('d/m/Y') }}</span>
            à <span style="font-weight: bold; text-transform: uppercase;">{{ $etudiant['lieu_naissance'] }}</span>
        </p>
        <p><span style="font-weight: bold">IP : {{ $etudiant['ip'] }}</span></p>
        <p>est inscrit(e) sur le registre de l'Etablissement et suit les cours dans les conditions ci-dessous
            mentionnées
            : </p>
    </div>

    <table>
        <thead>
            <tr>
                <th>ANNEE</th>
                <th>NIVEAU</th>
                <th>FILIERE</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($etudiant['inscriptions'] as $inscription)
                <tr>
                    <td>{{ $inscription['annee']['libelle'] }}</td>

                    <td>
                        @foreach ($inscription['niveaux'] as $niveau)
                            {{ $niveau['nom'] }} <br/>
                        @endforeach
                    </td>
                    <td style="text-transform: uppercase; font-weight: bold;">{{ $inscription['niveaux'][0]['filiere']['nom'] }}</td>
                </tr>
            @endforeach

        </tbody>
    </table>

    <p>En foi de quoi, ce certificat est délivré à l'intéressée pour servir et valoir ce que de droit.</p>

    <div class="footer">

        <p>Daloa le
            {{ \Carbon\Carbon::now()->format('d/m/Y') }}</p>

        <p style="margin-top: 30px">Le Directeur Général</p>

    </div>


</body>

</html>
