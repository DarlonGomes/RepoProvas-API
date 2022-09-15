import Joi from "joi";

export const request = Joi.object({
    name: Joi.string().min(1).required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().integer().min(1).required(),
    teacherDisciplineId: Joi.number().integer().min(1).required(),
})