from starlette.responses import PlainTextResponse
from starlette.templating import Jinja2Templates
from starlette.responses import JSONResponse
import requests
import untangle
import logging
import json
from . import settings

templates = Jinja2Templates(directory=str(settings.TEMPLATES_DIR))

async def index(request):
    template = "index.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context=context)

async def item_id_exists(request):
    response = requests.get("https://www.wowhead.com/item={}&xml".format(request.path_params['item_id']))
    xml = response.text
    # logging.info(xml)    
    doc = untangle.parse(xml)
    # logging.info(doc)

    # Attempt to get the error message
    try:
        item_id_error = doc.wowhead.error.cdata
    except:
        item_id_error = None

    # Attempt to match the passed item_id to Wowhead's XML stream
    try:
        item_id_found = doc.wowhead.item.id == request.path_params['item_id']
    except:
        item_id_found = False

    # Based on previous parsing determine whether or not item id exists
    if item_id_found == True:
        does_item_id_exist = True
    elif item_id_error != None:
        does_item_id_exist = False
    else:
        does_item_id_exist = True

    return JSONResponse({"exists": does_item_id_exist})
