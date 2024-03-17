import { currency } from "@/app/utils/utils";

export default function TableBody({ transactions }) {
  function createRow(transaction) {
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let date = new Date(transaction.date);

    return (
      <tr key={transaction.id}>
        <td className="pr-4 pl-4" align="right">
          {date.toLocaleDateString("en-US", options)}
        </td>
        <td className="pr-4 pl-4" align="left">
          {transaction.description}
        </td>
        <td className="pr-4 pl-4" align="right">
          {currency.format(transaction.amount)}
        </td>
        <td className="pr-4 pl-4" align="right">
          {transaction.subcategoryId}
        </td>
      </tr>
    );
  }
  return <tbody>{transactions.map(createRow)}</tbody>;
}
