export default function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-center">
      <p className="font-medium text-gray-600">{title}</p>
      {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
    </div>
  );
}
