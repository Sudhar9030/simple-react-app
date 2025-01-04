'use client'
import { ApiResponse } from "@/types/ApiResponse";
import { Expense } from "@/types/Expense";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@mui/material";
import dayjs from "dayjs";
import { format } from "path";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import useTransactionsStore from "@/lib/stores/TransactionStore";

export default function TransactionList() {

  const {pageCriteria, setPageNumber, setLimit, transactions, totalCount} = useTransactionsStore();


  return (
    <div className="flex justify-center">
      {transactions && (
        <TableContainer component={Paper} className="max-w-screen-2xl">
          <Table size="small" aria-label="dense transaction table" color="primary">
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell align="right">Account</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                transactions.map((transaction, index) => (
                  <TableRow key={transaction.institutionName! + index}>
                    <TableCell>{transaction.expense}</TableCell>
                    <TableCell align="right">{transaction.institutionName}</TableCell>
                    <TableCell align="right">{dayjs(transaction.transactionDate).format('YYYY-MM-DD')}</TableCell>
                    <TableCell align="right">{transaction.type}</TableCell>
                    <TableCell align="right">{transaction.amount}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 100 }]}
                        colSpan={3}
                        count={totalCount || 0}
                        page={pageCriteria.page}
                        rowsPerPage={pageCriteria.limit}
                        onPageChange={(event: unknown, newPage: number) => setPageNumber(newPage)}
                        onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setLimit(+event.target.value)
                            setPageNumber(0)
                        }}
                    />
                </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
