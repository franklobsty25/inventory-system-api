"use strict";
/**
 * @openapi
 * paths:
 *  /user:
 *    get:
 *      tags: [User]
 *      summary: User
 *      description: Get current user
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: User retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        401:
 *          description: Unauthorized
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          $ref: '#/components/responses/500Error'
 *
 *  /user/list:
 *    get:
 *      tags: [User]
 *      sumaary: List users
 *      description: Get all users
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Users retrieved successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  type: object
 *                  required:
 *                    - firstname
 *                    - lastname
 *                    - middlename
 *                    - email
 *                properties:
 *                  firstname:
 *                     type: string
 *                  lastname:
 *                     type: string
 *                  middlename:
 *                     type: string
 *                  email:
 *                     type: string
 *                example:
 *                  firstname: Frank
 *                  lastname: Kodie
 *                  middlename: Adu
 *                  email: frankkodie@yahoo.com
 *        400:
 *          description: Empty list
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        500:
 *          $ref: '#/components/responses/500Error'
 *
 *  /user/sign-up:
 *    post:
 *     tags: [User]
 *     summary: Sign up
 *     description: Create user account
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - firstname
 *                 - lastname
 *                 - email
 *                 - password
 *               properties:
 *                 firstname:
 *                   type: string
 *                   example: Frank
 *                 lastname:
 *                   type: string
 *                   example: Kodie
 *                 middlename:
 *                   type: string
 *                   example: Adu
 *                 email:
 *                   type: string
 *                   example: frankkodie@yahoo.com
 *                 password:
 *                   type: string
 *                   example: Frank25.!
 *                 repeatPassword:
 *                   type: string
 *                   example: Frank25.!
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       400:
 *          $ref: '#/components/responses/400Error'
 *       500:
 *         $ref: '#/components/responses/500Error'
 *
 *  /user/login:
 *    post:
 *      tags: [User]
 *      summary: Login
 *      description: User login account
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                 type: string
 *                 example: frankkodie@yahoo.com
 *                password:
 *                  type: string
 *                  example: Frank25.!
 *      responses:
 *         200:
 *           description: User logged in successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         400:
 *           description: User not found
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         401:
 *           description: Password invalid
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *         500:
 *           $ref: '#/components/responses/500Error'
 *
 *  /{user}/change-password:
 *    put:
 *      tags: [User]
 *      summary: Change password
 *      description: Change user password
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - name: user
 *          in: path
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                oldPassword:
 *                  type: string
 *                newPassword:
 *                  type: string
 *                repeatPassword:
 *                  type: string
 *              required:
 *                - oldPassword
 *                - newPassword
 *                - repeatPassword
 *              example:
 *                oldPassword: Frank25.!
 *                newPassword: Frank25!!&
 *                repeatPassword: Frank25!!%
 *      responses:
 *         200:
 *           description: User password changed successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                    type: string
 *         400:
 *           $ref: '#/components/responses/400Error'
 *         500:
 *           $ref: '#/components/responses/500Error'
 *
 *  /user/reset:
 *    put:
 *      tags: [User]
 *      summary: Reset password
 *      description: Reset user password
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                repeatPassword:
 *                  type: string
 *              example:
 *                email: frankkodie@yahoo.com
 *                password: 8702fg955182
 *                repeatPassword: 8702fg955182
 *      responses:
 *        200:
 *          description: User password reset successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *        400:
 *          $ref: '#/components/responses/400Error'
 *        500:
 *          $ref: '#/components/responses/500Error'
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * components:
 *   securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *
 *   schemas:
 *     User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 65797f7d72e45a094b2db249
 *        firstname:
 *          type: string
 *          example: Frank
 *        lastname:
 *          type: string
 *          example: Kodie
 *        middlename:
 *          type: string
 *          example: Adu
 *        email:
 *          type: string
 *          example: frankkodie@yahoo.com
 *
 * # Properties that are required
 *      required:
 *        - firstname
 *        - lastname
 *        - email
 *        - password
 *
 *   parameters:
 *     PerPage:
 *       name: page
 *       in: query
 *       description: Initial page number
 *       schema:
 *         type: integer
 *
 *     PageLimit:
 *       name: limit
 *       in: query
 *       description: Limits the number of items on a page
 *       schema:
 *         type: integer
 *
 *     Searches:
 *       name: search
 *       in: query
 *       description: Searching for items on a page
 *       schema:
 *         type: string
 *
 *     Pagination:
 *       name: all
 *       in: query
 *       description: Paginating items on a page
 *
 *
 *   responses:
 *     400Error:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *     500Error:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *
 *
 *
 * security:
 *   - bearerAuth: []
 *
 *
 *
 *
 */
