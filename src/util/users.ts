import { Request, Response } from 'express';
import  Jwt  from "jsonwebtoken"


//Local File
import  {app}  from '../index'

/**
 * Extracts the user ID from the JWT token.
 * @param {string} token - The JWT token.
 * @returns {string} Returns the user ID.
 */
export const userIdToken = function (token: string): string{
    const {id} = Jwt.decode(token) as {id: string};
    return id;
};

/**
 * Checks if a new password is valid.
 * @param {string} password - The password to check.
 * @returns {boolean} Returns true if the password is valid, false otherwise.
 */

export const isPasswordValid = function(password: string): boolean {
    return(
        password.length >= 8 && 
        /\d/.test(password) &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[!@#$%^&(),.?":{}|<>]/.test(password)
    );
};
