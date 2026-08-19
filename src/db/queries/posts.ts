import type {Post} from '@prisma/client';
import {db} from '@/db'

export type PostWithData = (
    Post & {
    topic: {slug: string},
    _count: {comments: number},
    user: {name: string | null}
})

// export type PostWithData = Awaited<ReturnType<typeof fetchPostByTopicSlug>>[number]

export function fetchPostByTopicSlug(slug:string): Promise<PostWithData[]> {
    return db.post.findMany({
        where: {topic: {slug}},
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true}},
            _count: {select: {comments: true}}
        }
    })

}

export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        orderBy: [
            {
                comments: {
                    _count: "desc"
                }
            }
        ],
        include: {
            topic: {select: {slug: true}},
            user: {select: {name: true, image: true}},
            _count: {select: {comments: true}}
        },
        take: 8,
    })
}
