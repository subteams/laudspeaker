import { useEffect, useState } from "react";
import { Input } from "components/Elements";
import {
  DocumentDuplicateIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import ApiService from "services/api.service";
import { toast } from "react-toastify";

export default function SettingsAPIBeta() {
  const [privateAPIKey, setPrivateAPIKey] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await ApiService.get({ url: "/accounts/settings" });
      setPrivateAPIKey(data.apiKey);
    })();
  }, []);

  const handleAPIKeyUpdate = async () => {
    const { data } = await ApiService.patch({
      url: "/accounts/keygen",
      options: {},
    });
    setPrivateAPIKey(data);
  };

  const handleAPIKeyCopy = () => {
    navigator.clipboard.writeText(privateAPIKey);
    toast.success("Copied to clipboard", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <div className="mt-10 divide-y divide-gray-200">
        <div className="space-y-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Keys</h3>
          <p className="max-w-2xl text-sm text-gray-500">
            Use these keys when making calls to the Laudspeaker API.
          </p>
        </div>
        <div className="mt-6">
          <dl className="divide-y divide-gray-200">
            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
              <dt className="text-sm font-medium text-gray-500">
                Events API Key
              </dt>
              <dd>
                <div className="relative rounded-md">
                  <Input
                    type="text"
                    name="privateAPIKey"
                    id="privateAPIKey"
                    value={privateAPIKey}
                    disabled
                    className="disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm pr-[55px] text-ellipsis"
                    aria-invalid="true"
                    aria-describedby="password-error"
                  />
                  <div className="absolute inset-y-0 flex right-[10px]">
                    <div
                      className="flex items-center cursor-pointer mr-[5px]"
                      onClick={handleAPIKeyCopy}
                    >
                      <DocumentDuplicateIcon
                        className="h-5 w-5 text-grey-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={handleAPIKeyUpdate}
                    >
                      <ArrowPathIcon
                        className="h-5 w-5 text-grey-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
