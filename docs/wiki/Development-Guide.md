# 開発ガイド

このページでは、Trendsプロジェクトの開発における規約・ガイドラインを説明します。

## 🏗️ プロジェクト構成

### Monorepo構造

このプロジェクトは **npm workspaces** を使用したTypeScript monorepoです：

```
trends/
├── apps/
│   ├── frontend/          # Next.js アプリケーション (ポート 3000)
│   └── backend/           # Hono API サーバー (ポート 3001)
└── packages/
    └── shared/            # 共有TypeScript型とユーティリティ
```

### 技術スタック詳細

#### フロントエンド
- **Next.js 14** - App Router使用
- **React 18** - 最新のReact機能を活用
- **TypeScript** - 型安全性の確保
- **shadcn/ui** - UIコンポーネントライブラリ
- **Tailwind CSS** - ユーティリティファーストCSS

#### バックエンド
- **Hono** - 軽量でモダンなWebフレームワーク
- **Node.js adapter** - Node.js環境での実行
- **TypeScript** - 型安全なAPI開発

#### 共有パッケージ
- **@shared/types** - フロントエンドとバックエンド間の型共有
- **共通ユーティリティ** - 両アプリで使用する関数

## 🛠️ 開発コマンド

### 基本コマンド

```bash
# 開発サーバー起動
npm run dev              # フロントエンド・バックエンド同時起動
npm run dev:frontend     # Next.js のみ (ポート 3000)
npm run dev:backend      # Hono サーバーのみ (ポート 3001)

# ビルド
npm run build            # 全ワークスペースのビルド
npm run build:frontend   # Next.js アプリのビルド
npm run build:backend    # Hono サーバーのビルド

# コード品質チェック
npm run lint             # ESLintによるコードチェック
npm run typecheck        # TypeScriptの型チェック
npm run test             # テスト実行 (実装時)
```

### ワークスペース別コマンド

```bash
# フロントエンドワークスペースでのコマンド実行
npm run dev -w apps/frontend

# バックエンドワークスペースでのコマンド実行  
npm run dev -w apps/backend

# 共有パッケージでのコマンド実行
npm run build -w packages/shared
```

## 📝 コーディング規約

### TypeScript

#### 型定義
- **共有型**: `packages/shared/src/types/` に定義
- **API型**: リクエスト・レスポンス型を明確に定義
- **コンポーネント型**: Props型を明示的に定義

```typescript
// 良い例
interface CompanyInfluenceProps {
  company: Company;
  metrics: DailyMetrics[];
  onCompanyClick: (companyId: string) => void;
}

// 避けるべき例
function CompanyInfluence(props: any) { ... }
```

#### インポート順序
```typescript
// 1. React/Next.js関連
import React from 'react';
import { NextPage } from 'next';

// 2. 外部ライブラリ
import { Hono } from 'hono';

// 3. 内部モジュール（絶対パス）
import { Company } from '@shared/types';

// 4. 相対パス
import './component.css';
```

### ファイル命名規則

#### フロントエンド
- **ページ**: `page.tsx` (App Router)
- **コンポーネント**: `PascalCase.tsx`
- **フック**: `useCamelCase.ts`
- **ユーティリティ**: `camelCase.ts`

#### バックエンド
- **ルート**: `camelCase.ts`
- **サービス**: `camelCase.ts`
- **ミドルウェア**: `camelCase.ts`
- **型**: `PascalCase.ts`

### Git規約

#### ブランチ命名
```bash
# 機能開発
feature/機能名

# バグ修正
fix/修正内容

# ドキュメント
docs/内容
```

#### コミットメッセージ
```bash
# 日本語でコミット（プロジェクト要件）
feat: ダッシュボード画面の実装
fix: API型エラーの修正
docs: READMEの更新
```

## 🔄 開発フロー

### 1. 機能開発

```bash
# 1. ブランチ作成
git checkout -b feature/新機能名

# 2. 開発・テスト
npm run dev
npm run typecheck
npm run lint

# 3. コミット・プッシュ
git add .
git commit -m "feat: 新機能の実装"
git push origin feature/新機能名

# 4. プルリクエスト作成
```

### 2. 型共有の開発

```bash
# 共有型の変更後は必ずビルド
npm run build:shared

# 各アプリで型チェック
npm run typecheck
```

## 🧪 テスト戦略

### テスト方針（実装予定）
- **Unit Test**: 個別関数・コンポーネントのテスト
- **Integration Test**: API・画面連携のテスト
- **E2E Test**: ユーザーシナリオのテスト

### テストファイル配置
```
apps/frontend/src/
├── components/
│   ├── CompanyCard.tsx
│   └── __tests__/
│       └── CompanyCard.test.tsx
```

## 🔌 API設計

### エンドポイント命名
- **RESTful** 設計に従う
- **日本語リソース** は英語で命名
- **バージョニング** は将来的に検討

### レスポンス形式
```typescript
// 成功レスポンス
{
  data: T;
  message?: string;
}

// エラーレスポンス  
{
  error: string;
  details?: any;
}
```

## 📚 開発参考資料

### 公式ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [Hono Documentation](https://hono.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### UI/UX
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**📞 質問・相談**: [Issues](https://github.com/rfdnxbro/trends/issues) または [Discussions](https://github.com/rfdnxbro/trends/discussions) でお気軽にどうぞ！