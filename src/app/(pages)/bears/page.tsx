"use client";
import useBearStore from "@/lib/stores/BearStore";
import useGptStore from "@/lib/stores/GptStore";
import { Button } from "@mui/material";
import React from "react";

export default function bears() {
  const { bears } = useBearStore();
  const { count, increase, decrease } = useGptStore();

  const {increasePopulation, updateBears, pageCriteria, updatePage, updatePageOnly} = useBearStore();

  return (
    <React.Fragment>
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Count: {count}</h1>
      <button onClick={increase} style={{ marginRight: "10px" }}>
        Increase
      </button>
      <button onClick={decrease}>Decrease</button>
    </div>
    <div>
        <h1>Bears = {bears}</h1>
        <button onClick={increasePopulation}>More Bears</button>
        <Button onClick={() => updateBears(Math.random())}> More MUI Bears</Button>
    </div>

    <div>
        <h1>Page Criteria {JSON.stringify(pageCriteria)}</h1>
        <Button onClick={() => updatePageOnly(Math.random())}> page only  </Button>
    </div>
    </React.Fragment>
  );
}
