"use client";

import AdminTableItem from "./AdminTableItem";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import ContextProvider from "../../context/ContextProvider";

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    const fetchedUsers = [];
    const q = query(collection(db, "users"));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      fetchedUsers.push({ id: doc.id, ...doc.data() });
    });

    setUsers(fetchedUsers);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <ContextProvider>
      <div className="overflow-hidden grid grid-rows-[auto_1fr] gap-3">
        <p className="text-neutral-300">
          Total Users <span className="text-[#97afd5]">({users.length})</span>
        </p>
        <div className="border rounded-md border-[#97afd5] overflow-auto h-full table-scroll">
          {isLoading ? (
            <div className="grid h-full place-content-center ">
              <span className="block w-10 h-10 border-2 border-[#97afd5] border-l-transparent animate-spin rounded-full"></span>
            </div>
          ) : (
            <>
              <table className="admin-table w-full">
                <thead className="border border-[#97afd5]">
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Profit</th>
                    <th>Total Deposit</th>
                    <th>Total Withdrawal</th>
                    <th>Transaction Code</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((data, i) => (
                    <AdminTableItem
                      key={data.id}
                      id={data.id}
                      firstName={data.first_name}
                      LastName={data.last_name}
                      email={data.email}
                      className={`${i > 0 && "border-t border-[#97afd5]"}`}
                      phoneNumber={
                        data.phone_number ? data.phone_number : "NULL"
                      }
                      profit={data.profit}
                      totalDeposit={data.total_deposit}
                      totalWithdrawal={data.total_withdrawal}
                      transactionCode={
                        data.transaction_code
                          ? data.transaction_code
                          : "No Codes"
                      }
                    />
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </ContextProvider>
  );
};

export default AdminTable;
