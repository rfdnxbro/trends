'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'

// Vercel対応のため一時的に型定義をローカル配置
interface Trend {
  id: number
  title: string
  popularity: number
  source?: string
  tags?: string[]
  url?: string
}

interface TrendsResponse {
  trends: Trend[]
}

export default function TrendList() {
  const [trends, setTrends] = useState<TrendsResponse['trends']>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await fetch('/api/trends')
        if (!response.ok) {
          throw new Error('Failed to fetch trends')
        }
        const data = await response.json() as TrendsResponse
        setTrends(data.trends)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTrends()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <Card>
            <CardHeader>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-destructive/20">
        <CardContent className="pt-6">
          <p className="text-destructive">エラーが発生しました: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">トレンド情報</h2>
      {trends.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">トレンドデータがありません</p>
          </CardContent>
        </Card>
      ) : (
        trends.map((trend) => (
          <Card key={trend.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">{trend.title}</span>
                <Badge variant="secondary" className="ml-4">
                  人気度: {trend.popularity}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                {trend.source && (
                  <Badge variant="outline">
                    {trend.source}
                  </Badge>
                )}
                {trend.tags && trend.tags.length > 0 && (
                  <div className="flex space-x-1">
                    {trend.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              {trend.url && (
                <a 
                  href={trend.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline mt-2 block text-sm"
                >
                  記事を見る
                </a>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}