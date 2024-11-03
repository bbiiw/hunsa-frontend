import React, { useState, useEffect } from "react";
import Layout from "../components/Layout_Admin";
import {
  getReservationsByEmployee,
  updateReservationStatus,
  cancelReservation,
  Reservation,
} from "../api/reservation";
import { fetchAllEmployees, Employee } from "../api/employee"; // import Employee API functions

const History = () => {
  const [selectedTab, setSelectedTab] = useState("waiting");
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(
    null,
  );

  // Fetch all employees on component mount
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const employeeData = await fetchAllEmployees();
        setEmployees(employeeData);
        if (employeeData.length > 0) {
          setSelectedEmployeeId(employeeData[0]._id); // Set default employeeId
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadEmployees();
  }, []);

  // Fetch reservations by selected employee based on selectedTab
  useEffect(() => {
    const fetchReservations = async () => {
      if (!selectedEmployeeId) return;

      try {
        const allReservationsResponse =
          await getReservationsByEmployee(selectedEmployeeId);
        const allReservations = allReservationsResponse.reservations; // Make sure this is valid
        console.log("All Reservations:", allReservations);

        const filteredReservations = allReservations.filter(
          (reservation: Reservation) => {
            if (selectedTab === "waiting")
              return reservation.status === "pending";
            if (selectedTab === "completed")
              return reservation.status === "confirm";
            if (selectedTab === "canceled")
              return reservation.status === "cancel";
            return false;
          },
        );

        setReservations(filteredReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [selectedTab, selectedEmployeeId]);

  const handleComplete = async (reservationId: string) => {
    try {
      await updateReservationStatus(reservationId);
      setReservations((prev) =>
        prev.filter((res) => res._id !== reservationId),
      );
    } catch (error) {
      console.error("Error updating reservation status:", error);
    }
  };

  const handleCancel = async (reservationId: string) => {
    try {
      await cancelReservation(reservationId);
      setReservations((prev) =>
        prev.filter((res) => res._id !== reservationId),
      );
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const renderContent = () => {
    return reservations.map((reservation) => (
      <div
        key={reservation._id}
        className="flex items-center justify-between w-4/5 max-w-3xl p-5 border border-gray-300 rounded-lg shadow-md mb-5"
      >
        <img
          src="/assets/baber_1.jpg" // Image placeholder, replace with real image if available
          alt={reservation.serviceId}
          className="w-36 h-24 object-cover rounded-lg"
        />
        <div className="flex-grow pl-5">
          <h3 className="text-xl font-bold">บริการ: {reservation.serviceId}</h3>
          <p className="my-1">ชื่อลูกค้า: {reservation.customerName}</p>
          <p className="my-1">อีเมลลูกค้า: {reservation.customerEmail}</p>
          <p className="my-1">เบอร์โทร: {reservation.customerPhone}</p>
          <p className="my-1">วันที่จอง: {reservation.reservationDate}</p>
          <p className="my-1">เวลาจอง: {reservation.reservationTime}</p>
          <p className="my-1">สถานะ: {reservation.status}</p>

          {selectedTab === "waiting" && (
            <button
              onClick={() => handleComplete(reservation._id!)}
              className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 mt-2 mr-4"
            >
              บริการเสร็จสิ้น
            </button>
          )}

          {selectedTab === "waiting" && (
            <button
              onClick={() => handleCancel(reservation._id!)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 mt-2"
            >
              ยกเลิกการจอง
            </button>
          )}
        </div>
        <div className="text-gray-500 text-right">{reservation.createdAt}</div>
      </div>
    ));
  };

  return (
    <div className="history-page">
      <Layout>
        <div className="flex flex-col items-center mt-28">
          {/* Employee selection dropdown */}
          <select
            value={selectedEmployeeId ?? ""}
            onChange={(e) => setSelectedEmployeeId(e.target.value)}
            className="mb-5 p-2 border border-gray-300 rounded mt-12"
          >
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.username}
              </option>
            ))}
          </select>

          <div className="flex justify-center gap-4 mb-5">
            <button
              className={`px-4 py-2 rounded ${selectedTab === "waiting" ? "bg-purple-700 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedTab("waiting")}
            >
              รอรับบริการ
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedTab === "completed" ? "bg-purple-700 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedTab("completed")}
            >
              เข้ารับบริการสำเร็จ
            </button>
            <button
              className={`px-4 py-2 rounded ${selectedTab === "canceled" ? "bg-purple-700 text-white" : "bg-gray-200"}`}
              onClick={() => setSelectedTab("canceled")}
            >
              คิวที่ยกเลิก
            </button>
          </div>

          <div className="flex flex-col items-center w-full">
            {renderContent()}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default History;
