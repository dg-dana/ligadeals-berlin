'use client'

import { useState, useEffect } from 'react'
import { getAllTestResults, resetTest } from '@/lib/ab-testing'

/**
 * A/B Test Dashboard Component
 *
 * Displays all A/B test results with impressions, conversions, and conversion rates
 */
export default function ABTestDashboard() {
  const [results, setResults] = useState<Record<string, Record<string, { impressions: number; conversions: number; conversionRate: number }>>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadResults()
  }, [])

  const loadResults = () => {
    const testResults = getAllTestResults()
    setResults(testResults)
  }

  const handleReset = (testId: string) => {
    if (confirm(`האם אתה בטוח שברצונך לאפס את הבדיקה "${testId}"?`)) {
      resetTest(testId)
      loadResults()
    }
  }

  if (!mounted) {
    return <div className="p-8">טוען...</div>
  }

  if (Object.keys(results).length === 0) {
    return (
      <div className="p-8 text-center" dir="rtl">
        <h2 className="text-2xl font-bold mb-4">לוח בקרה - בדיקות A/B</h2>
        <p className="text-gray-600 dark:text-gray-400">אין נתוני בדיקות זמינים</p>
      </div>
    )
  }

  return (
    <div className="w-full p-8" dir="rtl">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        לוח בקרה - בדיקות A/B
      </h2>

      <div className="space-y-8">
        {Object.entries(results).map(([testId, variants]) => {
          // Find winner (highest conversion rate)
          let winnerVariantId = ''
          let highestRate = 0

          Object.entries(variants).forEach(([variantId, stats]) => {
            if (stats.conversionRate > highestRate) {
              highestRate = stats.conversionRate
              winnerVariantId = variantId
            }
          })

          return (
            <div
              key={testId}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Test Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{testId}</h3>
                    <p className="text-blue-100">
                      סה"כ וריאציות: {Object.keys(variants).length}
                    </p>
                  </div>
                  <button
                    onClick={() => handleReset(testId)}
                    className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    אפס בדיקה
                  </button>
                </div>
              </div>

              {/* Variants Table */}
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-200 dark:border-gray-700">
                        <th className="text-right pb-3 font-semibold text-gray-700 dark:text-gray-300">
                          וריאציה
                        </th>
                        <th className="text-center pb-3 font-semibold text-gray-700 dark:text-gray-300">
                          הצגות
                        </th>
                        <th className="text-center pb-3 font-semibold text-gray-700 dark:text-gray-300">
                          המרות
                        </th>
                        <th className="text-center pb-3 font-semibold text-gray-700 dark:text-gray-300">
                          שיעור המרה
                        </th>
                        <th className="text-center pb-3 font-semibold text-gray-700 dark:text-gray-300">
                          סטטוס
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(variants).map(([variantId, stats]) => (
                        <tr
                          key={variantId}
                          className={`border-b border-gray-100 dark:border-gray-700 ${
                            variantId === winnerVariantId
                              ? 'bg-green-50 dark:bg-green-900/20'
                              : ''
                          }`}
                        >
                          <td className="py-4 text-right">
                            <span className="font-medium text-gray-900 dark:text-white">
                              {variantId}
                            </span>
                          </td>
                          <td className="py-4 text-center text-gray-600 dark:text-gray-400">
                            {stats.impressions}
                          </td>
                          <td className="py-4 text-center text-gray-600 dark:text-gray-400">
                            {stats.conversions}
                          </td>
                          <td className="py-4 text-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {stats.conversionRate.toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-4 text-center">
                            {variantId === winnerVariantId && highestRate > 0 && (
                              <span className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                מוביל
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Refresh Button */}
      <div className="mt-6 text-center">
        <button
          onClick={loadResults}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          רענן נתונים
        </button>
      </div>
    </div>
  )
}
