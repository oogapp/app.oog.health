import { ImportedSocialVideosQuery, ImportedVideoWhereInput } from '@/gql/graphql';
import { cookies } from 'next/headers';
import { client } from './client';
import { ImportedVideosQuery } from './ImportedVideosQuery';

export async function getImportedVideos(id?:string) {
    let token = cookies().get('token')?.value
    let resp:ImportedSocialVideosQuery
    let where = {
        where: {
            hasAccountConnectionWith: [
                {
                    id: id
                }
            ]
        } as ImportedVideoWhereInput
    }
    if (!id) {
        where = {where:{} as ImportedVideoWhereInput}
    }


    resp = await client.request(ImportedVideosQuery.toString(),where,{
        authorization: `Bearer ${token}`
    });
    return resp;
}
