import { AjvValidator, Model } from 'objection';
import addFormats from 'ajv-formats';
import knex from 'knex';

import { knexConfig } from '../../knexfile.js';

const mode = process.env.NODE_ENV || 'development';
// const mode = 'production';

Model.knex(knex(knexConfig[mode]));

class BaseModel extends Model {
    static createValidator() {
        return new AjvValidator({
            onCreateAjv: (ajv) => {
                addFormats(ajv);
            },
            options: {
                allErrors: true,
                validateSchema: false,
                ownProperties: true,
                v5: true,
            },
        });
    }
}

export default BaseModel;
