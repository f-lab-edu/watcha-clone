export default function CommentLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
