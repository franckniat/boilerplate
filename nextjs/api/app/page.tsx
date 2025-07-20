import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold">Boilerplate Next.js API</h1>
      <p className="text-muted-foreground">
        Ceci est un point de départ pour vos projets Next.js.
      </p>
      <ul className="list-disc pl-5">
        <li>✅ SWR pour récupération de données depuis une API REST</li>
        <li>✅ Authentification basée sur JWT</li>
        <li>✅ UI avec Shadcn UI + TailwindCSS</li>
        <li>✅ Structure modulaire par feature</li>
      </ul>
    </div>
  );
}
