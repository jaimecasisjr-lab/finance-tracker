import AnalyticsCards from '../components/AnalyticsCards';

export default function Analytics() {
  return (
    <section className="page-container">

      <div className="page-header">
        <h1>Analytics</h1>

        <p>
          Understand your spending habits and
          financial activity.
        </p>
      </div>

      <AnalyticsCards />

    </section>
  );
}