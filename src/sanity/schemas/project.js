import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  orderings: [
    {
      title: "Sort Order",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "projectId",
      title: "Project ID (URL slug)",
      type: "string",
      description:
        "The URL-safe identifier used in /projects/<id>. Changing this breaks existing links.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "index",
      title: "Index",
      type: "string",
      description:
        'Display index shown in headers. Use "001"-"012" for featured work or "ARCHIVE" for archive items.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number",
      description:
        "Controls the display order across both home and archive. Lower numbers appear first.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author / Publication",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Editorial", value: "Editorial" },
          { title: "Photography", value: "Photography" },
          { title: "Music", value: "Music" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "camera",
      title: "Camera",
      type: "string",
    }),
    defineField({
      name: "filmStock",
      title: "Film Stock",
      type: "string",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "The main thumbnail shown in grids and hero sections.",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description:
        "Full set of images shown on the project detail page, in display order.",
    }),
    defineField({
      name: "video",
      title: "Video",
      type: "file",
      options: { accept: "video/*" },
      description:
        "If set, the detail page shows a video player instead of the image gallery.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "index",
      media: "coverImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: `${subtitle} — ${title}`,
        media,
      };
    },
  },
});
