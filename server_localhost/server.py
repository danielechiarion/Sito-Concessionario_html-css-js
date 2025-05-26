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

# Start the server to the listening port
with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"Server avviato su http://localhost:{PORT}")
        
    # Open the webpage
    webbrowser.open(f"http://localhost:{PORT}/html/pages/index.html")
        
    httpd.serve_forever()