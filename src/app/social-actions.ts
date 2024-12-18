'use server'
import { graphql } from '@/gql';
import { AccountConnectionQuery, AccountConnectionsQuery, CreateInstagramConnectionMutation, CreatePostsFromConnectionMutation, CreateYoutubeConnectionMutation, ImportedVideoQuery } from '@/gql/graphql';
import { exportPostSchema } from '@/lib/schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { client } from './actions/client';

const CreateInstagramConnection = graphql(`
    mutation CreateInstagramConnection($username: String!) {
        createInstagramConnection(username: $username) {
            id
        }
    }
`)

const CreateYoutubeConnection = graphql(`
    mutation CreateYoutubeConnection($username: String!) {
        createYoutubeConnection(username: $username) {
            id
        }
    }
`)

const AccountConnections = graphql(`
    query AccountConnections(
        $first: Int
        $last: Int
        $before: Cursor
        $after: Cursor
        $where: AccountConnectionWhereInput
    ) {
        accountConnections(
        first: $first
        last: $last
        before: $before
        after: $after
        where: $where
        ) {
        totalCount
        pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
        }
        edges {
            node {
            id
            type
            username
            connectionStatus
            exportStatus
            importStatus
            profilePictureURL
            totalPublished
            totalIgnored

            }
        }
        }
    }
`)

const ImportedVideo = graphql(`
    query ImportedVideo($id: ID!) {
        node(id: $id) {
        ... on ImportedVideo {
            id
            bucket
            storageKey
            title
            body
            exportStatus
            accountConnectionID
            exportedVideo {
                id
                post {
                id
                }
            }
        }
        }
    }
`)


const AccountConnection = graphql(`
    query AccountConnection($id: ID!) {
        node(id: $id) {
        ... on AccountConnection {
            id
            type
            username
            connectionStatus
            updatedAt
            importStatus
            exportStatus
            profilePictureURL
            totalPublished
            totalIgnored
        }
        }
    }
`)

const CreatePostFromImportedVideo = graphql(`
    mutation CreatePostFromImportedVideo($videoID: String!) {
        createPostFromImportedVideo(videoID: $videoID) {
        id
        }
    }
`)

const CreatePostFromImportedVideos = graphql(`
    mutation CreatePostsFromImportedVideos($accountConnectionID:Int!,$videoIDs: [String!]!) {
        createPostsFromImportedVideos(accountConnectionID:$accountConnectionID,videoIDs: $videoIDs)
    }
`)

const RefreshInstagramConnection = graphql(`
    mutation RefreshInstagramConnection($id: Int!) {
        refreshInstagramConnection(id: $id) {
        id
        }
    }
`)

const RefreshTiktokConnection = graphql(`
    mutation RefreshTiktokConnection($id: Int!) {
        refreshTiktokConnection(id: $id) {
        id
        }
    }
`)

const RefreshYoutubeConnection = graphql(`
    mutation RefreshYoutubeConnection($id: Int!) {
        refreshYoutubeConnection(id: $id) {
        id
        }
    }
`)

const ExportAll = graphql(`
    mutation CreatePostsFromConnection($id: ID!) {
        createPostsFromConnection(id: $id)
    }
`)

const IgnoreVideos = graphql(`
    mutation IgnoreVideos($accountConnectionID: Int!, $videoIDs: [String!]!) {
        toggleIgnoreImportedVideos(accountConnectionID: $accountConnectionID, videoIDs: $videoIDs)
    }
`)


type FormResponse = {
    success: boolean,
    message: string
}

export async function ignoreVideos(id:string,ids:string[]) {
    let token = cookies().get('token')?.value
    let resp = await client.request(IgnoreVideos.toString(), {
        accountConnectionID: id,
        videoIDs: ids
    },{
        authorization: `Bearer ${token}`
    });
    return {
        success: true,
        message: 'Videos ignored successfully.',
    };
}

export async function createPostsFromImportedVideos(id:string,ids:string[]) {
    let token = cookies().get('token')?.value
    let resp = await client.request(CreatePostFromImportedVideos.toString(), {
        accountConnectionID: id,
        videoIDs: ids
    },{
        authorization: `Bearer ${token}`
    });
    return {
        success: true,
        message: 'Posts exported successfully.',
    };
}

export async function createPostFromImportedVideo(prevState:FormResponse,data: FormData) {
    let result = exportPostSchema.safeParse({
        videoID: data.get('videoID'),
        body: data.get('body'),
    })
    if(!result.success) {
        return {
            success: false,
            message: 'Please fill in all fields.',
        }
    }
    let token = cookies().get('token')?.value
    let resp = await client.request(CreatePostFromImportedVideo.toString(), {
        videoID: result.data.videoID,
        body: result.data.body
    },{
        authorization: `Bearer ${token}`
    });
    return {
        success: true,
        message: 'Post exported successfully.',
    };
}

export async function exportAll(id: string) {
    let resp:CreatePostsFromConnectionMutation;
    let token = cookies().get('token')?.value
    resp = await client.request(ExportAll.toString(),{id: id}, {
        authorization: `Bearer ${token}`
    });
    return resp;
}

export async function getAccountConnections() {
    let resp:AccountConnectionsQuery;
    let token = cookies().get('token')?.value
    resp = await client.request(AccountConnections.toString(),{}, {
        authorization: `Bearer ${token}`
    });
    return resp;
}

export async function getAccountConnection(id: string) {
    let token = cookies().get('token')?.value
    let resp:AccountConnectionQuery
    resp = await client.request(AccountConnection.toString(), { id: id },{
        authorization: `Bearer ${token}`
    });
    return resp;
}


export async function addConnection(prevState:any,data: FormData):Promise<any> {
    let network = data.get('network');
    if(network === 'instagram') {
        return createInstagramConnection(prevState,data)
    } else if(network === 'youtube') {
        return createYoutubeConnection(prevState,data)
    }
}

export async function createInstagramConnection(prevState:any,data: FormData):Promise<any> {
    let username = data.get('username');
    let token = cookies().get('token')?.value
    let resp:CreateInstagramConnectionMutation;
    let accountConnectionId;
    try {
        resp = await client.request(CreateInstagramConnection.toString(), { username: username },{
            authorization: `Bearer ${token}`
        });
        if(resp?.createInstagramConnection?.id)  {
            console.log(resp)
            accountConnectionId = resp.createInstagramConnection.id
        }
    } catch(e) {
        console.log(e)
    }

    if (!accountConnectionId) {
        return {
            errors: {
                username: 'An error occurred. Please try again.'
            }
        }
    }
    redirect(`/social/${accountConnectionId}`)
}

export async function createYoutubeConnection(prevState:any,data: FormData):Promise<any> {
    let username = data.get('username');
    let token = cookies().get('token')?.value
    let resp:CreateYoutubeConnectionMutation;
    let accountConnectionId;
    try {
        resp = await client.request(CreateYoutubeConnection.toString(), { username: username },{
            authorization: `Bearer ${token}`
        });
        if(resp?.createYoutubeConnection?.id)  {
            console.log(resp)
            accountConnectionId = resp.createYoutubeConnection.id
        }
    } catch(e) {
        console.log(e)
    }

    if (!accountConnectionId) {
        return {
            errors: {
                username: 'An error occurred. Please try again.'
            }
        }
    }
    redirect(`/social/${accountConnectionId}`)
}


export async function refreshInstagramConnection(id: string) {
    let token = cookies().get('token')?.value
    let resp = await client.request(RefreshInstagramConnection.toString(), { id: id },{
        authorization: `Bearer ${token}`
    });
    return resp;
}

export async function refreshTiktokConnection(id: string) {
    let token = cookies().get('token')?.value
    let resp = await client.request(RefreshTiktokConnection.toString(), { id: id },{
        authorization: `Bearer ${token}`
    });
    return resp;
}


export async function refreshYoutubeConnection(id: string) {
    let token = cookies().get('token')?.value
    let resp = await client.request(RefreshYoutubeConnection.toString(), { id: id },{
        authorization: `Bearer ${token}`
    });
    return resp;
}

export async function getImportedVideo(id: string) {
    let token = cookies().get('token')?.value
    let resp:ImportedVideoQuery
    resp = await client.request(ImportedVideo.toString(), { id: id },{
        authorization: `Bearer ${token}`
    });
    return resp;
}
