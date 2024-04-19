/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useRef, useEffect } from "react";
import { Mail } from "lucide-react";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Format numbers as objects with id and number properties
  const numbersFormatted = contacts.map((contact, index) => ({
    id: `Ph: ${index}`,
    number: contact.phoneNumber,
  }));

  // Serialize the formatted numbers for URL
  const serializedNumbers = encodeURIComponent(
    JSON.stringify(numbersFormatted)
  );

  const iframeSrc = `https://app.whippy.co/embed?phone=${serializedNumbers}`;

  const handleCreateSMSCampaign = () => {
    setDrawerOpen(!drawerOpen); // Toggle drawer visibility

    // Assuming numbersFormatted is correctly structured for your needs
    const serializedPhoneNumbers = returnStringifiedArray(numbersFormatted);

    // Use JSON.stringify to ensure proper formatting and escaping
    const message = JSON.stringify({
      isExtension: true,
      whippy_phone: serializedPhoneNumbers,
    });

    // Check if the drawer is being opened
    if (!drawerOpen) {
      // Post the message with the phone numbers to the iframe's contentWindow
      drawerRef.current?.querySelector("iframe")?.contentWindow?.postMessage(
        message,
        "*" // In production, replace "*" with your specific target origin for security
      );
    }
  };

  const handleOpenConversation = (number: string) => {
    setDrawerOpen(!drawerOpen); // Toggle drawer visibility

    // Use JSON.stringify to ensure proper formatting and escaping
    const message = JSON.stringify({
      isExtension: true,
      whippy_phone: JSON.stringify(number),
    });

    // Check if the drawer is being opened
    if (!drawerOpen) {
      // Post the message with the phone numbers to the iframe's contentWindow
      drawerRef.current?.querySelector("iframe")?.contentWindow?.postMessage(
        message,
        "*" // In production, replace "*" with your specific target origin for security
      );
    }
  };

  // Helper function to serialize the phone numbers array
  const returnStringifiedArray = (
    phoneNumbers: { id: string; number: string }[]
  ) => {
    return encodeURIComponent(JSON.stringify(phoneNumbers));
  };

  useEffect(() => {
    // Handle clicks outside the drawer to close it
    const handleClickOutside = (event: { target: any }) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        drawerOpen
      ) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerOpen]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Whippy Embed Demo</h1>
        <Button onClick={handleCreateSMSCampaign}>Create SMS Campaign</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell>{contact.name}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleOpenConversation(contact.phoneNumber)}
                  size="icon"
                >
                  <Mail />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ease-in-out duration-300 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "850px" }}
      >
        <iframe
          src={iframeSrc}
          style={{ width: "100%", height: "100%" }}
        ></iframe>
      </div>
    </main>
  );
}

const contacts = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    phoneNumber: "+13234249459",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phoneNumber: "+13234249458",
  },
  {
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phoneNumber: "+13234249457",
  },
  {
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phoneNumber: "+13234249456",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phoneNumber: "+13234249455",
  },
];
