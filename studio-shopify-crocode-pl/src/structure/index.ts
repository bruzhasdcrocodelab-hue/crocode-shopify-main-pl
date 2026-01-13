// structure.ts
import { StructureResolver } from 'sanity/structure'
import { langList } from './templates/langList'
import mediaLibrary from './templates/mediaLibrary'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      langList(S, 'Project Categories', 'projectCategories'),
      langList(S, 'Projects', 'projects'),

      S.divider(),

      langList(S, 'Blogs', 'blogs'),
      
      S.divider(),

      mediaLibrary(S),

      // Остальные документы (если есть)
      ...S.documentTypeListItems().filter((item) => 
        item.getId() !== 'blogs' 
        && item.getId() !== 'projects' 
        && item.getId() !== 'projectCategories'
        && item.getId() !== 'sanity.imageAsset' // Исключаем медиа-ассеты из общего списка
        && item.getId() !== 'sanity.fileAsset'   // Исключаем файловые ассеты из общего списка
      ),
    ])