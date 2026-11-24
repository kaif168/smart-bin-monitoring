import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

if __name__ == "__main__":
    print("=" * 60)
    print(" SMART WASTE BIN MONITORING SYSTEM (100% Software-Based)")
    print(" Monitor Waste. Manage Collections. Keep Cities Clean.")
    print("=" * 60)
    print(f" Serving project on: http://localhost:{PORT}")
    print(" Opening web application in your default browser...")
    print(" Press Ctrl+C to stop the server.")
    print("=" * 60)
    
    try:
        webbrowser.open(f"http://localhost:{PORT}")
    except Exception as e:
        print(f"Could not auto-open browser: {e}")
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
