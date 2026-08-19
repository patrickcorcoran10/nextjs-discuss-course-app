'use server'
import {z} from 'zod'
import {auth} from '@/auth'
import {Post} from '@prisma/client';
import {redirect} from 'next/navigation'
import {db} from '@/db'
import paths from '@/paths'
import {revalidatePath} from 'next/cache'

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})

interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[]
        _form?: string[]
    }
}

export async function createPost(
        formState:CreatePostFormState, 
        formData:FormData
    ): Promise<CreatePostFormState> 
{
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth();
    if (!session || !session?.user) {
        return {
            errors: {
                _form: ["You must be logged in to submit"]
            }
        }
    }
    console.log(session)
    let post: Post;

       try {
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                // userId: null,
                // topicId: null
            }
        })
    } catch(err:unknown) {
        if (err instanceof Error) {
            return {
                errors: {
                    _form:[
                        err.message
                    ]
                }
            }
        } else {
            return {
                errors: {
                _form: ["something went wrong"]
                }
            }
        }
    }
    revalidatePath('/')
    redirect(paths.topicShow(post.title))

    return {
        errors: {}
    }
    // todo: revalidate the topic show page
}