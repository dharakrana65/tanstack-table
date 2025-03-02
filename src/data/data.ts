import { JiraIssue, IssueStatus, IssuePriority, IssueType } from "./types";

export const issues: JiraIssue[] = [
  {
    id: 1,
    title: "Fix login bug",
    description:
      "Users can't log in with Google OAuth after the latest update.",
    status: IssueStatus.OPEN,
    priority: IssuePriority.HIGH,
    type: IssueType.BUG,
    assignees: ["Alice", "Bob"],
    reporter: "John Doe",
    createdAt: new Date("2024-02-20"),
    dueDate: new Date("2024-03-01"),
    tags: ["Bug", "Authentication"],
    comments: [
      {
        user: "Alice",
        text: "Investigating the issue.",
        createdAt: new Date("2024-02-21"),
      },
      {
        user: "Bob",
        text: "Fix will be deployed soon.",
        createdAt: new Date("2024-02-22"),
      },
    ],
  },
  {
    id: 2,
    title: "Improve dashboard performance",
    description:
      "Optimize API calls and reduce load time on the main dashboard.",
    status: IssueStatus.IN_PROGRESS,
    priority: IssuePriority.MEDIUM,
    type: IssueType.TASK,
    assignees: ["Charlie"],
    reporter: "Jane Smith",
    createdAt: new Date("2024-02-18"),
    dueDate: new Date("2024-03-05"),
    tags: ["Performance", "Optimization"],
    comments: [
      {
        user: "Charlie",
        text: "Working on caching strategies.",
        createdAt: new Date("2024-02-19"),
      },
    ],
  },
  {
    id: 3,
    title: "Add dark mode feature",
    description: "Implement a dark mode toggle in user settings.",
    status: IssueStatus.DONE,
    priority: IssuePriority.LOW,
    type: IssueType.STORY,
    assignees: ["Emma"],
    reporter: "Mark Lee",
    createdAt: new Date("2024-02-10"),
    dueDate: new Date("2024-02-15"),
    tags: ["Feature", "UI"],
    comments: [
      {
        user: "Emma",
        text: "UI updated for dark mode.",
        createdAt: new Date("2024-02-12"),
      },
      {
        user: "Daniel",
        text: "Tested and deployed.",
        createdAt: new Date("2024-02-14"),
      },
    ],
  },
  {
    id: 4,
    title: "Update documentation",
    description: "Update the user manual with new features.",
    status: IssueStatus.OPEN,
    priority: IssuePriority.MEDIUM,
    type: IssueType.TASK,
    assignees: ["Frank", "Grace"],
    reporter: "Henry Johnson",
    createdAt: new Date("2024-02-05"),
    dueDate: new Date("2024-02-20"),
    tags: ["Documentation", "Updates"],
    comments: [
      {
        user: "XXXXX",
        text: "Working on the new section.",
        createdAt: new Date("2024-02-07"),
      },
      {
        user: "XXXXX",
        text: "Section completed.",
        createdAt: new Date("2024-02-10"),
      },
    ],
  },
  {
    id: 5,
    title: "Enhance error handling",
    description: "Improve error messages and logging for better user experience.",
    status: IssueStatus.IN_PROGRESS,
    priority: IssuePriority.HIGH,
    type: IssueType.BUG,
    assignees: ["Hannah", "Ivy"],
    reporter: "Jack Wilson",
    createdAt: new Date("2024-02-01"),
    dueDate: new Date("2024-02-15"),
    tags: ["Error Handling", "Improvement"],
    comments: [
      {
        user: "XXXXXX",
        text: "Working on the new error messages.",
        createdAt: new Date("2024-02-03"),
      },
      {
        user: "XXX",
        text: "Error messages updated.",
        createdAt: new Date("2024-02-05"),
      },
    ],
  },
  
];
