import React from 'react'

type ParsedElement = {
  type: 'paragraph' | 'list' | 'h2' | 'h3'
  content: string[]
}

const parseTextWithUnderline = (text: string, underlinedClassName?: string) => {
  const parts = text.split(/(__.*?__)/g)

  return parts.map((part, index) => {
    if (part.startsWith('__') && part.endsWith('__')) {
      const content = part.slice(2, -2)
      return (
        <span key={index} className={underlinedClassName}>
          {content}
        </span>
      )
    }
    return part
  })
}

export const parseTextContent = (text: string): ParsedElement[] => {
  if (!text) return []

  const lines = text.split('\n')
  const elements: ParsedElement[] = []
  let currentList: string[] = []
  let currentParagraph: string[] = []

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push({ type: 'paragraph', content: [currentParagraph.join(' ')] })
      currentParagraph = []
    }
  }

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push({ type: 'list', content: currentList })
      currentList = []
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (line === '') {
      flushParagraph()
      flushList()
      continue
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      elements.push({ type: 'h3', content: [line.substring(4).trim()] })
    } else if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      elements.push({ type: 'h2', content: [line.substring(3).trim()] })
    } else if (line.startsWith('* ')) {
      flushParagraph()
      currentList.push(line.substring(2).trim())
    } else {
      flushList()
      currentParagraph.push(line)
    }
  }

  flushParagraph()
  flushList()

  return elements
}

type RenderOptions = {
  paragraphClassName?: string
  h2ClassName?: string
  h3ClassName?: string
  listClassName?: string
  listItemClassName?: string
  underlinedClassName?: string
}

export const renderParsedContent = (
  text: string,
  options: RenderOptions = {}
): React.ReactNode => {
  const elements = parseTextContent(text)

  return elements.map((element, index) => {
    switch (element.type) {
      case 'h2':
        return (
          <h2 key={index} className={options.h2ClassName}>
            {parseTextWithUnderline(element.content[0], options.underlinedClassName)}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={index} className={options.h3ClassName}>
            {parseTextWithUnderline(element.content[0], options.underlinedClassName)}
          </h3>
        )
      case 'list':
        return (
          <ul key={index} className={options.listClassName}>
            {element.content.map((item, itemIndex) => (
              <li key={itemIndex} className={options.listItemClassName}>
                {parseTextWithUnderline(item, options.underlinedClassName)}
              </li>
            ))}
          </ul>
        )
      case 'paragraph':
      default:
        return (
          <p key={index} className={options.paragraphClassName}>
            {parseTextWithUnderline(element.content[0], options.underlinedClassName)}
          </p>
        )
    }
  })
}

export const splitTextIntoParagraphs = (text: string): string[] => {
  if (!text) return []
  return text.split('\n\n').map(p => p.trim()).filter(p => p.length > 0)
}
