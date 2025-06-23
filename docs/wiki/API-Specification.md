# API仕様

TrendsプロジェクトのAPI仕様について説明します。

## 🌐 ベースURL

- **開発環境**: `http://localhost:3001`
- **本番環境**: TBD

## 📌 現在実装済みのAPI

### ヘルスチェック

#### `GET /api/health`

サーバーの稼働状況を確認します。

**リクエスト例:**
```bash
curl http://localhost:3001/api/health
```

**レスポンス:**
```json
{
  "status": "ok"
}
```

### トレンドデータ取得

#### `GET /api/trends`

トレンドデータを取得します。

**リクエスト例:**
```bash
curl http://localhost:3001/api/trends
```

**レスポンス:**
```json
{
  "data": [
    {
      "id": "trend-1",
      "title": "記事タイトル",
      "url": "https://example.com/article",
      "source": "hatena|qiita|zenn",
      "company": "企業名",
      "publishedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

## 🚀 実装予定のAPI

### 企業関連API

#### `GET /api/companies`

企業一覧を取得します。

**クエリパラメータ:**
- `limit` (optional): 取得件数 (デフォルト: 50)
- `offset` (optional): オフセット (デフォルト: 0)
- `sort` (optional): ソート順 (`influence_desc`, `name_asc`)

**レスポンス例:**
```json
{
  "data": [
    {
      "id": "company-1",
      "name": "株式会社サンプル",
      "domain": "sample.co.jp",
      "totalInfluence": 150,
      "trendCount": 25,
      "lastActive": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 100,
    "limit": 50,
    "offset": 0
  }
}
```

#### `GET /api/companies/:id`

特定企業の詳細情報を取得します。

**パスパラメータ:**
- `id`: 企業ID

**レスポンス例:**
```json
{
  "data": {
    "id": "company-1",
    "name": "株式会社サンプル",
    "domain": "sample.co.jp",
    "totalInfluence": 150,
    "description": "企業説明",
    "founded": "2020-01-01",
    "employees": "100-500",
    "tags": ["TypeScript", "React", "Node.js"]
  }
}
```

#### `GET /api/companies/:id/metrics`

企業別メトリクス（時系列データ）を取得します。

**パスパラメータ:**
- `id`: 企業ID

**クエリパラメータ:**
- `period`: 期間 (`7d`, `30d`, `90d`, `1y`)
- `metrics`: メトリクス種別 (`influence`, `trends`, `engagement`)

**レスポンス例:**
```json
{
  "data": {
    "companyId": "company-1",
    "period": "30d",
    "metrics": [
      {
        "date": "2024-01-01",
        "influence": 12,
        "trendCount": 3,
        "engagement": 145
      }
    ]
  }
}
```

### トレンド分析API

#### `GET /api/trends/daily`

日別トレンド分析データを取得します。

**クエリパラメータ:**
- `date`: 対象日 (YYYY-MM-DD形式)
- `source`: データソース (`hatena`, `qiita`, `zenn`)

**レスポンス例:**
```json
{
  "data": {
    "date": "2024-01-01",
    "totalTrends": 50,
    "topCompanies": [
      {
        "companyId": "company-1",
        "name": "株式会社サンプル",
        "trendCount": 5,
        "influence": 25
      }
    ],
    "sourceBreakdown": {
      "hatena": 20,
      "qiita": 15,
      "zenn": 15
    }
  }
}
```

### ダッシュボードAPI

#### `GET /api/dashboard`

ダッシュボード表示用のサマリーデータを取得します。

**クエリパラメータ:**
- `period`: 集計期間 (`7d`, `30d`, `90d`)

**レスポンス例:**
```json
{
  "data": {
    "period": "30d",
    "summary": {
      "totalCompanies": 150,
      "totalTrends": 1200,
      "avgDailyTrends": 40
    },
    "topCompanies": [
      {
        "rank": 1,
        "companyId": "company-1",
        "name": "株式会社サンプル",
        "influence": 250,
        "change": "+15%"
      }
    ],
    "trendingSources": {
      "hatena": 450,
      "qiita": 400,
      "zenn": 350
    }
  }
}
```

## 🔒 認証・認可

### 現在の仕様
- **認証**: なし（開発段階）
- **レート制限**: なし（開発段階）

### 将来の実装予定
- **API Key認証**: 企業向けAPI利用時
- **JWT認証**: 管理画面アクセス時
- **レート制限**: IP別・API Key別の制限

## 🚨 エラーレスポンス

### エラー形式

```json
{
  "error": "エラーメッセージ",
  "code": "ERROR_CODE",
  "details": {
    "field": "エラー詳細"
  }
}
```

### HTTPステータスコード

| Status | 説明 |
|--------|------|
| 200 | 成功 |
| 400 | リクエストエラー |
| 401 | 認証エラー |
| 403 | 認可エラー |
| 404 | リソースが見つからない |
| 429 | レート制限に達した |
| 500 | サーバーエラー |

### エラーコード一覧

| Code | 説明 |
|------|------|
| `INVALID_PARAMETER` | パラメータが無効 |
| `COMPANY_NOT_FOUND` | 企業が見つからない |
| `DATA_NOT_AVAILABLE` | データが利用できない |
| `RATE_LIMIT_EXCEEDED` | レート制限超過 |

## 📚 データ型定義

### Company型
```typescript
interface Company {
  id: string;
  name: string;
  domain: string;
  totalInfluence: number;
  description?: string;
  founded?: string;
  employees?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### DailyMetrics型
```typescript
interface DailyMetrics {
  id: string;
  companyId: string;
  date: string;
  influence: number;
  trendCount: number;
  engagement: number;
  sourceBreakdown: {
    hatena: number;
    qiita: number;
    zenn: number;
  };
}
```

### Trend型
```typescript
interface Trend {
  id: string;
  title: string;
  url: string;
  source: 'hatena' | 'qiita' | 'zenn';
  companyId?: string;
  influence: number;
  publishedAt: string;
  collectedAt: string;
}
```

## 🔧 開発・テスト

### APIテスト

```bash
# ヘルスチェック
curl http://localhost:3001/api/health

# トレンドデータ取得
curl http://localhost:3001/api/trends
```

### Postmanコレクション

開発チーム向けにPostmanコレクションを提供予定です。

---

**📝 API更新情報**: このドキュメントは実装の進捗に応じて随時更新されます。