/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    mutation SendOTP($phone:String!) {\n        sendPhoneOTP(phone: $phone)\n    }\n": types.SendOtpDocument,
    "\n    mutation VerifyOTP($phone:String!,$otp:String!) {\n        verifyPhoneOTP(phone: $phone, otp: $otp) {\n            token\n        }\n    }\n": types.VerifyOtpDocument,
    "\n    mutation LoginWithOTP($token: String!) {\n        login(phoneVerificationToken: $token) {\n            token\n    user {\n        tenants {\n        id\n        name\n        default\n        }\n    }\n        }\n    }\n": types.LoginWithOtpDocument,
    "\n    query CurrentUser {\n        currentUser {\n        id\n        email\n        firstName\n        lastName\n        role\n        limitedRoles\n        tenants {\n            id\n            name\n            default\n        }\n        avatar {\n            url\n            publicID\n        }\n        }\n    }\n": types.CurrentUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation SendOTP($phone:String!) {\n        sendPhoneOTP(phone: $phone)\n    }\n"): typeof import('./graphql').SendOtpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation VerifyOTP($phone:String!,$otp:String!) {\n        verifyPhoneOTP(phone: $phone, otp: $otp) {\n            token\n        }\n    }\n"): typeof import('./graphql').VerifyOtpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation LoginWithOTP($token: String!) {\n        login(phoneVerificationToken: $token) {\n            token\n    user {\n        tenants {\n        id\n        name\n        default\n        }\n    }\n        }\n    }\n"): typeof import('./graphql').LoginWithOtpDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query CurrentUser {\n        currentUser {\n        id\n        email\n        firstName\n        lastName\n        role\n        limitedRoles\n        tenants {\n            id\n            name\n            default\n        }\n        avatar {\n            url\n            publicID\n        }\n        }\n    }\n"): typeof import('./graphql').CurrentUserDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
