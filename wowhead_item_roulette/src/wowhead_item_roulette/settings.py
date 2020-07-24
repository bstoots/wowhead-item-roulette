from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent

TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "statics"

# middleware configuration
SECRET = "qjO2K3W5DSGqqODE1eKv21TLENxX68C3vDeIwj1e"
HTTPS_ONLY = False
