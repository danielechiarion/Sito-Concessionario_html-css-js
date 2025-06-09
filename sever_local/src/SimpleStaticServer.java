import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.file.Files;
import java.util.concurrent.Executor;
import java.util.concurrent.atomic.AtomicLong;

public class SimpleStaticServer {
    private static final AtomicLong lastPingTime = new AtomicLong(System.currentTimeMillis());
    private static final long TIMEOUT = 3600_000; // 1 hour
    private static final long GRACE_PERIOD = 5_000; // 5 seconds

    public static void main(String[] args) throws Exception {
        long serverStartTime = System.currentTimeMillis();
        short port = 8000;
        String rootDir = new File(System.getProperty("user.dir"), "../../../..").getCanonicalPath(); //this rootdir is for the .jar file
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
        server.createContext("/", new StaticFileHandler(rootDir));
        server.createContext("/ping", new PingHandler());
        server.setExecutor((Executor) null);
        server.start();
        System.out.println("Server started at http://localhost:" + port);

        // Thread to monitor ping timeout
        new Thread(() -> {
            while (true) {
                long currentTime = System.currentTimeMillis();
                if (currentTime - serverStartTime > GRACE_PERIOD &&
                        currentTime - lastPingTime.get() > TIMEOUT) {
                    System.out.println("No ping received. Shutting down the server...");
                    server.stop(0);
                    System.exit(0);
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();

        if (Desktop.isDesktopSupported()) {
            Desktop.getDesktop().browse(new URI("http://localhost:" + port + "/html/pages/index.html"));
        } else {
            System.out.println("Unable to open the browser automatically.");
        }
    }

    public static class StaticFileHandler implements HttpHandler {
        private final String rootDir;

        public StaticFileHandler(String rootDir) {
            this.rootDir = rootDir;
        }

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String filePath = rootDir + exchange.getRequestURI().getPath();
            File file = new File(filePath);

            if (file.exists() && !file.isDirectory()) {
                String mimeType = Files.probeContentType(file.toPath());
                if (mimeType == null) {
                    mimeType = "application/octet-stream"; // Default MIME type
                }

                byte[] response = Files.readAllBytes(file.toPath());
                exchange.getResponseHeaders().set("Content-Type", mimeType);
                exchange.sendResponseHeaders(200, response.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response);
                }
            } else {
                String response = "404 (Not Found)";
                exchange.sendResponseHeaders(404, response.length());
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(response.getBytes());
                }
            }
        }
    }

    public static class PingHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            lastPingTime.set(System.currentTimeMillis());
            String response = "OK";
            exchange.sendResponseHeaders(200, response.length());
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(response.getBytes());
            }
        }
    }
}