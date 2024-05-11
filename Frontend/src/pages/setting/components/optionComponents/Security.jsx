import { useState } from "react";
import { useDispatch } from "react-redux";
import authApi from "../../../../api/auth";
import { setUser } from "../../../../redux/features/userSlice";
import { toast } from "react-toastify";

const Security = () => {
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword!== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        try {
            const response = await authApi.changePassword(
                currentPassword,
                newPassword
            );
            setError("");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            dispatch(setUser({...response.data.user }));
        } catch (error) {
            toast.error("Passwords do not match.");
            setError(error.data.errors[0].msg);
        }
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
                        {error && (
                            <span className="text-red-500 text-sm">
                                {error}
                            </span>
                        )}
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