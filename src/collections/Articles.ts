import type { Article } from "@/payload-types"
import { convertLexicalToPlaintext } from "@payloadcms/richtext-lexical/plaintext"
import type { CollectionConfig, FieldHook } from "payload"
import { slugify } from "payload/shared"
import { STATUS_OPTIONS } from "@/app/(frontend)/blog/_components/constant"


const generateSlugHook: FieldHook<Article, string> = ({ value, data }) => {
  if (value) {
    return slugify(value.trim()) || ""
  }

  return slugify(data?.title?.trim() || "") || ""
}

const generateContentSummaryHook: FieldHook<Article, string> = ({
  value,
}) => {
  if (value) {
    return value.trim()
  }

  return ""
}
export const Articles: CollectionConfig = {
  slug: "articles",

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      hooks: {
        beforeValidate: [generateSlugHook],
      },
    },
    //{
      //name:"content",
      //type:"richText",
      //required: true,
    //},

    {
      name:"contentSummary",
      type:"textarea",
      required: true,
      hooks: {
        beforeValidate: [generateContentSummaryHook] 
      },
      
    },

    {
        name: "readTimeInMins",
        type: "number",
        defaultValue: 0,
        hooks: {
            beforeChange: [   //Virtual Field
                ({ siblingData }) => {
                    // ensure that data is not stored in Database
                    delete siblingData.readTimeInMins
                }
            ],
            afterRead: [
                ({ data }) => {
                    //data.content
                    const text= convertLexicalToPlaintext({ data: data?.content})
                    const wordsPerMinute =200
                    const words = text.trim().split(/\s+/).length
                    return Math.max(1, Math.ceil(words / wordsPerMinute)) // wpm
                },
            ],
        },

    },
    {
        name: "coverImage",
        type: "upload",
        relationTo: "media",
        required: true,
    },
    {
        name: "author",
        type: "relationship",
        relationTo: "article-authors",
        required: true,
    },
    {
        name: "status",
        type: "select",
        required: true,
        options: Object.values(STATUS_OPTIONS),
        defaultValue: STATUS_OPTIONS.DRAFT,
    },
     {
        name: "publishedAt",
        type: "date",
        required: true,
        admin: {
            condition: (data) => data?.status ===STATUS_OPTIONS.PUBLISHED,
            date: { pickerAppearance: "dayAndTime"},
        }
    },
  ],
}
