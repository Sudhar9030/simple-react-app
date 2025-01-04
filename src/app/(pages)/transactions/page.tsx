"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { Expense } from "@/types/Expense";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { format } from "date-fns";
import { get } from "http";
import { useEffect, useState } from "react";
import TransactionSearchForm, { TransactionSearchFormInput } from "./_components/TransactionSearchForm";
import TransactionList from "./_components/TransactionList";
import dayjs from "dayjs";
import useTransactionsStore from "@/lib/stores/TransactionStore";

export default function Transactions() {
  const { searchCriteria, pageCriteria, setTransactions, setTotalCount, setPageNumber } = useTransactionsStore();

  const basePath = process.env.NEXT_PUBLIC_WEBTROIT_BASE_URL;
  const userId = process.env.NEXT_PUBLIC_DEFAULT_USER;
  type responseType = ApiResponse<{ transactions: Array<Expense>; totalCount: number }>;

  useEffect(() => {
    console.log("*****************************");
    console.log(pageCriteria);

    const controller = new AbortController();
    try {
      if (searchCriteria) {
        const response = axios.get<responseType>(`${basePath}/transactions/${userId}`, {
          params: {
            institutionName: searchCriteria?.account,
            startDate: dayjs(searchCriteria?.startDate).format("YYYY-MM-DD"),
            endDate: dayjs(searchCriteria?.endDate).format("YYYY-MM-DD"),
            page: pageCriteria.page,
            limit: pageCriteria.limit,
          },
          signal: controller.signal,
        });

        response
          .then((res) => {
            console.log(res.data.data);
            setTransactions(res.data.data!.transactions);
            setTotalCount(res.data.data!.totalCount);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            console.log("Request Completed");
          });
      }
    } catch (err) {
      console.log(err);
    }

    return () => {
      controller.abort();
    };
  }, [searchCriteria, pageCriteria]);

  return (
    <div>
      <h1>Trasactions Page</h1>
      <TransactionSearchForm />
      <TransactionList />
    </div>
  );
}
