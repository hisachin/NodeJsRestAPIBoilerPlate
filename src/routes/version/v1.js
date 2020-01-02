import express from 'express';

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('utils/api_docs');

import { 
    AuthController,
    UserController
} from 'modules/index';

let router = express.Router();

/**
 * Authentication Routes
 */

router.use('/docs',swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
router.use('/auth/', AuthController);
router.use('/users/', UserController);

module.exports = router;