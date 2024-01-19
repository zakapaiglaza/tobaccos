class ErrHandlerMiddle {
    handleErrors(err, req, res, next) {
        console.error(err);
        res.status(500).json({ err: 'Ошибка обработки запроса' });
    }
}

module.exports = ErrHandlerMiddle;