// Utility to fetch and parse CSV file in browser
export async function fetchScienceCareers() {
  const response = await fetch('/src/data/science_careers.csv');
  const text = await response.text();
  return parseCSV(text);
}

function parseCSV(text) {
  const lines = text.split('\n').filter(Boolean);
  const headers = lines[0].split(',');
  return lines.slice(1).map(line => {
    const values = line.split(',');
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i]?.replace(/(^\"|\"$)/g, '');
    });
    return obj;
  });
}
