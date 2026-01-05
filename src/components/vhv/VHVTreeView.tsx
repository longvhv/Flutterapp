import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, File } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface VHVTreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: VHVTreeNode[];
  data?: any;
}

interface VHVTreeViewProps {
  data: VHVTreeNode[];
  onNodeClick?: (node: VHVTreeNode) => void;
  defaultExpanded?: string[];
  showIcons?: boolean;
  className?: string;
}

export const VHVTreeView: React.FC<VHVTreeViewProps> = ({
  data,
  onNodeClick,
  defaultExpanded = [],
  showIcons = true,
  className = '',
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(defaultExpanded));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const handleNodeClick = (node: VHVTreeNode) => {
    if (node.children && node.children.length > 0) {
      toggleNode(node.id);
    }
    setSelectedNode(node.id);
    onNodeClick?.(node);
  };

  const TreeNodeComponent: React.FC<{ node: VHVTreeNode; level: number }> = ({ node, level }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = selectedNode === node.id;

    const getIcon = () => {
      if (node.icon) return node.icon;
      if (!showIcons) return null;
      if (hasChildren) {
        return isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />;
      }
      return <File size={16} />;
    };

    return (
      <div>
        <button
          onClick={() => handleNodeClick(node)}
          className={`
            w-full flex items-center gap-2 px-3 py-2 text-left
            hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors rounded-lg
            ${isSelected ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}
          `}
          style={{ paddingLeft: `${level * 1.5 + 0.75}rem` }}
        >
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight size={16} />
            </motion.div>
          )}

          {!hasChildren && <div className="w-4 flex-shrink-0" />}

          {showIcons && (
            <span className={`flex-shrink-0 ${hasChildren ? 'text-yellow-500' : 'text-gray-400'}`}>
              {getIcon()}
            </span>
          )}

          <span className="flex-1 truncate text-sm font-medium">{node.label}</span>
        </button>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {node.children!.map((child) => (
                <TreeNodeComponent key={child.id} node={child} level={level + 1} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={`space-y-1 ${className}`}>
      {data.map((node) => (
        <TreeNodeComponent key={node.id} node={node} level={0} />
      ))}
    </div>
  );
};
