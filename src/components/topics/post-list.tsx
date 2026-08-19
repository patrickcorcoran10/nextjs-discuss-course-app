import {db} from '@/db'

export default async function PostList() {
    const topics = await db.topic.findMany();
    console.log(topics)

    const renderedTopics;
    return <div>hi</div>
}