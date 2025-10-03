'use client'

import { useState, useCallback } from 'react'
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export interface Place {
  id: string
  name: string
  nameHebrew: string
  description: string
  latitude: number
  longitude: number
  category: 'restaurant' | 'cafe' | 'attraction' | 'shopping' | 'nightlife'
  address: string
  website?: string
  imageUrl?: string
}

interface BerlinMapProps {
  places: Place[]
  mapboxToken: string
  initialViewState?: {
    latitude: number
    longitude: number
    zoom: number
  }
}

const categoryColors: Record<Place['category'], string> = {
  restaurant: '#ef4444', // red
  cafe: '#f59e0b', // amber
  attraction: '#3b82f6', // blue
  shopping: '#8b5cf6', // purple
  nightlife: '#ec4899', // pink
}

const categoryIcons: Record<Place['category'], string> = {
  restaurant: '🍽️',
  cafe: '☕',
  attraction: '🏛️',
  shopping: '🛍️',
  nightlife: '🎉',
}

export default function BerlinMap({
  places,
  mapboxToken,
  initialViewState = {
    latitude: 52.52,
    longitude: 13.405,
    zoom: 12
  }
}: BerlinMapProps) {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'restaurant', label: 'מסעדות' },
    { id: 'cafe', label: 'בתי קפה' },
    { id: 'attraction', label: 'אטרקציות' },
    { id: 'shopping', label: 'קניות' },
    { id: 'nightlife', label: 'חיי לילה' },
  ]

  const filteredPlaces = selectedCategory === 'all'
    ? places
    : places.filter(place => place.category === selectedCategory)

  const handleMarkerClick = useCallback((place: Place) => {
    setSelectedPlace(place)
  }, [])

  return (
    <div className="w-full" dir="rtl">
      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-full px-6 py-2 font-semibold transition-all ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] w-full overflow-hidden rounded-xl shadow-2xl">
        <Map
          mapboxAccessToken={mapboxToken}
          initialViewState={initialViewState}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          attributionControl={false}
        >
          {/* Navigation Controls */}
          <NavigationControl position="top-left" />
          <FullscreenControl position="top-left" />

          {/* Markers */}
          {filteredPlaces.map((place) => (
            <Marker
              key={place.id}
              latitude={place.latitude}
              longitude={place.longitude}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                handleMarkerClick(place)
              }}
            >
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-lg transition-transform hover:scale-125"
                style={{
                  backgroundColor: categoryColors[place.category],
                  border: '3px solid white'
                }}
              >
                <span className="text-xl">{categoryIcons[place.category]}</span>
              </div>
            </Marker>
          ))}

          {/* Popup */}
          {selectedPlace && (
            <Popup
              latitude={selectedPlace.latitude}
              longitude={selectedPlace.longitude}
              onClose={() => setSelectedPlace(null)}
              closeButton={true}
              closeOnClick={false}
              anchor="top"
              className="min-w-[280px]"
            >
              <div className="p-2 text-right" dir="rtl">
                {selectedPlace.imageUrl && (
                  <img
                    src={selectedPlace.imageUrl}
                    alt={selectedPlace.nameHebrew}
                    className="mb-3 h-32 w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="mb-1 text-lg font-bold text-gray-900">
                  {selectedPlace.nameHebrew}
                </h3>
                <p className="mb-2 text-sm text-gray-600">
                  {selectedPlace.name}
                </p>
                <p className="mb-3 text-sm text-gray-700">
                  {selectedPlace.description}
                </p>
                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{selectedPlace.address}</span>
                </div>
                {selectedPlace.website && (
                  <a
                    href={selectedPlace.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    בקר באתר
                  </a>
                )}
              </div>
            </Popup>
          )}
        </Map>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        {Object.entries(categoryIcons).map(([category, icon]) => (
          <div key={category} className="flex items-center gap-2">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{
                backgroundColor: categoryColors[category as Place['category']],
                border: '2px solid white'
              }}
            >
              <span>{icon}</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {categories.find(c => c.id === category)?.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
