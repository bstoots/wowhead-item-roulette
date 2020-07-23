from starlette.applications import Starlette
from starlette.applications import Starlette
from starlette.routing import Route, Mount
from starlette.templating import Jinja2Templates
from starlette.staticfiles import StaticFiles

templates = Jinja2Templates(directory='templates')

async def homepage(request):
    return templates.TemplateResponse('index.html', {'request': request})

routes = [
    Route('/', endpoint=homepage),
    Route('/en', endpoint=homepage),
    Mount('/static', StaticFiles(directory='static'), name='static')
]

app = Starlette(debug=True, routes=routes)
