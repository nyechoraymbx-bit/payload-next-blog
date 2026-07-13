import Image from "next/image"
import { notFound } from "next/navigation"
export const dynamic = "force-dynamic"
import { getArticleBySlug } from "@/collections/fetchers"
import { ArticleMetadata } from "../_components/article-metadata"
import { RichText } from "@payloadcms/richtext-lexical/react"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  if (
  typeof article.coverImage === "number" ||
  typeof article.author === "number" ||
  !article.author ||
  typeof article.author.avatar === "number"
) {
  notFound()
}

  return (
    <article className="mx-auto max-w-4xl px-6 py-12">

      {/* Title */}

      <h1 className="mb-6 text-5xl font-bold leading-tight">
        {article.title}
      </h1>

      {/* Metadata */}

      <ArticleMetadata
        intent="post"
        className="mb-8"
        data={{
          author: {
            avatar: article.author.avatar,
            name: article.author.name,
            role: article.author.role,
          },
          publishedAt: new Date(article.publishedAt ?? article.createdAt),
          readTimeMins: article.readTimeInMins ?? 1,
        }}
      />

      {/* Cover */}

      {article.coverImage.url && (
        <Image
          src={article.coverImage.url}
          alt={article.title}
          width={1200}
          height={650}
          className="mb-10 h-[420px] w-full rounded-xl object-cover"
        />
      )}

      {/* Summary */}

      <p className="mb-8 text-lg leading-8 text-gray-400">
        {article.contentSummary}
      </p>

      {/* Placeholder until we render Lexical */}

      <div className="prose prose-lg dark:prose-invert max-w-none">
          <RichText data={article.content} />
      </div>
    </article>
  )
}