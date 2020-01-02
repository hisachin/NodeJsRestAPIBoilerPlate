const HttpCode = {
    "Bad_Request" : 400,
    "Unauthorized" : 401,
    "Payment_required" : 402,
    "Forbidden" : 403,
    "Not_Found" : 404,
    "Method_Not_Allowed" : 405,
    "Not_Acceptable" : 406,
    "Proxy_Authentication_Required" : 407,
    "Request_TimeOut" : 408,
    "Conflict" : 409,
    "Gone" : 410,
    "Unsupported_Media_Type" : 415,
    "Internal_Server_Error" : 500,
    "Not_Implemented" : 501,
    "Bad_Gateway" : 502,
    "Service_Unavailable" : 503,
    "Gateway_Timeout" : 504
}


module.exports = {
    HttpCode
}