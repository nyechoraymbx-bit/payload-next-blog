import { getPublishedArticles } from "@/collections/fetchers"
import { ArticleCard } from "./_components/article-card"
import { Media } from "@/payload-types"

function relationIsObject<T>(
  relation: number | T
): relation is T {
  return typeof relation !== "number"
}

export default async function BlogIndexPage() {
  const articles = await getPublishedArticles()

  if (!articles.length) {
    return <p>No articles found</p>
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {articles.map((article) => {
        const {
          id,
          title,
          slug,
          contentSummary,
          coverImage,
          readTimeInMins,
          publishedAt,
          author,
        } = article

        if (!relationIsObject(coverImage)) {
          return null
        }

        if (!relationIsObject(author)) {
          return null
        }

        if (!relationIsObject(author.avatar)) {
          return null
        }

        return (
          <ArticleCard
            key={id}
            title={title}
            href={`/blog/${slug}`}
            summary={contentSummary}
            readTimeMins={readTimeInMins ?? 0}
            publishedAt={new Date(
              publishedAt ?? new Date()
            )}
            coverImage={coverImage as Media}
            author={{
              avatar: author.avatar as Media,
              name: author.name,
              role: author.role,
            }}
          />
        )
      })}
    </div>
  )
}