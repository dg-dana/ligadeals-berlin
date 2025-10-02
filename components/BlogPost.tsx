'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PortableText, PortableTextComponents } from '@portabletext/react'

export interface BlogPostProps {
  title: string
  heroImage: string
  date: string
  category: string
  readingTime: number
  content: any // Sanity Portable Text content
  relatedArticles?: {
    slug: string
    title: string
    thumbnail: string
    category: string
  }[]
}

export default function BlogPost({
  title,
  heroImage,
  date,
  category,
  readingTime,
  content,
  relatedArticles = []
}: BlogPostProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'copy') => {
    const encodedUrl = encodeURIComponent(shareUrl)
    const encodedTitle = encodeURIComponent(title)

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedTitle} ${encodedUrl}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        break
    }
  }

  // Custom components for Portable Text rendering with Hebrew typography
  const portableTextComponents: PortableTextComponents = {
    block: {
      h2: ({ children }) => (
        <h2 className="mt-8 mb-4 text-3xl font-bold text-gray-900 dark:text-white" dir="rtl">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-6 mb-3 text-2xl font-bold text-gray-900 dark:text-white" dir="rtl">
          {children}
        </h3>
      ),
      normal: ({ children }) => (
        <p className="mb-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300" dir="rtl">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-6 border-r-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pr-6 py-4 italic" dir="rtl">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 mr-8 list-disc space-y-2 text-gray-700 dark:text-gray-300" dir="rtl">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 mr-8 list-decimal space-y-2 text-gray-700 dark:text-gray-300" dir="rtl">
          {children}
        </ol>
      ),
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
        >
          {children}
        </a>
      ),
    },
  }

  return (
    <article className="w-full" dir="rtl">
      {/* Hero Image */}
      <div className="relative h-96 w-full overflow-hidden rounded-xl mb-8">
        <Image
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Header */}
      <div className="mb-8 space-y-4">
        {/* Category and Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span className="rounded-full bg-blue-100 dark:bg-blue-900 px-4 py-1 font-semibold text-blue-600 dark:text-blue-400">
            {category}
          </span>
          <time>
            {new Date(date).toLocaleDateString('he-IL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <span>·</span>
          <span>{readingTime} דקות קריאה</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          {title}
        </h1>

        {/* Social Share Buttons */}
        <div className="flex items-center gap-3 pt-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">שתף:</span>

          <button
            onClick={() => handleShare('whatsapp')}
            className="rounded-full bg-green-500 p-2 text-white transition-transform hover:scale-110"
            aria-label="שתף בוואטסאפ"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </button>

          <button
            onClick={() => handleShare('facebook')}
            className="rounded-full bg-blue-600 p-2 text-white transition-transform hover:scale-110"
            aria-label="שתף בפייסבוק"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>

          <button
            onClick={() => handleShare('copy')}
            className="relative rounded-full bg-gray-200 dark:bg-gray-700 p-2 text-gray-700 dark:text-gray-300 transition-transform hover:scale-110"
            aria-label="העתק קישור"
          >
            {copied ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <PortableText value={content} components={portableTextComponents} />
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            מאמרים קשורים
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg transition-shadow hover:shadow-xl"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="mb-2 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {article.category}
                  </div>
                  <h3 className="line-clamp-2 font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {article.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
