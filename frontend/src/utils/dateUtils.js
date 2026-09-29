/**
 * Returns a time-based greeting string in Portuguese.
 * Used in the HomePage header to personalize the user's experience.
 * 
 * @returns {'Bom dia'|'Boa tarde'|'Boa noite'}
 */
export function getTimeBasedGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Bom dia';
  if (currentHour < 18) return 'Boa tarde';
  return 'Boa noite';
}

/**
 * Formats the current date and time in Brazilian Portuguese locale.
 * Returns a string like "segunda-feira, 29 de setembro, às 10:25".
 * 
 * @returns {string} Formatted date and time string
 */
export function formatCurrentDateTime() {
  return new Date().toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
