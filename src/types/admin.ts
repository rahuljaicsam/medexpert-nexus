export interface MetadataEntry {
  id: string;
  title: string;
  type: 'dataset' | 'project' | 'annotation';
  status: 'pending' | 'approved' | 'rejected' | 'flagged';
  submittedBy: string;
  submittedAt: string;
  lastModified: string;
  content: Record<string, any>;
}

export interface AdminAction {
  id: string;
  action: 'approve' | 'reject' | 'flag';
  performedBy: string;
  performedAt: string;
  targetId: string;
  notes?: string;
}

export interface AdminStats {
  totalPending: number;
  totalApproved: number;
  totalRejected: number;
  totalFlagged: number;
  recentActions: AdminAction[];
}
