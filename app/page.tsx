export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <section className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8 border border-slate-200">
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Math Engine
        </h1>

        <p className="text-slate-600 mb-6">
          Een modulaire, adaptieve oefenomgeving om alle wiskundedomeinen
          van het secundair onderwijs te trainen.
        </p>

        <div className="flex justify-center">
          <a
            href="/session"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Start Oefenen
          </a>
        </div>
      </section>
    </main>
  );
}

