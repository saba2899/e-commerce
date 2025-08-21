import { AccountSideNav, Input, Button } from "../components";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import { changePassword, updateNamePartsIfMissing } from "../services/auth";

export function Profile() {
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
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <div className="flex gap-8">
        <AccountSideNav />

        <main className="flex-1">
          <h1 className="mb-6 text-base font-semibold text-red-500">
            Edit Your Profile
          </h1>

          {user && (!user.name || !user.email || !user.address) && (
            <div className="p-3 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded bg-yellow-50">
              Please complete your profile information.
            </div>
          )}

          <form
            onSubmit={onSave}
            className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div>
              <label className="block mb-1 text-sm">First Name</label>
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
              <label className="block mb-1 text-sm">Last Name</label>
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
              <label className="block mb-1 text-sm">Email</label>
              <Input
                value={user?.email || ""}
                readOnly
                className="w-full px-3 py-2 border rounded-md cursor-not-allowed bg-gray-50"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block mb-1 text-sm">Address</label>
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

            <div className="mt-4 md:col-span-2">
              <label className="block mb-2 text-sm">Password Changes</label>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 md:col-span-2">{error}</div>
            )}
            {status && (
              <div className="text-sm text-green-600 md:col-span-2">
                {status}
              </div>
            )}

            <div className="flex items-center gap-4 mt-4 md:col-span-2">
              <Button
                type="button"
                className="px-5 py-2 border rounded-md"
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
                className="px-5 py-2 text-white bg-red-500 rounded-md"
              >
                Save Changes
              </Button>
              {(canEditFirst || canEditLast || canEditAddress) && (
                <Button
                  type="button"
                  className="px-5 py-2 text-white bg-gray-800 rounded-md"
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
