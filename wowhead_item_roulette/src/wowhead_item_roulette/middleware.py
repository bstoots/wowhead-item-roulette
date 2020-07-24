from starlette.middleware import Middleware
from starlette.middleware.sessions import SessionMiddleware

from . import settings

middleware = [
    Middleware(SessionMiddleware, secret_key=settings.SECRET, https_only=settings.HTTPS_ONLY)
]
