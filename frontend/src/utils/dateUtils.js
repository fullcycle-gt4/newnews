export function getTimeBasedGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour < 12) return 'Bom dia';
  if (currentHour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export function formatCurrentDateTime() {
  return new Date().toLocaleString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
