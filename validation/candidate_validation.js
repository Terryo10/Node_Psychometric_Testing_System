const Joi = require("@hapi/joi");

const candidateValidation = data => {

const schema = {
    name : Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email()
};
return Joi.validate(data,schema);

}
module.exports.candidateValidation = candidateValidation;

