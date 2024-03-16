import TableBody from "../common/table-body";
import TableHeader from "../common/table-header";

export default function TransactionsTable({ headers, transactions }) {
  return (
    <table align="center" className="table-auto hover:table-fixed">
      <TableHeader headers={headers} />
      <TableBody transactions={transactions} />
    </table>
  );
}
