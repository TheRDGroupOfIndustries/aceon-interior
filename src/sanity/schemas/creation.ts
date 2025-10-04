// schemas/creation.js
export default {
  name: 'creation',
  title: 'Creation',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
   
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}