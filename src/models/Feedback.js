import BaseModel from './BaseModel.js';

class Feedback extends BaseModel {
    static get tableName() {
        return 'feedbacks';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['text'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1 },
                text: { type: 'string' },
                rating: { type: 'number' },
            },
        };
    }
}

export default Feedback;
