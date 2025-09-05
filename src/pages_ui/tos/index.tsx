export const TosPage = () => {
  return (
    <div className="mx-auto min-h-0 w-full min-w-0 px-4 lg:px-6">
      <div className="flex flex-col gap-2 pt-4 pb-4 select-text">
        <span className="text-[32px] leading-tight font-medium">
          Terms Of Service
        </span>
        <ol className="list-decimal space-y-4 pl-6">
          <li>
            <span className="font-semibold">General Provisions</span>
            <ol className="mt-2 list-decimal space-y-2 pl-6">
              <li>
                This Agreement governs the use of the website/platform (the
                &quot;Service&quot;) intended for exchanging and purchasing
                non-fungible tokens (NFTs).
              </li>
              <li>
                By using the Service, you agree to the terms of this Agreement.
                If you do not agree, please stop using the Service.
              </li>
            </ol>
          </li>

          <li>
            <span className="font-semibold">Service Use</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                To access the Service&apos;s functionality, you must use your
                own cryptocurrency wallet (e.g., MetaMask).
              </li>
              <li>
                You are fully responsible for keeping your keys, passwords, and
                wallets secure.
              </li>
              <li>
                Using the Service for illegal activities is prohibited,
                including money laundering, terrorism financing, and selling
                prohibited content.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Transactions</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                All NFT transactions are irreversible. Once confirmed, a
                transaction cannot be undone.
              </li>
              <li>Fees are paid by users and are non-refundable.</li>
              <li>
                The Service administration is not responsible for smart contract
                errors, blockchain operation issues, or loss of wallet access.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Content and NFTs</span>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Users are responsible for the content they upload.</li>
              <li>
                The Service does not verify content ownership and does not
                guarantee originality.
              </li>
            </ul>
          </li>

          <li>
            <span className="font-semibold">Limitation of Liability</span>
            <p className="mt-2 space-y-2">
              The Service is provided &quot;as is&quot; without warranties. The
              administration is not responsible for any losses resulting from
              using the Service.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
};
