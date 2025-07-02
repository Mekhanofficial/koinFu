import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import AdminTransactions from "./AdminTransaction";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useTransactions } from "../../context/TransactionContext";
// import { Badge } from "../../components/ui/badge";
import { BellIcon } from "lucide-react";

export default function FinanceSection() {
  const {
    transactions,
    pendingRequests,
    notificationCount,
    clearNotifications,
  } = useTransactions();

  const totalDeposits = transactions
    .filter((tx) => tx.type === "Deposit" && tx.status === "Completed")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalWithdrawals = transactions
    .filter((tx) => tx.type === "Withdrawal" && tx.status === "Completed")
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const pendingDeposits = pendingRequests.filter(
    (req) => req.type === "Deposit" && req.status === "Pending"
  );

  const handleTabChange = (value) => {
    if (value === "deposits") {
      clearNotifications();
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Total Balance
                </h4>
                <p className="text-2xl font-bold mt-2">
                  ${(totalDeposits - totalWithdrawals).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardContent className="p-4">
                <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
                  Total Deposits
                </h4>
                <p className="text-2xl font-bold mt-2">
                  ${totalDeposits.toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 dark:bg-yellow-900/20">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Pending Deposits
                  </h4>
                  {pendingDeposits.length > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-yellow-500 text-white"
                    >
                      {pendingDeposits.length} new
                    </Badge>
                  )}
                </div>
                <p className="text-2xl font-bold mt-2">
                  {pendingDeposits.length}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="transactions" onValueChange={handleTabChange}>
        <TabsList className="mb-4">
          <TabsTrigger value="transactions">All Transactions</TabsTrigger>
          <TabsTrigger value="deposits">
            <div className="flex items-center gap-2">
              Pending Deposits
              {pendingDeposits.length > 0 && (
                <span className="w-5 h-5 flex items-center justify-center bg-yellow-500 text-white text-xs rounded-full">
                  {pendingDeposits.length}
                </span>
              )}
            </div>
          </TabsTrigger>
          <TabsTrigger value="withdrawals">Pending Withdrawals</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <AdminTransactions />
        </TabsContent>

        <TabsContent value="deposits">
          <AdminTransactions
            defaultFilter="Pending"
            transactionType="Deposit"
            showAdminActions={true}
          />
        </TabsContent>

        <TabsContent value="withdrawals">
          <AdminTransactions
            defaultFilter="Pending"
            transactionType="Withdrawal"
            showAdminActions={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
