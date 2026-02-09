# dnd-kit サンプル実装

このプロジェクトは、[@dnd-kit](https://dndkit.com/)ライブラリを使用したドラッグ&ドロップ機能の実装サンプルです。基本的な実装とアクセシビリティに配慮した実装の2つのパターンを比較できます。

## デモ

🔗 **[https://dnd-kit-sample.vercel.app/](https://dnd-kit-sample.vercel.app/)**

## 特徴

### Basic版
- シンプルなドラッグ&ドロップ実装
- マウス操作とキーボード操作に対応
- リストアイテムの並び替えが可能

### Accessible版
- アクセシビリティに特化した実装
- スクリーンリーダー対応（日本語のアナウンス機能）
- 上下移動ボタンによるキーボード操作
- aria-labelによる適切なラベル付け
- ドラッグ操作の各段階での音声フィードバック
  - ドラッグ開始時
  - ドラッグ中の位置変更時
  - ドロップ時
  - キャンセル時

## 技術スタック

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** - ビルドツール
- **@dnd-kit** - ドラッグ&ドロップライブラリ
  - @dnd-kit/core
  - @dnd-kit/sortable
  - @dnd-kit/utilities
- **Tailwind CSS** - スタイリング
- **Font Awesome** - アイコン

## セットアップ

```bash
# 依存パッケージのインストール
pnpm install

# 開発サーバーの起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview
```

## プロジェクト構成

```
src/
├── components/
│   ├── TabContainer.tsx          # タブ切り替えコンテナ
│   ├── BasicDndList.tsx          # Basic版のDndContextラッパー
│   ├── AccessibleDndList.tsx     # Accessible版のDndContextラッパー
│   ├── BasicSortableList.tsx     # Basic版のリストコンポーネント
│   ├── AccessibleSortableList.tsx # Accessible版のリストコンポーネント
│   ├── BasicSortableItem.tsx     # Basic版のアイテムコンポーネント
│   └── AccessibleSortableItem.tsx # Accessible版のアイテムコンポーネント
├── types/
│   └── item.ts                   # DndItem型定義
├── App.tsx                       # アプリケーションルート
└── main.tsx                      # エントリーポイント
```

## 実装のポイント

### センサー設定
両実装とも以下のセンサーを使用：
- **MouseSensor**: マウス操作（5pxの移動で有効化）
- **KeyboardSensor**: キーボード操作（矢印キーでの移動）

### アクセシビリティ機能（Accessible版）
- スクリーンリーダー用の操作説明文
- ドラッグ操作の状態変化をリアルタイムでアナウンス
- 上下移動ボタンによる代替操作方法
- 最初/最後のアイテムでは対応するボタンを無効化
- ドラッグハンドルをbutton要素として実装し、フォーカス管理を適切に実装
