# Vercelデプロイ設定ガイド

## 1. Vercelプロジェクトの作成

### Web UI経由での設定
1. [Vercel Dashboard](https://vercel.com/dashboard)にアクセス
2. "New Project"をクリック
3. GitHubリポジトリ `rfdnxbro/trends` を選択
4. 以下の設定を入力：

### 推奨設定: monorepoルートデプロイ
```
Project Name: trends
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build:frontend
Output Directory: apps/frontend/.next
Install Command: npm install
Development Command: npm run dev:frontend
```

**重要**: 
- Root Directory: `./`（プロジェクトルート）
- monorepo workspace構造をそのまま活用
- フロントエンド・バックエンド統合デプロイ
- 設定がシンプルで直感的

### ESLint設定について
`next.config.js`でESLintビルドチェックを無効化済み：
```javascript
eslint: {
  ignoreDuringBuilds: true, // Vercelビルド時のみ無効化
}
```
- **開発時**: ESLintは有効（`npm run lint`で実行可能）
- **ビルド時**: ESLintエラーでビルド失敗を防ぐ

### 環境変数の設定
Vercel Dashboard > Project Settings > Environment Variables で以下を設定：

#### Production環境
```
NODE_ENV=production
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
CORS_ORIGIN=https://your-domain.vercel.app
```

#### Preview環境
```
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=/api
NEXT_PUBLIC_APP_URL=https://your-preview-domain.vercel.app
CORS_ORIGIN=https://your-preview-domain.vercel.app
```

#### Development環境
```
NODE_ENV=development
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:3000
```

## 2. GitHub Actions用のSecrets設定

GitHub Repository > Settings > Secrets and variables > Actions で以下を追加：

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### 値の取得方法

#### VERCEL_TOKEN
1. [Vercel Account Settings](https://vercel.com/account/tokens)
2. "Create Token"でアクセストークン作成

#### VERCEL_ORG_ID
```bash
npx vercel login
cd /path/to/trends
npx vercel link
cat .vercel/project.json
```

#### VERCEL_PROJECT_ID
同上の`.vercel/project.json`から取得

## 3. 自動デプロイの有効化

### GitHub連携設定
- Vercel Dashboard > Project Settings > Git
- "Connected Git Repository"が正しく設定されていることを確認
- Production Branch: `main`
- Preview Branch: すべてのブランチ

### デプロイトリガー
- `main`ブランチ → 本番環境に自動デプロイ
- プルリクエスト → プレビュー環境に自動デプロイ
- GitHub Actionsでビルド・テスト後にデプロイ実行

## 4. 確認項目

### デプロイ後の動作確認
- [ ] https://your-domain.vercel.app でフロントエンドが表示される
- [ ] https://your-domain.vercel.app/api/health でAPIが応答する
- [ ] https://your-domain.vercel.app/api/trends でデータが取得できる

### ログ確認
- Vercel Dashboard > Project > Functions でServerless Functions確認
- GitHub Actions > Actions タブでワークフロー実行確認

## 5. トラブルシューティング

### よくある問題
1. **Build Error**: `npm run build`が失敗
   - 型エラーを確認: `npm run typecheck`
   - 依存関係を確認: `npm ci`

2. **API Error**: `/api/*`が404
   - `apps/backend/api/[...route].ts`が正しく配置されているか確認
   - `vercel.json`のfunctions設定を確認

3. **CORS Error**: APIアクセスが失敗
   - 環境変数`CORS_ORIGIN`が正しく設定されているか確認
   - Vercelドメインが正しく登録されているか確認

### デバッグコマンド
```bash
# ローカルでVercel環境をテスト
npx vercel dev

# 本番ビルドをローカルでテスト  
npm run build
cd apps/frontend && npm start
```

## 6. 完了チェックリスト

- [ ] Vercelプロジェクト作成完了
- [ ] 環境変数設定完了
- [ ] GitHub Secrets設定完了
- [ ] 自動デプロイ動作確認
- [ ] API エンドポイント動作確認
- [ ] プレビューデプロイ動作確認