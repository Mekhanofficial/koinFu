import React, { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../../components/ui/table";
import { useTheme } from "next-themes";
import UserDetailsModal from "./UserDetailModal";
import { useTransactions } from "../../context/TransactionContext";

export default function AdminPendingRequests() {
  const { theme } = useTheme();
  const {
    pendingRequests,
    userData,
    fetchUserData,
    updatePendingRequestStatus,
  } = useTransactions();

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewUserDetails = async (userId) => {
    await fetchUserData(userId);
    setIsModalOpen(true);
  };

  const filteredRequests = pendingRequests.filter((request) => {
    return (
      request.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.userEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Rejected":
        return "text-red-500";
      default:
        return theme === "dark" ? "text-gray-300" : "text-gray-700";
    }
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold">Pending User Requests</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Search requests..."
                className="w-full sm:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Request Type</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <button
                        onClick={() => viewUserDetails(request.userId)}
                        className="hover:underline text-blue-500"
                      >
                        {request.userName ||
                          request.userEmail ||
                          `User ID: ${request.userId}`}
                      </button>
                    </TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>
                      {request.details || JSON.stringify(request.data || "N/A")}
                    </TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className={getStatusColor(request.status)}>
                      {request.status}
                    </TableCell>
                    <TableCell className="space-x-2">
                      {request.status === "Pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() =>
                              updatePendingRequestStatus(request.id, "Approved")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              updatePendingRequestStatus(request.id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {request.status !== "Pending" && (
                        <span className="text-gray-500">Processed</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredRequests.length === 0 && (
              <div className="py-10 text-center">
                <p
                  className={
                    theme === "dark" ? "text-slate-500" : "text-gray-500"
                  }
                >
                  No pending requests found
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={userData}
      />
    </>
  );
}
