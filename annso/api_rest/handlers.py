#!env/python3
# coding: utf-8
import ipdb; 


import os
import json
import aiohttp
import aiohttp_jinja2
import datetime
import time


from aiohttp import web, MultiDict
from urllib.parse import parse_qsl

from config import *
from core import *






# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# COMMON TOOLS
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

def rest_success(response_data=None, pagination_data=None):
    """ 
        Build the REST success response that will encapsulate the given data (in python dictionary format)
        :param response_data:   The data to wrap in the JSON success response
        :param pagination_data: The data regarding the pagination
    """
    if response_data is None:
        results = {"success":True}
    else:
        results = {"success":True, "data":response_data}
    if pagination_data is not None:
        results.update(pagination_data)
    return web.json_response(results)



def rest_error(message:str="Unknow", code:str="0", error_id:str=""):
    """ 
        Build the REST error response
        :param message:         The short "friendly user" error message
        :param code:            The code of the error type
        :param error_id:        The id of the error, to return to the end-user. 
                                This code will allow admins to find in logs where exactly this error occure
    """
    results = {
        "success":      False, 
        "msg":          message, 
        "error_code":   code, 
        "error_url":    ERROR_ROOT_URL + code,
        "error_id":     error_id
    }
    return web.json_response(results)



def notify_all(src, msg):
    for ws in WebsocketHandler.socket_list:
        if src != ws[1]:
            ws[0].send_str(msg)







def process_generic_get(query_string, allowed_fields):
        # 1- retrieve query parameters
        get_params = MultiDict(parse_qsl(query_string))
        r_range  = get_params.get('range', "0-" + str(RANGE_DEFAULT))
        r_fields = get_params.get('fields', None)
        r_order  = get_params.get('order_by', None)
        r_sort   = get_params.get('order_sort', None)
        r_filter = get_params.get('filter', None)

        # 2- fields to extract
        fields = allowed_fields
        if r_fields is not None:
            fields = []
            for f in r_fields.split(','):
                f = f.strip().lower()
                if f in allowed_fields:
                    fields.append(f)
        if len(fields) == 0:
            return rest_error("No valid fields provided : " + get_params.get('fields'))

        # 3- Build json query for mongoengine
        query = {}
        if r_filter is not None:
            query = {"$or" : []}
            for k in fields:
                query["$or"].append({k : {'$regex': r_filter}})

        # 4- Order
        order = ['-create_date', "name"]
        if r_sort is not None and r_order is not None:
            r_sort = r_sort.split(',')
            r_order = r_order.split(',')
            if len(r_sort) == len(r_order):
                order = []
                for i in range(0, len(r_sort)):
                    f = r_sort[i].strip().lower()
                    if f in allowed_fields:
                        if r_order[i] == "desc":
                            f = "-" + f
                        order.append(f)
        order = tuple(order)

        # 5- limit
        r_range = r_range.split("-")
        offset=0
        limit=RANGE_DEFAULT
        try:
            offset = int(r_range[0])
            limit = int(r_range[1])
        except:
            return rest_error("No valid range provided : " + get_params.get('range') )

        # 6- Return processed data
        return fields, query, order, offset, limit










# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# MISC HANDLER
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
class WebsiteHandler:
    def __init__(self):
        pass

    @aiohttp_jinja2.template('home.html')
    def home(self, request):

        result = []
        sample_id = 0
        for r in db_engine.execute("SELECT s.name, sv.* FROM sample_variant_hg19 sv INNER JOIN sample s ON s.id = sv.sample_id"):
            result.append((r[1], r[0], r[3], r[4], r[5], r[6]))

        data = {
            "variants" : result
        }
        return data



    def get_config(self, request):
        return rest_success({})




    def get_db(self, request):
        return rest_success([])


 




# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# XXX HANDLER
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


class ReportHandler:

    async def get_omim_data(self, request):
        try:
            return rest_success(annso.report.get_omim_data(gene_name))
        except Exception as err:
            return rest_error("Unexpected error occured when trying to retrieve OMOM information for the gene : " + str(gene_name) + ". " + str(err))






class AnnotationDBHandler:
    def get_db(self, request):
        # Generic processing of the get query
        fields, query, order, offset, limit = process_generic_get(request.query_string, pirus.files.public_fields())
        # Get range meta data
        range_data = {
            "range_offset" : offset,
            "range_limit"  : limit,
            "range_total"  : pirus.files.total(),
            "range_max"    : RANGE_MAX,
        }
        # Return result of the query for PirusFile 
        return rest_success(pirus.files.get(fields, query, order, offset, limit, sub_level_loading), range_data)

    def get_db_details(self, request):
        # 1- Retrieve request parameters
        db_name = request.match_info.get('db_name', None)
        if db_name is None:
            return rest_error("No database name provided")

        return rest_success({"database" : db_name})






# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
# WEBSOCKET HANDLER
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
class WebsocketHandler:
    socket_list = []


    async def get(self, request):
        peername = request.transport.get_extra_info('peername')
        if peername is not None:
            host, port = peername

        ws_id = "{}:{}".format(host, port)
        ws = web.WebSocketResponse()
        await ws.prepare(request)

        print('WS connection open by', ws_id)
        WebsocketHandler.socket_list.append((ws, ws_id))
        msg = '{"action":"online_user", "data" : [' + ','.join(['"' + _ws[1] + '"' for _ws in WebsocketHandler.socket_list]) + ']}'
        notify_all(None, msg)

        try:
            async for msg in ws:
                if msg.tp == aiohttp.MsgType.text:
                    if msg.data == 'close':
                        print ('CLOSE MESSAGE RECEIVED')
                        await ws.close()
                    else:
                        # Analyse message sent by client and send response if needed
                        data = msg.json()
                        if data["action"] == "user_info":
                            print("WebsocketHandler", data["action"])
                            pass
                        elif msg.tp == aiohttp.MsgType.error:
                            print('ws connection closed with exception %s' % ws.exception())
        finally:
            print('WS connection closed for', ws_id)
            WebsocketHandler.socket_list.remove((ws, ws_id))

        return ws











async def on_shutdown(app):
    print("SHUTDOWN SERVER... CLOSE ALL")
    for ws in WebsocketHandler.socket_list:
        await ws[0].close(code=999, message='Server shutdown')