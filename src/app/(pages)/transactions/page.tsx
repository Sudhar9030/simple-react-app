"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { Expense } from "@/types/Expense";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { format } from "date-fns";
import { get } from "http";
import { useEffect, useState } from "react";

export default function Transactions() {
  const [transactions, setTransactions] = useState<{ transactions: Array<Expense>; totalCount: number } | null>();

  useEffect(() => {

    const basePath = process.env.NEXT_PUBLIC_WEBTROIT_BASE_URL

    const userId = process.env.NEXT_PUBLIC_DEFAULT_USER;

    type responseType = ApiResponse<{ transactions: Array<Expense>; totalCount: number }>;

    const controller = new AbortController();
    const response = axios.get<responseType>(`${basePath}/transactions/${userId}`, {
      params: {
        institutionName: "CIBC",
        statementStartDate: "2024-11-01",
        statementEndDate: "2024-11-30",
      },
      signal: controller.signal,
    });

    response
      .then((res) => {
        console.log(res.data.data);
        setTransactions(res.data.data!);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("Request Completed");
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h1>Trasactions Page</h1>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="dense transaction table" color="primary">
          <TableHead>
            <TableRow>
              <TableCell>Expense</TableCell>
              <TableCell align="right">Account</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {transactions &&
          transactions.transactions &&
          transactions.transactions.map((transaction, index) => (
            <TableRow key={transaction.institutionName!+index}>
              <TableCell>{transaction.expense}</TableCell>
              <TableCell align="right">{transaction.institutionName}</TableCell>
              <TableCell align="right">{format(transaction.transactionDate!, 'MM-dd-yyyy')}</TableCell>
              <TableCell align="right" >{transaction.amount}</TableCell>
            </TableRow>
          ))}
          </TableBody>

        </Table>

      </TableContainer>

        
    </div>
  );
}
