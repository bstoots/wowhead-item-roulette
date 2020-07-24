from starlette.applications import Starlette

from .routes import routes
from .middleware import middleware

app = Starlette(
    routes=routes,
    middleware=middleware,
)
