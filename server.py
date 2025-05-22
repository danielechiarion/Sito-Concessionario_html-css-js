import os
import webbrowser
import socketserver
import http.server

# Port and directory configuration
PORT = 8000
DIRECTORY = os.path.abspath(os.path.dirname(__file__))

# Handler for static files
class MyHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        try:
            if self.path.endswith(".js"):
                self.send_response(200)
                self.send_header("Content-Type", "application/javascript")
                self.end_headers()
            else:
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
            with open(self.path[1:], "r", encoding="utf-8") as file:
                self.wfile.write(file.read().encode("utf-8"))
        except FileNotFoundError:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"<h1>404 - File non trovato</h1>")

# Start the server to the listening port
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server avviato su http://localhost:{PORT}")
        
    # Open the webpage
    webbrowser.open(f"http://localhost:{PORT}/html/pages/index.html")
        
    httpd.serve_forever()