from starlette.templating import Jinja2Templates
from starlette.responses import JSONResponse
import requests
import untangle
import logging
from . import settings

templates = Jinja2Templates(directory=str(settings.TEMPLATES_DIR))


async def index(request):
    template = "index.html"
    context = {"request": request}
    return templates.TemplateResponse(template, context=context)


async def item_id_exists(request):
    # See if we have the requested itemId in the cache
    try:
        cached_item_id_status = settings.ITEM_ID_CACHE[
            request.path_params['item_id']
        ]
    except KeyError:
        cached_item_id_status = None
    # If so just return the result now
    # @TODO - A mechanism for cache expiry will need to be devised
    if cached_item_id_status is not None:
        logging.info(
            "memoized item id detected: {}, returning"
            .format(request.path_params['item_id'])
        )
        return JSONResponse({"exists": cached_item_id_status})

    # @TODO - Also accept subdomain as part of this request
    response = requests.get(
        "https://www.wowhead.com/item={}&xml"
        .format(request.path_params['item_id'])
    )
    xml = response.text
    logging.debug(xml)
    doc = untangle.parse(xml)

    # Attempt to get the error message
    try:
        item_id_error = doc.wowhead.error.cdata
    except Exception:
        item_id_error = None

    # Attempt to match the passed item_id to Wowhead's XML stream
    try:
        item_id_found = doc.wowhead.item.id == request.path_params['item_id']
    except Exception:
        item_id_found = False

    # Based on previous parsing determine whether or not item id exists
    if item_id_found:
        does_item_id_exist = True
    elif item_id_error is not None:
        does_item_id_exist = False
    else:
        does_item_id_exist = True

    # Memoize the result and then return
    settings.ITEM_ID_CACHE[request.path_params['item_id']] = does_item_id_exist
    return JSONResponse({"exists": does_item_id_exist})
