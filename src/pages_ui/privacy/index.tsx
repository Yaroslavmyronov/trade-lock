export const PrivacyPage = () => {
  return (
    <div className="mx-auto min-h-0 w-full min-w-0 px-4 lg:px-6">
      <div className="flex flex-col gap-2 pt-4 pb-4 select-text">
        <span className="text-[32px] leading-tight font-medium">
          Privacy Policy
        </span>
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <span className="font-semibold">General Provisions</span>
            <ol className="mt-2 list-decimal space-y-2 pl-6">
              <li>
                This Policy describes what data is collected and how it is used.
              </li>
              <li>
                By using the Service, you agree to the terms of this Policy.
              </li>
            </ol>
          </li>

          <li>
            <span className="font-semibold">Data Collected</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Cryptocurrency wallet address;</li>
              <li>Blockchain transaction data;</li>
              <li>Technical data: IP, cookies, browser information.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">How Data Is Used</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>For Service operation (wallet connection, transactions);</li>
              <li>For analytics and improving the platform;</li>
              <li>For protection against fraud and attacks.</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">
              Data Sharing with Third Parties
            </span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Blockchain providers (Infura, Alchemy);</li>
              <li>Wallet providers (MetaMask, etc.);</li>
              <li>Analytics services (Google Analytics, etc.).</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">Data Storage and Protection</span>
            <p className="mt-2 space-y-2">
              Data is not sold to third parties. The Service takes measures to
              protect information but does not guarantee absolute security.
            </p>
          </li>
          <li>
            <span className="font-semibold">User Rights</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                Request data deletion (except blockchain data — it is
                immutable);
              </li>
              <li>
                Contact the administration:{' '}
                <a href="mailto:ytube.noobtv@gmail.com">
                  ytube.noobtv@gmail.com
                </a>
                .
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </div>
  );
};
