// Invia un messaggio al caricamento della pagina
fetch('/ping?event=load').catch(err => console.error('Ping load failed:', err));

// Ping periodico per mantenere la connessione attiva
const pingInterval = setInterval(() => {
    fetch('/ping?event=keepalive').catch(err => console.error('Ping failed:', err));
}, 5000);

// Invia un messaggio prima che la pagina venga chiusa
window.addEventListener('beforeunload', () => {
    // Usa sendBeacon per garantire l'invio anche in chiusura
    navigator.sendBeacon('/ping?event=close');
    clearInterval(pingInterval);
});