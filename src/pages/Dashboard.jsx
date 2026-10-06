import SummaryCards from '../components/SummaryCards';
import Analytics from '../components/Analytics';

export default function Dashboard() {
  return (
    <section className="dashboard-container">

      <header className="dashboard-header">
        <h1>Finance Dashboard</h1>

        <p>
          Here's an overview of your finances.
        </p>
      </header>

      <SummaryCards />

      <Analytics />

    </section>
  );
}