import { getPayload } from "payload"
import config from "@/payload.config"
import { STATUS_OPTIONS } from "@/app/(frontend)/blog/_components/constant"

export async function getPublishedArticles() {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "articles",
    where: {
      status: {
        equals: STATUS_OPTIONS.PUBLISHED,
      },
    },
    depth: 2,
    sort: "-publishedAt",
  })

  return docs
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: "articles",
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  return docs[0] ?? null
}