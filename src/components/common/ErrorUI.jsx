export default function ErrorUI({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 animate-fade-in">
      <div className="text-6xl mb-4">😞</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">
        {message || "We couldn't load the content. Please try again."}
      </p>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          Try Again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description, action, actionLabel }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4 animate-fade-in">
      <div className="text-6xl mb-4">🛍️</div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title || 'Nothing here yet'}</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">
        {description || "It looks like this section is empty."}
      </p>
      {action && (
        <button onClick={action} className="btn-primary">
          {actionLabel || 'Continue Shopping'}
        </button>
      )}
    </div>
  )
}
