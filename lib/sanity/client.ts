import { createClient } from 'next-sanity';

// Sanity client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

// Helper function to fetch data with error handling
export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
}: {
  query: string;
  params?: Record<string, any>;
  revalidate?: number | false;
}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params, {
      next: {
        revalidate: revalidate === false ? false : revalidate,
      },
    });
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw new Error('Failed to fetch data from Sanity');
  }
}

// Helper function for preview mode
export async function sanityFetchWithDrafts<T>({
  query,
  params = {},
}: {
  query: string;
  params?: Record<string, any>;
}): Promise<T> {
  try {
    const result = await client.fetch<T>(
      query,
      params,
      {
        perspective: 'previewDrafts',
        useCdn: false,
      }
    );
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw new Error('Failed to fetch data from Sanity');
  }
}

// Helper function to get document count
export async function getDocumentCount(type: string): Promise<number> {
  try {
    return await client.fetch<number>(`count(*[_type == $type])`, { type });
  } catch (error) {
    console.error('Error getting document count:', error);
    return 0;
  }
}

// Helper function to check if document exists
export async function documentExists(id: string): Promise<boolean> {
  try {
    const result = await client.fetch<boolean>(`defined(*[_id == $id][0])`, { id });
    return result;
  } catch (error) {
    console.error('Error checking document existence:', error);
    return false;
  }
}
