package server_localhost;

// Source code is decompiled from a .class file using FernFlower decompiler.
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.awt.Desktop;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.URI;
import java.nio.file.Files;
import java.util.concurrent.Executor;

public class SimpleStaticServer {
   public SimpleStaticServer() {
   }

   public static void main(String[] var0) throws Exception {
      short var1 = 8000;
      String var2 = (new File("..")).getCanonicalPath();
      HttpServer var3 = HttpServer.create(new InetSocketAddress(var1), 0);
      var3.createContext("/", new SimpleStaticServer$StaticFileHandler(var2));
      var3.setExecutor((Executor)null);
      var3.start();
      System.out.println("Server avviato su http://localhost:" + var1);
      if (Desktop.isDesktopSupported()) {
         Desktop.getDesktop().browse(new URI("http://localhost:" + var1 + "/html/pages/index.html"));
      } else {
         System.out.println("Impossibile aprire il browser automaticamente.");
      }

   }

    public static class SimpleStaticServer$StaticFileHandler implements HttpHandler {
        private final String rootDir;

        public SimpleStaticServer$StaticFileHandler(String var1) {
            this.rootDir = var1;
        }

        public void handle(HttpExchange var1) throws IOException {
            String var2 = var1.getRequestURI().getPath();
            File var3 = (new File(this.rootDir, var2)).getCanonicalFile();
        
            if (!var3.getPath().startsWith((new File(this.rootDir)).getCanonicalPath())) {
                this.send404(var1);
            } else {
                if (var3.isDirectory()) {
                    var3 = new File(var3, "index.html");
                }
        
                if (var3.exists() && var3.isFile()) {
                    String var4 = Files.probeContentType(var3.toPath());
                    
                    // Fallback per i tipi MIME
                    if (var4 == null) {
                        String fileName = var3.getName();
                        if (fileName.endsWith(".html")) {
                            var4 = "text/html";
                        } else if (fileName.endsWith(".css")) {
                            var4 = "text/css";
                        } else if (fileName.endsWith(".js")) {
                            var4 = "application/javascript";
                        } else if (fileName.endsWith(".png")) {
                            var4 = "image/png";
                        } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
                            var4 = "image/jpeg";
                        } else if (fileName.endsWith(".gif")) {
                            var4 = "image/gif";
                        } else if (fileName.endsWith(".svg")) {
                            var4 = "image/svg+xml";
                        } else {
                            var4 = "application/octet-stream"; // Default MIME type
                        }
                    }
        
                    var1.getResponseHeaders().add("Content-Type", var4);
                    var1.sendResponseHeaders(200, var3.length());
                    OutputStream var5 = var1.getResponseBody();
        
                    try {
                        FileInputStream var6 = new FileInputStream(var3);
        
                        try {
                            byte[] var7 = new byte[8192];
        
                            int var8;
                            while ((var8 = var6.read(var7)) != -1) {
                                var5.write(var7, 0, var8);
                            }
                        } catch (Throwable var11) {
                            try {
                                var6.close();
                            } catch (Throwable var10) {
                                var11.addSuppressed(var10);
                            }
        
                            throw var11;
                        }
        
                        var6.close();
                    } catch (Throwable var12) {
                        if (var5 != null) {
                            try {
                                var5.close();
                            } catch (Throwable var9) {
                                var12.addSuppressed(var9);
                            }
                        }
        
                        throw var12;
                    }
        
                    if (var5 != null) {
                        var5.close();
                    }
        
                } else {
                    this.send404(var1);
                }
            }
        }

        private void send404(HttpExchange var1) throws IOException {
            String var2 = "404 Not Found";
            var1.sendResponseHeaders(404, (long)var2.length());
            OutputStream var3 = var1.getResponseBody();

            try {
                var3.write(var2.getBytes());
            } catch (Throwable var7) {
                if (var3 != null) {
                    try {
                    var3.close();
                    } catch (Throwable var6) {
                    var7.addSuppressed(var6);
                    }
                }

                throw var7;
            }

            if (var3 != null) {
                var3.close();
            }

        }
    }
}