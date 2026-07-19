export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-200 bg-cream-100/50 px-4 py-8 text-center">
      {Icon && (
        <div className="rounded-full bg-forest-50 p-2.5 text-forest-500">
          <Icon className="h-5 w-5" />
        </div>
      )}
      <p className="text-sm font-semibold text-ink-800">{title}</p>
      {message && <p className="max-w-xs text-xs text-ink-500">{message}</p>}
      {action}
    </div>
  );
}
