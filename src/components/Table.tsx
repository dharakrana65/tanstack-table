import {
  Cell,
  ColumnDef,
  Header,
  // createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
// import { makeData, Person } from './makeData'
import React, { CSSProperties } from "react";

// needed for table body level scope DnD setup
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

// needed for row & cell level scope DnD setup
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IssuePriority, IssueStatus, JiraIssue } from "../data/types";
import { issues } from "../data/data";
import "./Table.css";
import ColumnToggler from "./column-toggler/ColumnToggler";

const DraggableTableHeader = ({
  header,
}: {
  header: Header<JiraIssue, unknown>;
}) => {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: header.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <th colSpan={header.colSpan} ref={setNodeRef} style={style}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <button {...attributes} {...listeners}>
        🟰
      </button>
    </th>
  );
};

const DragAlongCell = ({ cell }: { cell: Cell<JiraIssue, unknown> }) => {
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    width: cell.column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <td style={style} ref={setNodeRef}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  );
};

// const columnHelper = createColumnHelper<JiraIssue>();
const getPriorityClass = (priority: IssuePriority) => {
  switch (priority) {
    case "High":
      return "tag bg-red-500/20 text-red-500";
    case "Medium":
      return "tag bg-yellow-500/20 text-yellow-500";
    case "Low":
      return "tag bg-green-500/20 text-green-500";
    default:
      return "tag bg-gray-500/20 text-gray-500";
  }
};

const getStatusClass = (status: string) => {
  switch (status) {
    case "Open":
      return "tag bg-blue-500/20 text-blue-500";
    case "In Progress":
      return "tag bg-purple-500/20 text-purple-500";
    case "Done":
      return "tag bg-green-500/20 text-green-500";
    case "Blocked":
      return "tag bg-red-500/20 text-red-500";
    default:
      return "tag bg-gray-500/20 text-gray-500";
  }
};

// const columns = [
//   columnHelper.accessor("id", {
//     header: "ID",
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("title", {
//     header: "Title",
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("description", {
//     header: "Description",
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("priority", {
//     header: "Priority",
//     cell: (info) => (
//       <span className={getPriorityClass(info.getValue() as IssuePriority)}>
//         {info.getValue() as IssuePriority}
//       </span>
//     ),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("status", {
//     header: "Status",
//     cell: (info) => (
//       <span className={getStatusClass(info.getValue() as string)}>
//         {info.getValue() as IssueStatus}
//       </span>
//     ),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("assignees", {
//     header: "Assignees",
//     cell: (info) => <span>{(info.getValue() as string[]).join(", ")}</span>,
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("reporter", {
//     header: "Reporter",
//     cell: (info) => info.getValue(),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
//   columnHelper.accessor("dueDate", {
//     header: "Due Date",
//     cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
//     footer: (info) => info.column.id,
//     size: 180,
//   }),
// ];

const JiraTable: React.FC = () => {
  const columns = React.useMemo<ColumnDef<JiraIssue>[]>(
    () => [
      {
        accessorKey: "id",
        cell: (info) => info.getValue(),
        header: "ID",
        id: "id",
        size: 180,
      },
      {
        accessorKey: "title",
        cell: (info) => info.getValue(),
        header: "Title",
        id: "title",
        size: 180,
      },
      {
        accessorKey: "description",
        cell: (info) => info.getValue(),
        header: "Description",
        id: "description",
        size: 180,
      },
      {
        accessorKey: "priority",
        cell: (info) => (
          <span className={getPriorityClass(info.getValue() as IssuePriority)}>
            {info.getValue() as IssuePriority}
          </span>
        ),
        header: "Priority",
        id: "priority",
        size: 180,
      },
      {
        accessorKey: "status",
        cell: (info) => (
          <span className={getStatusClass(info.getValue() as string)}>
            {info.getValue() as IssueStatus}
          </span>
        ),
        header: "Status",
        id: "status",
        size: 180,
      },
      {
        accessorKey: "assignees",
        cell: (info) => <span>{(info.getValue() as string[]).join(", ")}</span>,
        header: "Assignees",
        id: "assignees",
        size: 180,
      },
      {
        accessorKey: "reporter",
        cell: (info) => info.getValue(),
        header: "Reporter",
        id: "reporter",
        size: 180,
      },
      {
        accessorKey: "dueDate",
        cell: (info) => new Date(info.getValue() as Date).toLocaleDateString(),
        header: "Due Date",
        id: "dueDate",
        size: 180,
      },
    ],
    []
  );
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!)
  );
  const table = useReactTable({
    data: issues,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnOrder,
      columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });
  console.log(table.getHeaderGroups());
  console.log(table.getRowModel().rows);

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    // NOTE: This provider creates div elements, so don't nest inside of <table> elements
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <ColumnToggler table={table} />
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <SortableContext
                items={columnOrder}
                strategy={horizontalListSortingStrategy}
              >
                {headerGroup.headers.map((header) => (
                  <DraggableTableHeader key={header.id} header={header} />
                ))}
              </SortableContext>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <SortableContext
                  key={cell.id}
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  <DragAlongCell key={cell.id} cell={cell} />
                </SortableContext>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </DndContext>
  );
};

export default JiraTable;
