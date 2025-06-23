import TrendList from '../components/TrendList'

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Trends App</h1>
        <p className="text-lg text-muted-foreground mb-8">企業の技術コミュニティ影響力を定点観測</p>
        <TrendList />
      </div>
    </main>
  );
}