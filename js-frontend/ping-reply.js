/* this code will send a ping every 5 seconds
to keep the connection active with the server.
If the site doesn't reply with a ping after a certain period of time,
the server will stop listening */
setInterval(() => {
        fetch('/ping').catch(err => console.error('Ping failed:', err));
    }, 5000); // Ping every 5 seconds