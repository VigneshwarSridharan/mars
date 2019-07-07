let bindRes = (error = false, data, res) => {
    let status = '';
    if (error) {
        status = 'error';
        data = data || error;
        res.json({ status, data });
    }
    else {
        status = 'success';
        res.json({ status, data });
    }
}

module.exports = bindRes;