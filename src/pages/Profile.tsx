import AccountSideNav from "../components/AccountSideNav";
import Input from "../components/Input";
import Button from "../components/Button";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { changePassword, updateNamePartsIfMissing } from "../services/auth";

export default function Profile() {
  const { user, setUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstNameDraft, setFirstNameDraft] = useState("");
  const [lastNameDraft, setLastNameDraft] = useState("");
  const [addressDraft, setAddressDraft] = useState("");

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    setError(null);

    if (!user) {
      setError("Not authenticated");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await changePassword(user.id, currentPassword, newPassword);
      setStatus("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to update password";
      setError(message);
    }
  }

  const firstName = user?.name?.split(" ")[0] || "";
  const lastName = user?.name?.split(" ").slice(1).join(" ") || "";

  const canEditFirst = !firstName;
  const canEditLast = !lastName;
  const canEditAddress = !user?.address;

  async function saveMissingNameParts() {
    if (!user) return;
    try {
      const updated = updateNamePartsIfMissing(user.id, {
        firstName: canEditFirst ? firstNameDraft : undefined,
        lastName: canEditLast ? lastNameDraft : undefined,
        address: canEditAddress ? addressDraft : undefined,
      });
      setUser(updated);
      setStatus("Profile updated");
      setAddressDraft("");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "message" in err
          ? String((err as { message: string }).message)
          : "Failed to update profile";
      setError(message);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex gap-8">
        <AccountSideNav />

        <main className="flex-1">
          <h1 className="text-red-500 text-base font-semibold mb-6">
            Edit Your Profile
          </h1>

          {user && (!user.name || !user.email || !user.address) && (
            <div className="mb-4 rounded border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
              Please complete your profile information.
            </div>
          )}

          <form
            onSubmit={onSave}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl"
          >
            <div>
              <label className="block text-sm mb-1">First Name</label>
              <Input
                value={canEditFirst ? firstNameDraft : firstName}
                onChange={(e) =>
                  canEditFirst && setFirstNameDraft(e.target.value)
                }
                readOnly={!canEditFirst}
                placeholder="First Name"
                className={
                  canEditFirst
                    ? "w-full border rounded-md px-3 py-2"
                    : "w-full border rounded-md px-3 py-2 bg-gray-50 cursor-not-allowed"
                }
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Last Name</label>
              <Input
                value={canEditLast ? lastNameDraft : lastName}
                onChange={(e) =>
                  canEditLast && setLastNameDraft(e.target.value)
                }
                readOnly={!canEditLast}
                placeholder="Last Name"
                className={
                  canEditLast
                    ? "w-full border rounded-md px-3 py-2"
                    : "w-full border rounded-md px-3 py-2 bg-gray-50 cursor-not-allowed"
                }
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Email</label>
              <Input
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-50 cursor-not-allowed"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm mb-1">Address</label>
              <Input
                value={canEditAddress ? addressDraft : user?.address || ""}
                onChange={(e) =>
                  canEditAddress && setAddressDraft(e.target.value)
                }
                readOnly={!canEditAddress}
                placeholder="Kingston, 5236, United State"
                className={
                  canEditAddress
                    ? "w-full border rounded-md px-3 py-2"
                    : "w-full border rounded-md px-3 py-2 bg-gray-50 cursor-not-allowed"
                }
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <label className="block text-sm mb-2">Password Changes</label>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
            </div>

            {error && (
              <div className="md:col-span-2 text-sm text-red-600">{error}</div>
            )}
            {status && (
              <div className="md:col-span-2 text-sm text-green-600">
                {status}
              </div>
            )}

            <div className="md:col-span-2 mt-4 flex items-center gap-4">
              <Button
                type="button"
                className="px-5 py-2 rounded-md border"
                onClick={() => {
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                  setStatus(null);
                  setError(null);
                  setFirstNameDraft("");
                  setLastNameDraft("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="px-5 py-2 rounded-md bg-red-500 text-white"
              >
                Save Changes
              </Button>
              {(canEditFirst || canEditLast || canEditAddress) && (
                <Button
                  type="button"
                  className="px-5 py-2 rounded-md bg-gray-800 text-white"
                  onClick={saveMissingNameParts}
                >
                  Save Profile
                </Button>
              )}
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
