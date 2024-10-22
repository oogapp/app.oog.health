import { graphql } from "@/gql";


export const ImportedVideosQuery = graphql(`
    query ImportedSocialVideos(
        $first: Int
        $last: Int
        $before: Cursor
        $after: Cursor
        $where: ImportedVideoWhereInput
    ) {
        importedVideos(
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
    }
`);
