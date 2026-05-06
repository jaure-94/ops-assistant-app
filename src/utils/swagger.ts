import type { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import logger from './logger.js';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ops Assistant API',
            version: '1.0.0',
        },
        components: {
            schemas: {
                Ticket: {
                    type: 'object',
                    required: ['title', 'description', 'user'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
                        title: {
                            type: 'string',
                            minLength: 5,
                            maxLength: 255,
                        },
                        description: {
                            type: 'string',
                        },
                        user: {
                            type: 'string',
                            format: 'email',
                        },
                        category: {
                            type: 'string',
                            nullable: true,
                        },
                        priority: {
                            type: 'string',
                            nullable: true,
                        },
                        suggested_response: {
                            type: 'string',
                            nullable: true,
                        },
                        status: {
                            type: 'string',
                            default: 'pending',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
                KnowledgeBase: {
                    type: 'object',
                    required: ['pattern', 'category', 'priority', 'suggested_response'],
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
                        pattern: {
                            type: 'string',
                        },
                        category: {
                            type: 'string',
                            enum: ['IT', 'HR', 'Access', 'Payroll', 'Other'],
                        },
                        priority: {
                            type: 'string',
                            enum: ['Low', 'Medium', 'High'],
                        },
                        suggested_response: {
                            type: 'string',
                        },
                        usage_count: {
                            type: 'integer',
                            default: 0,
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                    },
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    apis: ['./src/routes/*.ts'], // Path to the API route files
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in JSON format
    app.get('/api-docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    logger.info(`Swagger docs available at http://localhost:${port}/api-docs`);
}

export default swaggerDocs;