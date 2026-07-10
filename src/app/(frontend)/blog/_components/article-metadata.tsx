import Image from "next/image"
import type { Media } from "@/payload-types"

type ArticleMetadataProps = {
  data: {
    author: {
      avatar: Media | string
      name: string
      role: string
    }
    publishedAt: Date
    readTimeMins: number
  }
  intent: "card" | "post"
  className?: string
}

export function ArticleMetadata({
  data,
  intent,
  className,
}: ArticleMetadataProps) {
  const { author, publishedAt, readTimeMins } = data

  const avatarUrl =
    typeof author.avatar === "string"
      ? author.avatar
      : author.avatar.url ?? ""

  return (
    <div
      className={`mt-6 flex items-center justify-between ${className ?? ""}`}
    >
      <div className="flex items-center gap-3">
        {avatarUrl && (
          <Image
            src={avatarUrl}
            alt={`${author.name}'s avatar`}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}

        <div className="flex flex-col">
          <p className="text-sm font-semibold leading-tight">
            {author.name}
          </p>

          <p className="text-xs text-gray-500 leading-tight">
            {author.role}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <time
          dateTime={publishedAt.toISOString()}
          className="text-xs text-gray-500"
        >
          {publishedAt.toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>

        <p className="text-xs text-gray-500">
          {readTimeMins} minutes read
        </p>
      </div>
    </div>
  )
}