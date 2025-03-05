#!/usr/bin/env python3
"""
Simple HTTP Server for the UN-FAO GitHub Pages website.
Run this script to serve the website locally.
"""

import http.server
import socketserver
import webbrowser
from pathlib import Path

# Set the port
PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler for serving the website."""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)

def main():
    """Run the server and open the browser."""
    print(f"Starting server at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    
    # Open browser automatically
    webbrowser.open(f"http://localhost:{PORT}")
    
    # Start server
    with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped by user")

if __name__ == "__main__":
    main() 