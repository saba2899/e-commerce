import { AccountSideNav, Input, Button } from "../components";
import { useUser } from "../context/useUser";
import { useEffect, useState } from "react";
import { changePassword, updateNamePartsIfMissing } from "../services/auth";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  phone?: string;
  password?: string;
};

export function Profile() {
  const { user, setUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [firstNameDraft, setFirstNameDraft] = useState("");
  const [lastNameDraft, setLastNameDraft] = useState("");
  const [companyDraft, setCompanyDraft] = useState("");
  const [streetDraft, setStreetDraft] = useState("");
  const [aptDraft, setAptDraft] = useState("");
  const [cityDraft, setCityDraft] = useState("");
  const [phoneDraft, setPhoneDraft] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  // State for edit modes
  const [canEditFirst] = useState(true);
  const [canEditLast] = useState(true);
  const [canEditStreet] = useState(true);

  // Initialize form fields when user data is available
  useEffect(() => {
    if (user) {
      const nameParts = user.name?.split(" ") || [];
      setFirstNameDraft(nameParts[0] || "");
      setLastNameDraft(nameParts.slice(1).join(" ") || "");
      setStreetDraft(user.address || "");

      // Load additional profile info from localStorage
      const profileKey = `profile_info_${user.id}`;
      const savedProfile = localStorage.getItem(profileKey);
      if (savedProfile) {
        try {
          const data = JSON.parse(savedProfile);
          setCompanyDraft(data.company || "");
          setAptDraft(data.apt || "");
          setCityDraft(data.city || "");
          setPhoneDraft(data.phone || "");
        } catch (e) {
          console.error("Failed to load profile data", e);
        }
      }
    }
  }, [user]);

  function validateForm() {
    const errors: FormErrors = {};
    if (firstNameDraft.trim().length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }
    if (lastNameDraft.trim().length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }
    if (streetDraft.trim().length < 3) {
      errors.street = "Street address is required";
    }
    if (cityDraft.trim().length < 2) {
      errors.city = "City is required";
    }
    if (!/^[+]?[\d\s-]{6,}$/.test(phoneDraft.trim())) {
      errors.phone = "Enter a valid phone number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function savePersonalInfo() {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    try {
      // Update the user's name and address in the auth system
      // Only send fields that are currently missing to avoid backend rejections
      const nameTokens = (user.name || "").trim().split(/\s+/).filter(Boolean);
      const currentFirst = nameTokens[0] ?? "";
      const currentLast = nameTokens.slice(1).join(" ");
      const parts: { firstName?: string; lastName?: string; address?: string } =
        {};
      const firstTrim = firstNameDraft.trim();
      const lastTrim = lastNameDraft.trim();
      const addrTrim = streetDraft.trim();
      if (!currentFirst && firstTrim) parts.firstName = firstTrim;
      if (!currentLast && lastTrim) parts.lastName = lastTrim;
      if (!user.address && addrTrim) parts.address = addrTrim;

      const updatedUser = updateNamePartsIfMissing(user.id, parts);

      // Save additional profile info to localStorage
      const profileKey = `profile_info_${user.id}`;
      const profileData = {
        company: companyDraft.trim(),
        apt: aptDraft.trim(),
        city: cityDraft.trim(),
        phone: phoneDraft.trim(),
      };
      localStorage.setItem(profileKey, JSON.stringify(profileData));

      // Update the user context with the new data from auth
      setUser({
        ...updatedUser,
      });

      setStatus("Personal information updated successfully");
      setError(null);
      setFormErrors({});
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile";
      setError(message);
      setStatus(null);
    }
  }

  async function onSavePassword(e: React.FormEvent) {
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

  useEffect(() => {
    document.title = `Exclusive | Profile`;
  }, []);

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

          <div className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mt-4 md:col-span-2">
              <label className="block mb-2 text-sm">Profile Information</label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      First Name *
                    </label>
                    <Input
                      value={firstNameDraft}
                      onChange={(e) => setFirstNameDraft(e.target.value)}
                      disabled={!canEditFirst}
                      placeholder="Enter your first name"
                      error={!!formErrors.firstName}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Last Name *
                    </label>
                    <Input
                      value={lastNameDraft}
                      onChange={(e) => setLastNameDraft(e.target.value)}
                      disabled={!canEditLast}
                      placeholder="Enter your last name"
                      error={!!formErrors.lastName}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Company (Optional)
                  </label>
                  <Input
                    value={companyDraft}
                    onChange={(e) => setCompanyDraft(e.target.value)}
                    placeholder="Enter company name"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Street Address *
                  </label>
                  <Input
                    value={streetDraft}
                    onChange={(e) => setStreetDraft(e.target.value)}
                    disabled={!canEditStreet}
                    placeholder="House number and street name"
                    error={!!formErrors.street}
                  />
                  {formErrors.street && (
                    <p className="mt-1 text-sm text-red-600">
                      {formErrors.street}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Apartment, suite, etc. (Optional)
                  </label>
                  <Input
                    value={aptDraft}
                    onChange={(e) => setAptDraft(e.target.value)}
                    placeholder="Apartment, suite, unit, etc."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Town/City *
                    </label>
                    <Input
                      value={cityDraft}
                      onChange={(e) => setCityDraft(e.target.value)}
                      placeholder="Enter your city"
                      error={!!formErrors.city}
                    />
                    {formErrors.city && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone *
                    </label>
                    <Input
                      type="tel"
                      value={phoneDraft}
                      onChange={(e) => setPhoneDraft(e.target.value)}
                      placeholder="Enter your phone number"
                      error={!!formErrors.phone}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 md:col-span-2">
              <Button
                type="button"
                className="px-5 py-2 text-white bg-red-500 rounded-md"
                onClick={() => {
                  if (!validateForm()) return;
                  void savePersonalInfo();
                }}
              >
                Save Personal Information
              </Button>
            </div>

            <form onSubmit={onSavePassword} className="mt-4 md:col-span-2">
              <label className="block mb-2 text-sm">Password Changes</label>
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  minLength={6}
                  required
                />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  minLength={6}
                  required
                />
                <Button
                  type="submit"
                  className="w-full px-5 py-2 text-white bg-red-500 rounded-md md:w-auto"
                >
                  Update Password
                </Button>
              </div>
            </form>

            {status && (
              <div className="p-3 mt-4 text-green-800 bg-green-100 border border-green-300 rounded">
                {status}
              </div>
            )}
            {error && (
              <div className="p-3 mt-4 text-red-800 bg-red-100 border border-red-300 rounded">
                {error}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
