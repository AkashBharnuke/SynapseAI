const sendEvent = (res, event, data) => {
    res.write(`event: ${event}\n`);

    res.write(`data: ${JSON.stringify(data)}\n\n`);
}


const closeStream = (res) => { res.end(); }

export { sendEvent, closeStream }