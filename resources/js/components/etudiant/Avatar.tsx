function Avatar({
    prenom,
    nom,
    genre,
}: {
    prenom: string;
    nom: string;
    genre: string;
}) {
    const isFemme = genre === 'Féminin';
    return (
        <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${isFemme ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'}`}
        >
            {nom && nom[0]}
            {prenom && prenom[0]}
        </div>
    );
}

export default Avatar;
