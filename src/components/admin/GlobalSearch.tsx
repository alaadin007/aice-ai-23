import React, { useState } from 'react';
import { Search, User, Users, Clock, ChevronRight } from 'lucide-react';

interface SearchResult {
  type: 'user' | 'team';
  id: string;
  name: string;
  subtitle: string;
  lastActive: string;
  photoUrl?: string | null;
  meta?: {
    totalKIU?: number;
    memberCount?: number;
    verificationStatus?: boolean;
  };
}

const SAMPLE_RESULTS: SearchResult[] = [
  {
    type: 'user',
    id: '1',
    name: 'Sarah Johnson',
    subtitle: 'sarah@example.com',
    lastActive: '2 hours ago',
    meta: {
      totalKIU: 45,
      verificationStatus: true
    }
  },
  {
    type: 'team',
    id: '2',
    name: 'Harley Street Team',
    subtitle: 'Aesthetic Medicine',
    lastActive: '1 hour ago',
    meta: {
      memberCount: 12
    }
  }
];

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setShowResults(true);

    // Simulate API call
    setTimeout(() => {
      setResults(SAMPLE_RESULTS);
      setIsSearching(false);
    }, 1000);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowResults(true)}
            placeholder="Search users or teams..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </form>

      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 rounded-xl border border-zinc-800 shadow-xl z-50">
          {isSearching ? (
            <div className="p-4 text-center">
              <div className="inline-block w-6 h-6 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <button
                  key={result.id}
                  className="w-full px-4 py-3 hover:bg-zinc-800 flex items-center gap-4 transition-colors"
                >
                  {result.photoUrl ? (
                    <img
                      src={result.photoUrl}
                      alt={result.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                      {result.type === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Users className="w-5 h-5" />
                      )}
                    </div>
                  )}

                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{result.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-700 text-gray-300">
                        {result.type}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">{result.subtitle}</div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Clock className="w-4 h-4" />
                      {result.lastActive}
                    </div>
                    {result.meta && (
                      <div className="text-xs text-gray-500">
                        {result.type === 'user' ? (
                          `${result.meta.totalKIU} KIU Points`
                        ) : (
                          `${result.meta.memberCount} Members`
                        )}
                      </div>
                    )}
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          ) : query && (
            <div className="p-4 text-center text-gray-400">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}