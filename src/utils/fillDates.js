export function fillMissingDates(items, days) {
  const map = new Map();

  items.forEach((i) => {
    map.set(i.date, i.count);
  });

  const labels = [];
  const data = [];

  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const iso = d.toISOString().split("T")[0]; // 2025-01-03

    // Convert 2025-01-03 → 25-01-03
    const [yyyy, mm, dd] = iso.split("-");
    const short = `${yyyy.slice(2)}-${mm}-${dd}`;

    labels.push(short);         // <-- formatted label
    data.push(map.get(iso) || 0);
  }

  return { labels, data };
}
