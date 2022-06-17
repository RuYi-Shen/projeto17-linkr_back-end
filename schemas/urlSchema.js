import joi from 'joi';

const urlSchema = joi.object({ 
    url: joi.string().required().pattern(/^[(http(s)?):\/\/(www\.)]/),
    text: joi.string()
});

export default urlSchema;