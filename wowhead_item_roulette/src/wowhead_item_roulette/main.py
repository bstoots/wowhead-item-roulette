from starlette.applications import Starlette

from .routes import routes

# templates = Jinja2Templates(directory='templates')

# async def index(request):
#     return templates.TemplateResponse('index.html', {'request': request})

# routes = [
#     Route('/', endpoint=index),
#     Route('/en', endpoint=index),
#     Mount('/statics', StaticFiles(directory='statics'), name='statics'),
# ]

# app = Starlette(debug=True, routes=routes)

app = Starlette(routes=routes)
