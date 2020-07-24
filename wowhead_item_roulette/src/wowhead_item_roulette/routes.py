from starlette.routing import Route, Mount
from starlette.staticfiles import StaticFiles
from . import views, settings

static = StaticFiles(directory=str(settings.STATIC_DIR))

routes = [
    Route("/", views.index, name="index"),
    Route("/item_id/{item_id:int}/exists", views.item_id_exists, name="item_id_exists"),
    Route("/{locale}", views.index, name="index"),
    Mount("/statics", static, name="statics"),
]
