import React, { useState } from 'react'
import { Card, Stack, Button, Flex, Text } from '@sanity/ui'

interface HebrewPreviewProps {
  document: {
    displayed: {
      title?: string
      slug?: { current?: string }
      excerpt?: string
      body?: any
      publishedAt?: string
      _type?: string
    }
  }
}

export function HebrewPreview({ document }: HebrewPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop')
  const { displayed } = document

  if (!displayed) {
    return (
      <Card padding={4}>
        <Text>אין תוכן לתצוגה מקדימה</Text>
      </Card>
    )
  }

  const previewUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const fullUrl = displayed.slug?.current
    ? `${previewUrl}/blog/${displayed.slug.current}?preview=true`
    : previewUrl

  return (
    <Stack space={3}>
      {/* View Mode Toggle */}
      <Card padding={3} tone="primary">
        <Flex gap={3} align="center" justify="space-between">
          <Text size={1} weight="semibold">תצוגה מקדימה</Text>
          <Flex gap={2}>
            <Button
              mode={viewMode === 'desktop' ? 'default' : 'ghost'}
              onClick={() => setViewMode('desktop')}
              text="שולחן עבודה"
              tone={viewMode === 'desktop' ? 'primary' : 'default'}
            />
            <Button
              mode={viewMode === 'mobile' ? 'default' : 'ghost'}
              onClick={() => setViewMode('mobile')}
              text="נייד"
              tone={viewMode === 'mobile' ? 'primary' : 'default'}
            />
          </Flex>
        </Flex>
      </Card>

      {/* Preview Frame */}
      <Card
        padding={0}
        style={{
          height: '800px',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          borderRadius: '4px'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#f5f5f5',
            padding: viewMode === 'mobile' ? '20px' : '0',
          }}
        >
          <iframe
            src={fullUrl}
            style={{
              width: viewMode === 'desktop' ? '100%' : '375px',
              height: '100%',
              border: 'none',
              backgroundColor: 'white',
              boxShadow: viewMode === 'mobile' ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
              direction: 'rtl',
            }}
            title="תצוגה מקדימה"
          />
        </div>
      </Card>

      {/* Preview Info */}
      <Card padding={3} tone="transparent">
        <Stack space={2}>
          <Text size={1} muted>
            <strong>כותרת:</strong> {displayed.title || 'ללא כותרת'}
          </Text>
          {displayed.slug?.current && (
            <Text size={1} muted>
              <strong>קישור:</strong> /blog/{displayed.slug.current}
            </Text>
          )}
          {displayed.publishedAt && (
            <Text size={1} muted>
              <strong>תאריך פרסום:</strong> {new Date(displayed.publishedAt).toLocaleDateString('he-IL')}
            </Text>
          )}
          <Text size={1} muted>
            <strong>סוג:</strong> {displayed._type === 'article' ? 'מאמר' : displayed._type === 'post' ? 'פוסט' : displayed._type}
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}

// Default export for Sanity preview component
export default HebrewPreview
