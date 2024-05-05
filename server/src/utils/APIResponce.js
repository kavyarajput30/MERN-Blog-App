class APIResponce{
    constructor(statusCode, message="Success", data, success,errors){
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.success = success;
        this.errors = errors;
    }
}

export default APIResponce;