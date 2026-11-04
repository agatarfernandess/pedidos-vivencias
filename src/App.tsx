import { useEffect, useState } from "react";
import { CityFilter } from "./components/CityFilter";
import { JobCard } from "./components/JobCard";
import { CITIES, jobs as initialJobs } from "./data/jobs";
import type { JobRequest } from "./types";

const LOADING_DELAY_MS = 1000;

export default function App() {
  // Só guardo no estado o que não se consegue calcular:
  // os pedidos que ainda estão disponíveis e a cidade escolhida.
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");

  // Simula um pedido a um servidor que demora 1 segundo.
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setJobs(initialJobs);
      setIsLoading(false);
    }, LOADING_DELAY_MS);

    // Se o componente desaparecer antes do segundo passar,
    // cancelo o timeout para não atualizar estado de um componente morto.
    return () => clearTimeout(timeoutId);
  }, []);

  function handleAccept(id: string) {
    setJobs((currentJobs) => currentJobs.filter((job) => job.id !== id));
  }

  // A lista visível é calculada a cada render a partir do estado,
  // em vez de ser guardada num segundo estado que podia ficar dessincronizado.
  const visibleJobs = jobs
    .filter((job) => selectedCity === "" || job.city === selectedCity)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <main className="app">
      <header className="app__header">
        <h1>Pedidos disponíveis</h1>
        <CityFilter
          cities={CITIES}
          value={selectedCity}
          onChange={setSelectedCity}
        />
      </header>

      {isLoading ? (
        <p className="message" role="status">
          A carregar pedidos…
        </p>
      ) : jobs.length === 0 ? (
        <p className="message">
          Não há pedidos disponíveis de momento. Volta mais tarde!
        </p>
      ) : visibleJobs.length === 0 ? (
        <div className="message">
          <p>Não há pedidos disponíveis em {selectedCity}.</p>
          <button type="button" onClick={() => setSelectedCity("")}>
            Ver todas as cidades
          </button>
        </div>
      ) : (
        <>
          <p className="count">
            {visibleJobs.length}{" "}
            {visibleJobs.length === 1 ? "pedido" : "pedidos"}
          </p>
          <ul className="job-list">
            {visibleJobs.map((job) => (
              <JobCard key={job.id} job={job} onAccept={handleAccept} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
