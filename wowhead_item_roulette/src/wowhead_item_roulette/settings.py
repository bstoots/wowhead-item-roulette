from pathlib import Path

BASE_DIR = Path(__file__).parent.parent.parent

TEMPLATES_DIR = BASE_DIR / "templates"
STATIC_DIR = BASE_DIR / "statics"

# middleware configuration
SECRET = "qjO2K3W5DSGqqODE1eKv21TLENxX68C3vDeIwj1e"
HTTPS_ONLY = False

# temporary cache for item ids so we don't
# have to make so many requests to Wowhead
# @TODO - In a real application we would need to figure out cache expiry
# and would want to use a different data store.  But cool to know this
# works.
ITEM_ID_CACHE = {}
