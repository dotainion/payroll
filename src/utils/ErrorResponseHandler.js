export class ErrorResponseHandler{
    constructor(){

    }

    message(error){
        try{
            if(error?.response?.data?.error){
                return error.response.data.error.message;
            }
            if(typeof error === 'string' || error instanceof String){
                return error;
            }
            if(error?.response?.data){
                throw new Error('Response receive with incorrect error format.');
            }
            throw new Error('ErrorResponseHandler receive data and dont know what to do with it.');
        }catch(err){
            return err.message;
        }
    }

    meta(error){
        if(error?.response?.data?.error?.meta){
            return error.response.data.error.meta;
        }
        return null;
    }
}