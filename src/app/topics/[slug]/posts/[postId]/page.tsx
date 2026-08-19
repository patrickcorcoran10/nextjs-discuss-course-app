import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import {Suspense} from 'react'
import PostShowLoading from "@/components/posts/post-show-loading";
// import {fetchCommentsByPostId} from '@/db/queries/comments'

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<div>Do Not Be Alarmed. I am showing the Suspense functionality on purpose. I have implemented a Skeleton feature for the comments section.</div>}>
        <PostShow postId={postId}/>
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <Suspense fallback={<PostShowLoading/>}>
        <CommentList postId={postId}/>
      </Suspense>
    </div>
  );
}
