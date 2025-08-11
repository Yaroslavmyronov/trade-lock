'use client';

import { Address } from '@/widgets/Header/ui/Address';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function CustomConnectButton() {
  return (
    <>
      <ConnectButton.Custom>
        {({ account, chain, openChainModal, openConnectModal, mounted }) => {
          if (!mounted) {
            return (
              <div className="flex items-center gap-1">
                <div className="flex animate-pulse space-x-4">
                  <div className="flex items-center space-y-6">
                    <div className="h-4 w-28 rounded-sm bg-[#26272D]"></div>
                  </div>
                </div>

                <div className="flex animate-pulse items-center space-y-6">
                  <div className="mr-2 mb-0 size-[24px] rounded-full bg-[#26272D]"></div>
                  <div className="h-4 w-12 rounded-sm bg-[#26272D]"></div>
                </div>
              </div>
            );
          }
          return (
            <div className="flex">
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button
                      className="cursor-pointer self-center bg-[#35373a] px-[15px] py-[11px] text-[14px] leading-3.5 text-white"
                      onClick={openConnectModal}
                      type="button"
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      className="cursor-pointer self-center bg-[#35373a] px-[15px] py-[11px] text-[14px] leading-3.5 text-white"
                      onClick={openChainModal}
                      type="button"
                    >
                      Wrong network
                    </button>
                  );
                }

                return <Address />;
                {
                  /* <button
                      onClick={openChainModal}
                      style={{ display: 'flex', alignItems: 'center' }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              width={12}
                              height={12}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button> */
                }

                {
                  /* <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button> */
                }
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
      {/* <button
        onClick={() => setModalOpen(true)}
        className={
          loginButtonClassNames ??
          'cursor-pointer self-center bg-[#35373a] px-[15px] py-[11px] text-[14px] leading-3.5 text-white'
        }
      >
        {сonnectButtonText ?? 'Login'}
      </button> */}

      {/* <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></ConnectModal> */}
    </>
  );
}
