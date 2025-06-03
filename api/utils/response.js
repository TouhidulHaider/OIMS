export const createSuccess = (status, message, data = null) => {
    return {
        status,
        message,
        data
    };
};

export const createError = (status, message) => {
    return {
        status,
        message
    };
}; 