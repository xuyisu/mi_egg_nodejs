// utils/response.js

exports.successResponse = (data = null) => {
    return {
        code: 0,
        message: "处理成功",
        data: data
    };
};
exports.successResponse = (data = null, message = "处理成功") => {
    return {
        code: 0,
        message: message,
        data: data
    };
};

exports.errorResponse = (errorCode, errorMessage) => {
    return {
        code: errorCode,
        message: errorMessage,
        data: null
    };
};

exports.errorResponse = (errorMessage) => {
    return {
        code: 500,
        message: errorMessage,
        data: null
    };
};

exports.errorToken = (errorMessage) => {
    return {
        code: 401,
        message: errorMessage,
        data: null
    };
};