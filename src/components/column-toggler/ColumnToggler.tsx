import { Table } from "@tanstack/react-table";
import './ColumnToggler.css'
interface ColumnTogglerProps<TData> {
  table: Table<TData>;
}

const ColumnToggler = <TData,>({ table }: ColumnTogglerProps<TData>) => {
  return (
    <div className="column-toggler">
      <div className="toggle-all">
        <label >
          <input
            type="checkbox"
            checked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />
          Toggle All
        </label>
      </div>
      
      {table.getAllLeafColumns().map((column) => (
        <div key={column.id}className="toggle-all">
          <label>
            <input
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            {column.id}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ColumnToggler;
