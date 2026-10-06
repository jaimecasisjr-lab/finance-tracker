export function formatTransactionDate(date) {
  if (!date) {
    return '—';
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Invalid date';
  }

  return parsedDate.toLocaleDateString(
    undefined,
    {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );
}