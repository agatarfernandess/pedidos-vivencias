import type { JobRequest } from "../types";
import {
  formatDate,
  formatDuration,
  formatPrice,
  formatTime,
} from "../utils/format";

type JobCardProps = {
  job: JobRequest;
  onAccept: (id: string) => void;
};

export function JobCard({ job, onAccept }: JobCardProps) {
  return (
    <li className="job-card">
      <div className="job-card__header">
        <h2>{job.service}</h2>
        {job.urgent && <span className="badge">Urgente</span>}
      </div>

      <dl className="job-card__details">
        <div>
          <dt>Cidade</dt>
          <dd>{job.city}</dd>
        </div>
        <div>
          <dt>Data</dt>
          <dd>
            {formatDate(job.startsAt)} às{" "}
            <time dateTime={job.startsAt}>{formatTime(job.startsAt)}</time>
          </dd>
        </div>
        <div>
          <dt>Duração</dt>
          <dd>{formatDuration(job.durationMin)}</dd>
        </div>
        <div>
          <dt>Valor</dt>
          <dd className="price">{formatPrice(job.priceCents)}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onAccept(job.id)}
        aria-label={`Aceitar pedido de ${job.service} em ${job.city}`}
      >
        Aceitar
      </button>
    </li>
  );
}
