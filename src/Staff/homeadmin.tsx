import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout_Admin";
import { useAuth } from "../context/AuthContext";
import { updateEmployee, updateEmployeeStatus } from "../api/employee";

const HomeAdmin: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    description: user?.description || "",
  });
  const [status, setStatus] = useState(user?.status || "unavailable");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    user?.imgSrc || "/assets/blank-profile.png",
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        description: user.description || "",
      });
      setStatus(user.status);
      setPreviewImage(
        user.imgSrc ? `/uploads/${user.imgSrc}` : "/assets/blank-profile.png",
      );
    }
  }, [user]);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    setIsEditing(false);

    try {
      if (user) {
        const updatedData: {
          username: string;
          email: string;
          description: string;
          imgSrc?: string;
        } = {
          ...formData,
        };

        if (profileImage) {
          const fileName = profileImage.name;
          updatedData.imgSrc = `/assets/${fileName}`;
          setPreviewImage(`/assets/${fileName}`);
        }

        const response = await updateEmployee(user._id, updatedData);
        login(response.employee);
        console.log("Profile updated successfully:", response.employee);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = status === "available" ? "unavailable" : "available";
    if (user) {
      try {
        const response = await updateEmployeeStatus(user._id, newStatus);
        setStatus(newStatus);
        login({ ...user, status: newStatus });
        console.log(response.employee);
      } catch (error) {
        console.error("Error updating status:", error);
      }
    }
  };

  const handleNavigateToForgotPassword = () =>
    navigate("/admin/forgot-password");
  const handleNavigateToHistory = () => navigate("/admin/history");

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-28 p-5">
        <img
          src={previewImage}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover aspect-square mb-4"
        />
        <h1 className="text-3xl font-bold mb-5">
          สวัสดี ช่าง {formData.username}
        </h1>

        <div className="flex justify-center gap-4 mb-5">
          <button className="btn btn-primary">โปรไฟล์</button>
          <button
            className="btn btn-error"
            onClick={handleNavigateToForgotPassword}
          >
            เปลี่ยนรหัสผ่าน
          </button>
          <button
            className="btn btn-warning text-black"
            onClick={handleNavigateToHistory}
          >
            ดูบริการทั้งหมด
          </button>
        </div>

        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="input input-bordered w-full"
              value={formData.username}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="textarea textarea-bordered w-full"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
              required
            />
          </div>

          {isEditing && (
            <div className="mb-4">
              <label htmlFor="profileImage" className="block mb-1 font-medium">
                รูปโปรไฟล์
              </label>
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="input input-bordered w-full"
                onChange={handleImageChange}
              />
            </div>
          )}

          <div className="flex justify-center gap-4">
            <button
              type="button"
              className={`btn ${status === "available" ? "btn-success" : "btn-secondary"}`}
              onClick={handleStatusToggle}
              disabled={!isEditing}
            >
              {status === "available" ? "Available" : "Unavailable"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (isEditing) handleSubmit();
                toggleEdit();
              }}
            >
              {isEditing ? "ยืนยัน" : "แก้ไขข้อมูล"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeAdmin;
