import React, { useState } from 'react';
import { X, Upload, Link2, Users, ChevronDown, ChevronRight, Edit2, Plus, Save, XCircle } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
}

interface Department {
  name: string;
  members: TeamMember[];
}

interface AssignKIUModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: TeamMember[];
  departments: Department[];
}

export function AssignKIUModal({ isOpen, onClose, team, departments: initialDepartments }: AssignKIUModalProps) {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [editingDepartment, setEditingDepartment] = useState<string | null>(null);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [showNewDepartment, setShowNewDepartment] = useState(false);
  const [contentType, setContentType] = useState<'upload' | 'link'>('upload');
  const [link, setLink] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleCreateDepartment = () => {
    if (newDepartmentName.trim()) {
      setDepartments([
        ...departments,
        { name: newDepartmentName.trim(), members: [] }
      ]);
      setNewDepartmentName('');
      setShowNewDepartment(false);
    }
  };

  const handleUpdateDepartment = (oldName: string, newName: string) => {
    if (newName.trim() && newName !== oldName) {
      setDepartments(departments.map(dept => 
        dept.name === oldName ? { ...dept, name: newName } : dept
      ));
    }
    setEditingDepartment(null);
  };

  const handleSelectAll = () => {
    const allMemberIds = team.map(m => m.id);
    const allSelected = allMemberIds.every(id => selectedMembers.includes(id));

    if (allSelected) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(allMemberIds);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle KIU assignment
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-2xl relative animate-fadeIn border border-zinc-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <h2 className="text-2xl font-bold mb-6">Assign KIU Content</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Group Management */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-300">
                Select Team Members
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewDepartment(true)}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Group
                </button>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  Select All
                </button>
              </div>
            </div>

            {/* New Group Form */}
            {showNewDepartment && (
              <div className="mb-4 p-4 bg-zinc-800 rounded-xl">
                <h4 className="text-sm font-medium text-white mb-3">Create New Group</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newDepartmentName}
                    onChange={(e) => setNewDepartmentName(e.target.value)}
                    placeholder="Enter group name"
                    className="flex-1 px-4 py-2 bg-zinc-700 border border-zinc-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCreateDepartment}
                    disabled={!newDepartmentName.trim()}
                    className="btn-primary whitespace-nowrap"
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewDepartment(false);
                      setNewDepartmentName('');
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Groups List */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {departments.map((department) => (
                <div key={department.name} className="bg-zinc-800 rounded-xl">
                  <div className="p-4 flex items-center justify-between">
                    {editingDepartment === department.name ? (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={newDepartmentName}
                          onChange={(e) => setNewDepartmentName(e.target.value)}
                          className="flex-1 px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateDepartment(department.name, newDepartmentName)}
                          className="p-2 hover:bg-zinc-600 rounded-lg"
                        >
                          <Save className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingDepartment(null)}
                          className="p-2 hover:bg-zinc-600 rounded-lg"
                        >
                          <XCircle className="w-4 h-4 text-red-400" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <h4 className="font-medium text-white">{department.name}</h4>
                          <p className="text-sm text-gray-400">
                            {department.members.length} members
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingDepartment(department.name);
                              setNewDepartmentName(department.name);
                            }}
                            className="p-2 hover:bg-zinc-700 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setExpandedDepartments(prev => 
                              prev.includes(department.name)
                                ? prev.filter(d => d !== department.name)
                                : [...prev, department.name]
                            )}
                            className="p-2 hover:bg-zinc-700 rounded-lg"
                          >
                            {expandedDepartments.includes(department.name) ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Group Members */}
                  {expandedDepartments.includes(department.name) && (
                    <div className="border-t border-zinc-700 p-4 space-y-2">
                      {department.members.map((member) => (
                        <label
                          key={member.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-zinc-700/50 cursor-pointer hover:bg-zinc-700"
                        >
                          <input
                            type="checkbox"
                            checked={selectedMembers.includes(member.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedMembers([...selectedMembers, member.id]);
                              } else {
                                setSelectedMembers(selectedMembers.filter(id => id !== member.id));
                              }
                            }}
                            className="w-4 h-4 rounded border-gray-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-800"
                          />
                          <div>
                            <div className="font-medium text-white">{member.name}</div>
                            <div className="text-sm text-gray-400">{member.role}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Content Type
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setContentType('upload')}
                className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 ${
                  contentType === 'upload'
                    ? 'bg-blue-500 text-white'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                }`}
              >
                <Upload className="w-5 h-5" />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setContentType('link')}
                className={`flex-1 p-4 rounded-xl flex items-center justify-center gap-2 ${
                  contentType === 'link'
                    ? 'bg-blue-500 text-white'
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                }`}
              >
                <Link2 className="w-5 h-5" />
                Add Link
              </button>
            </div>
          </div>

          {/* Content Input */}
          {contentType === 'link' ? (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Content Link
              </label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-blue-500 cursor-pointer transition-colors"
            >
              <Upload className="w-8 h-8 text-blue-500 mx-auto mb-3" />
              <p className="text-gray-400 mb-1">Drop files here or click to upload</p>
              <p className="text-sm text-gray-500">PDF, DOCX, or MP4 (max. 100MB)</p>
            </div>
          )}

          {/* Title and Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none mb-4"
            />

            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={selectedMembers.length === 0 || !title}
            >
              Assign KIU
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}