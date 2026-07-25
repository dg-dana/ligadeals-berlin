import Image from 'next/image';
import type { PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/sanity.client';

export const articlePortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        <span className="relative my-8 block h-64 w-full overflow-hidden rounded-xl md:h-96">
          <Image
            src={urlFor(value).width(1200).height(800).url()}
            alt={value.alt || ''}
            fill
            className="object-cover"
          />
        </span>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h2 className="mb-4 mt-10 text-3xl font-bold text-navy-700 dark:text-white">{children}</h2>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-8 text-2xl font-bold text-navy-700 dark:text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-6 text-xl font-bold text-navy-700 dark:text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-2 mt-4 text-lg font-bold text-navy-700 dark:text-white">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-navy-700 dark:text-gray-300">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-r-4 border-gold-400 pr-4 text-lg italic text-navy-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pr-6 text-lg text-navy-700 dark:text-gray-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pr-6 text-lg text-navy-700 dark:text-gray-300">{children}</ol>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gold-800 underline hover:text-gold-900 dark:text-gold-400 dark:hover:text-gold-300"
      >
        {children}
      </a>
    ),
  },
};
