export function unhandledEndpoint(req, res){
    res.statusCode = 404;
    res.end(`The endpoint ${req.url} does not exist, check that the URL you entered is correct and try again.`);
}

export function unhandledHttpMethod(req, res){
    res.statusCode = 404;
    res.end(`The HTTP method ${req.method} is not handled. Please choose a different HTTP method and try again.`);
}