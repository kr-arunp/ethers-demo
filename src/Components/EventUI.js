import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import { ethers } from "ethers";
import USDC_ABI from "../Components/SmartContract/USDC_ABI"

const rpcURL = "https://cloudflare-eth.com/";
const contractAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const provider = new ethers.providers.JsonRpcProvider(rpcURL);
const contract = new ethers.Contract(
  contractAddress,
  USDC_ABI.USDC_ABI,
  provider
);

const EventTable = () => {
  const [events, setEvents] = useState([]);
  const handleTransfer = (from, to, value, event) => {
    console.log(`Transfer event received from ${from} to ${to} with value ${value}`);
    setEvents(prevEvents => [
      ...prevEvents,
      {
        from,
        to,
        value: value.toString(),
        eventData: event
      }
    ]);
  };

  contract.on("Transfer", handleTransfer);

  return (
    <TableContainer
      component={Paper}
      style={{ height: "500px", width: "900px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Event Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event, index) => (
            <TableRow key={index}>
              <TableCell style={{ width: "100%" }}>{event.from}</TableCell>
              <TableCell style={{ width: "100%" }}>{event.to}</TableCell>
              <TableCell style={{ width: "100%" }}>{event.value}</TableCell>
              <TableCell style={{ width: "100%" }}>
                {JSON.stringify(event.eventData)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EventTable;
