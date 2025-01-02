import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { Children, Fragment } from "react";

export default function NavBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 5px 10px 5px",
        }}
      >
        <div style={{width: '100px', height: '40px'}}>
          <img src="webtroit.svg" alt="webtroit" />
        </div>
        <div>
          <Button>
          <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button>
            <Link href="/transactions">History</Link>
          </Button>
          <Button>
            <Link href="/uploads">Uploads</Link>
          </Button>
        </div>
        <h4>User Profile</h4>
      </Stack>
      {children}
    </Fragment>
  );
}
