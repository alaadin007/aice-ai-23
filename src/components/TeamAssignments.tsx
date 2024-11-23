import React, { useState } from 'react';
import { BookOpen, Users, CheckCircle, Clock, AlertCircle, Trash2, Mail, ChevronDown, Building } from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  totalAssigned: number;
  completed: number;
  status: 'active' | 'completed';
  kiuPoints: number;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (id: number) => void;
  onEmailResults: (id: number) => void;
}

interface DepartmentResults {
  name: string;
  totalMembers: number;
  completed: number;
  averageScore: number;
}

interface AssignmentResults {
  overall: {
    completed: number;
    averageScore: number;
  };
  byDepartment: DepartmentResults[];
}

const SAMPLE_ASSIGNMENTS: Assignment[] = [
  {
    id: 1,
    title: "Masseter Botox Treatment Update",
    description: "Complete the updated training module on Masseter Botox techniques and safety protocols.",
    assignedDate: "2024-02-15",
    dueDate: "2024-02-22",
    totalAssigned: 12,
    completed: 12,
    status: 'completed',
    kiuPoints: 1
  },
  {
    id: 2,
    title: "Patient Communication Workshop",
    description: "Review and complete the new patient communication guidelines and best practices.",
    assignedDate: "2024-02-18",
    dueDate: "2024-02-25",
    totalAssigned: 12,
    completed: 8,
    status: 'active',
    kiuPoints: 2
  }
];

const SAMPLE_RESULTS: Record<number, AssignmentResults> = {
  1: {
    overall: {
      completed: 12,
      averageScore: 92
    },
    byDepartment: [
      {
        name: "Aesthetics",
        totalMembers: 6,
        completed: 6,
        averageScore: 94
      },
      {
        name: "Dermatology",
        totalMembers: 4,
        completed: 4,
        averageScore: 90
      },
      {
        name: "General Practice",
        totalMembers: 2,
        completed: 2,
        averageScore: 88
      }
    ]
  }
};

function ResultsBreakdown({ results }: { results: AssignmentResults }) {
  return (
    <div className="mt-4 pt-4 border-t border-zinc-700">
      <div className="mb-4">
        <h5 className="text-sm font-medium text-gray-400 mb-2">Department Breakdown</h5>
        <div className="space-y-3">
          {results.byDepartment.map((dept, index) => (
            <div key={index} className="bg-zinc-900/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-white">{dept.name}</span>
                </div>
                <span className="text-sm text-gray-400">
                  {dept.completed}/{dept.totalMembers} completed
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${(dept.completed / dept.totalMembers) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-white">
                  {dept.averageScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AssignmentCard({ assignment, onDelete, onEmailResults }: AssignmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const results = SAMPLE_RESULTS[assignment.id];

  const completionPercentage = (assignment.completed / assignment.totalAssigned) * 100;

  return (
    <div className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
          <BookOpen className="w-6 h-6 text-blue-500" />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-white mb-1">{assignment.title}</h3>
              <p className="text-sm text-gray-400">{assignment.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEmailResults(assignment.id)}
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Mail className="w-5 h-5 text-gray-400" />
              </button>
              <button
                onClick={() => onDelete(assignment.id)}
                className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1 text-gray-400">
              <Users className="w-4 h-4" />
              {assignment.totalAssigned} assigned
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <Clock className="w-4 h-4" />
              Due {assignment.dueDate}
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <BookOpen className="w-4 h-4" />
              {assignment.kiuPoints} KIU
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                {assignment.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500" />
                )}
                <span className="text-gray-400">
                  {assignment.completed} of {assignment.totalAssigned} completed
                </span>
              </div>
              <span className="font-medium text-white">
                {completionPercentage.toFixed(0)}%
              </span>
            </div>

            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  assignment.status === 'completed'
                    ? 'bg-gradient-to-r from-green-500 to-green-400'
                    : 'bg-gradient-to-r from-yellow-500 to-yellow-400'
                }`}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {results && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 pt-4 border-t border-zinc-700 flex items-center justify-center gap-2 text-gray-400 hover:text-white"
        >
          {isExpanded ? 'Hide Details' : 'Show Details'}
          <ChevronDown className={`w-4 h-4 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      )}

      {isExpanded && results && (
        <ResultsBreakdown results={results} />
      )}
    </div>
  );
}

export function TeamAssignments() {
  const [assignments, setAssignments] = useState(SAMPLE_ASSIGNMENTS);

  const handleDelete = (id: number) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };

  const handleEmailResults = (id: number) => {
    // Implement email results functionality
    console.log('Emailing results for assignment:', id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Team Assignments</h2>
        <div className="text-sm text-gray-400">
          {assignments.length} active assignments
        </div>
      </div>

      <div className="space-y-4">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onDelete={handleDelete}
            onEmailResults={handleEmailResults}
          />
        ))}
      </div>
    </div>
  );
}