// Enum for Issue Status
export enum IssueStatus {
  OPEN = "Open",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}

// Enum for Priority Levels
export enum IssuePriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

// Enum for Issue Types
export enum IssueType {
  BUG = "Bug",
  TASK = "Task",
  STORY = "Story",
}

// Interface for Comments
export interface Comment {
  user: string;
  text: string;
  createdAt: Date;
}

// Interface for a Jira Issue
export interface JiraIssue {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  type: IssueType;
  assignees: string[]; 
  reporter: string;
  createdAt: Date;
  dueDate: Date;
  tags: string[];
  comments: Comment[];
}
