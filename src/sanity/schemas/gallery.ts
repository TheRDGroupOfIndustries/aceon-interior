const gallerySchema= {
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: Rule => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required(),
    },
  ],
};
export default gallerySchema;
