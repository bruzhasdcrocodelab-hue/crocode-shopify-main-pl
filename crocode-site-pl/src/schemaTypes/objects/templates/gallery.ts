export default {
  name: 'gallery',
  title: 'Галерея',
  type: 'object',
  fields: [
    {
      name: 'galleryImages',
      title: 'Array of gallery images',
      type: 'array',
      of: [
        {
          type: 'imageWithAlt',
          options: {
            hotspot: true, // Включает возможность кадрирования
          },
        },
      ],
      options: {
        layout: 'grid', // Отображение в виде сетки в студии
      },
    },
  ],
}