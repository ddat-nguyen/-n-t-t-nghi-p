/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSelector } from "react-redux";
import authApi from "../../../../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const user = useSelector((state) => state.user.value);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const currentPasswordInput = document.getElementById("currentPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");

    const response = await authApi.changePassword(user._id, {
      currentPassword: currentPasswordInput.value,
      newPassword: newPasswordInput.value,
      confirmPassword: confirmPasswordInput.value,
    });
    console.log(response);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");    

    toast.success("Change Password Successfully");
    navigate("/login");
  };

  return (
    <div className="bg-base/dark-bg-2-14 dark:bg-light-bg-1 dark:text-dark flex flex-col gap-4 flex-1 h-[347px] p-6 rounded-lg">
      <div className="flex flex-col gap-2 items-start">
        <div className="font-semibold leading-[22.4px]">Change Password</div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-2 items-start flex-1">
          <div className="flex justify-between w-full">
            <span className=" font-medium">Current Password</span>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className={`border-solid border-[#393c49] bg-[#2d303e] dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
          />
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-2 items-start flex-1">
          <div className="flex justify-between w-full">
            <span className=" font-medium">New Password</span>
          </div>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`border-solid border-[#393c49] bg-[#2d303e] dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
          />
        </div>
        <div className="flex flex-col gap-2 items-start flex-1">
          <div className="flex justify-between w-full">
            <span className=" font-medium">Confirm Password</span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`border-solid border-[#393c49] bg-[#2d303e] dark:bg-light-bg self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-start border rounded-lg focus:outline-none`}
          />
        </div>
      </div>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-2 items-start flex-1">
          <button
            type="submit"
            onClick={handlePasswordChange}
            className={`border-solid border-[#393c49] bg-primary-color hover:bg-primary-color/50 self-stretch flex flex-col justify-center pl-3 h-12 shrink-0 items-center border rounded-lg focus:outline-none text-white`}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Security;
