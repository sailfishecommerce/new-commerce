/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router'

export default function InvoiceTableBody({ tableInstance }: any) {
  const router = useRouter()

  const { getTableBodyProps, page, prepareRow } = tableInstance

  function viewInvoice(id: string) {
    router.push(`/admin/invoice/${id}`)
  }

  return (
    <>
      <tbody {...getTableBodyProps()}>
        {page.map((row: any, index: number) => {
          prepareRow(row)
          const rowOrderId = row.original.orderNumber
          return (
            <tr
              key={index}
              {...row.getRowProps()}
              onClick={() => viewInvoice(rowOrderId)}
            >
              {row.cells.map((cell: any, i: number) => {
                return (
                  <td key={i} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      <style jsx>{`
        tbody td {
          border: 1px solid #e5e5e6;
          text-align: center;
          padding: 10px;
        }
        tbody tr {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
