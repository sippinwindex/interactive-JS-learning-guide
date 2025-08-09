import sys
import os

# Add the src directory to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

# Import the Flask app
from app import app

# This is the entry point for Vercel
if __name__ == "__main__":
    app.run()