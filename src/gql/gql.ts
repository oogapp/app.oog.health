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
    "\n    query ImportedSocialVideos(\n        $first: Int\n        $last: Int\n        $before: Cursor\n        $after: Cursor\n        $where: ImportedVideoWhereInput\n    ) {\n        importedVideos(\n        first: $first\n        last: $last\n        before: $before\n        after: $after\n        where: $where\n        ) {\n        totalCount\n        pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n            hasPreviousPage\n        }\n        edges {\n            node {\n            id\n            bucket\n            storageKey\n            title\n            body\n            exportStatus\n            accountConnectionID\n            exportedVideo {\n                id\n                post {\n                id\n                }\n            }\n            }\n        }\n        }\n    }\n": types.ImportedSocialVideosDocument,
    "\n    mutation SendOTP($phone:String!) {\n        sendPhoneOTP(phone: $phone)\n    }\n": types.SendOtpDocument,
    "\n    mutation VerifyOTP($phone:String!,$otp:String!) {\n        verifyPhoneOTP(phone: $phone, otp: $otp) {\n            token\n        }\n    }\n": types.VerifyOtpDocument,
    "\n    mutation LoginWithOTP($token: String!) {\n        login(phoneVerificationToken: $token) {\n            token\n    user {\n        tenants {\n        id\n        name\n        default\n        }\n    }\n        }\n    }\n": types.LoginWithOtpDocument,
    "\n    query CurrentUser {\n        currentUser {\n        id\n        email\n        firstName\n        lastName\n        role\n        username\n        limitedRoles\n        credential\n        tenants {\n            id\n            name\n            default\n        }\n        profileImage {\n            url\n        }\n        avatar {\n            url\n            publicID\n        }\n        }\n    }\n": types.CurrentUserDocument,
    "\n    mutation CreateInstagramConnection($username: String!) {\n        createInstagramConnection(username: $username) {\n            id\n        }\n    }\n": types.CreateInstagramConnectionDocument,
    "\n    mutation CreateYoutubeConnection($username: String!) {\n        createYoutubeConnection(username: $username) {\n            id\n        }\n    }\n": types.CreateYoutubeConnectionDocument,
    "\n    query AccountConnections(\n        $first: Int\n        $last: Int\n        $before: Cursor\n        $after: Cursor\n        $where: AccountConnectionWhereInput\n    ) {\n        accountConnections(\n        first: $first\n        last: $last\n        before: $before\n        after: $after\n        where: $where\n        ) {\n        totalCount\n        pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n            hasPreviousPage\n        }\n        edges {\n            node {\n            id\n            type\n            username\n            connectionStatus\n            exportStatus\n            importStatus\n            profilePictureURL\n            totalPublished\n            totalIgnored\n\n            }\n        }\n        }\n    }\n": types.AccountConnectionsDocument,
    "\n    query ImportedVideo($id: ID!) {\n        node(id: $id) {\n        ... on ImportedVideo {\n            id\n            bucket\n            storageKey\n            title\n            body\n            exportStatus\n            accountConnectionID\n            exportedVideo {\n                id\n                post {\n                id\n                }\n            }\n        }\n        }\n    }\n": types.ImportedVideoDocument,
    "\n    query AccountConnection($id: ID!) {\n        node(id: $id) {\n        ... on AccountConnection {\n            id\n            type\n            username\n            connectionStatus\n            updatedAt\n            importStatus\n            exportStatus\n            profilePictureURL\n            totalPublished\n            totalIgnored\n        }\n        }\n    }\n": types.AccountConnectionDocument,
    "\n    mutation CreatePostFromImportedVideo($videoID: String!) {\n        createPostFromImportedVideo(videoID: $videoID) {\n        id\n        }\n    }\n": types.CreatePostFromImportedVideoDocument,
    "\n    mutation CreatePostsFromImportedVideos($accountConnectionID:Int!,$videoIDs: [String!]!) {\n        createPostsFromImportedVideos(accountConnectionID:$accountConnectionID,videoIDs: $videoIDs)\n    }\n": types.CreatePostsFromImportedVideosDocument,
    "\n    mutation RefreshInstagramConnection($id: Int!) {\n        refreshInstagramConnection(id: $id) {\n        id\n        }\n    }\n": types.RefreshInstagramConnectionDocument,
    "\n    mutation RefreshTiktokConnection($id: Int!) {\n        refreshTiktokConnection(id: $id) {\n        id\n        }\n    }\n": types.RefreshTiktokConnectionDocument,
    "\n    mutation RefreshYoutubeConnection($id: Int!) {\n        refreshYoutubeConnection(id: $id) {\n        id\n        }\n    }\n": types.RefreshYoutubeConnectionDocument,
    "\n    mutation CreatePostsFromConnection($id: ID!) {\n        createPostsFromConnection(id: $id)\n    }\n": types.CreatePostsFromConnectionDocument,
    "\n    mutation IgnoreVideos($accountConnectionID: Int!, $videoIDs: [String!]!) {\n        toggleIgnoreImportedVideos(accountConnectionID: $accountConnectionID, videoIDs: $videoIDs)\n    }\n": types.IgnoreVideosDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ImportedSocialVideos(\n        $first: Int\n        $last: Int\n        $before: Cursor\n        $after: Cursor\n        $where: ImportedVideoWhereInput\n    ) {\n        importedVideos(\n        first: $first\n        last: $last\n        before: $before\n        after: $after\n        where: $where\n        ) {\n        totalCount\n        pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n            hasPreviousPage\n        }\n        edges {\n            node {\n            id\n            bucket\n            storageKey\n            title\n            body\n            exportStatus\n            accountConnectionID\n            exportedVideo {\n                id\n                post {\n                id\n                }\n            }\n            }\n        }\n        }\n    }\n"): typeof import('./graphql').ImportedSocialVideosDocument;
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
export function graphql(source: "\n    query CurrentUser {\n        currentUser {\n        id\n        email\n        firstName\n        lastName\n        role\n        username\n        limitedRoles\n        credential\n        tenants {\n            id\n            name\n            default\n        }\n        profileImage {\n            url\n        }\n        avatar {\n            url\n            publicID\n        }\n        }\n    }\n"): typeof import('./graphql').CurrentUserDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateInstagramConnection($username: String!) {\n        createInstagramConnection(username: $username) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateInstagramConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateYoutubeConnection($username: String!) {\n        createYoutubeConnection(username: $username) {\n            id\n        }\n    }\n"): typeof import('./graphql').CreateYoutubeConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AccountConnections(\n        $first: Int\n        $last: Int\n        $before: Cursor\n        $after: Cursor\n        $where: AccountConnectionWhereInput\n    ) {\n        accountConnections(\n        first: $first\n        last: $last\n        before: $before\n        after: $after\n        where: $where\n        ) {\n        totalCount\n        pageInfo {\n            startCursor\n            endCursor\n            hasNextPage\n            hasPreviousPage\n        }\n        edges {\n            node {\n            id\n            type\n            username\n            connectionStatus\n            exportStatus\n            importStatus\n            profilePictureURL\n            totalPublished\n            totalIgnored\n\n            }\n        }\n        }\n    }\n"): typeof import('./graphql').AccountConnectionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ImportedVideo($id: ID!) {\n        node(id: $id) {\n        ... on ImportedVideo {\n            id\n            bucket\n            storageKey\n            title\n            body\n            exportStatus\n            accountConnectionID\n            exportedVideo {\n                id\n                post {\n                id\n                }\n            }\n        }\n        }\n    }\n"): typeof import('./graphql').ImportedVideoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query AccountConnection($id: ID!) {\n        node(id: $id) {\n        ... on AccountConnection {\n            id\n            type\n            username\n            connectionStatus\n            updatedAt\n            importStatus\n            exportStatus\n            profilePictureURL\n            totalPublished\n            totalIgnored\n        }\n        }\n    }\n"): typeof import('./graphql').AccountConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreatePostFromImportedVideo($videoID: String!) {\n        createPostFromImportedVideo(videoID: $videoID) {\n        id\n        }\n    }\n"): typeof import('./graphql').CreatePostFromImportedVideoDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreatePostsFromImportedVideos($accountConnectionID:Int!,$videoIDs: [String!]!) {\n        createPostsFromImportedVideos(accountConnectionID:$accountConnectionID,videoIDs: $videoIDs)\n    }\n"): typeof import('./graphql').CreatePostsFromImportedVideosDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RefreshInstagramConnection($id: Int!) {\n        refreshInstagramConnection(id: $id) {\n        id\n        }\n    }\n"): typeof import('./graphql').RefreshInstagramConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RefreshTiktokConnection($id: Int!) {\n        refreshTiktokConnection(id: $id) {\n        id\n        }\n    }\n"): typeof import('./graphql').RefreshTiktokConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation RefreshYoutubeConnection($id: Int!) {\n        refreshYoutubeConnection(id: $id) {\n        id\n        }\n    }\n"): typeof import('./graphql').RefreshYoutubeConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreatePostsFromConnection($id: ID!) {\n        createPostsFromConnection(id: $id)\n    }\n"): typeof import('./graphql').CreatePostsFromConnectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation IgnoreVideos($accountConnectionID: Int!, $videoIDs: [String!]!) {\n        toggleIgnoreImportedVideos(accountConnectionID: $accountConnectionID, videoIDs: $videoIDs)\n    }\n"): typeof import('./graphql').IgnoreVideosDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
