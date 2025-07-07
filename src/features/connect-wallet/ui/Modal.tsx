'use client';
import { CloseIcon } from '@/shared';
import React, { useState } from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onConfirm }) => {
  const [agreed, setAgreed] = useState(false);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="ease-out-quint relative w-[420px] max-w-[calc(100vw-32px)] rounded-xl border border-[rgb(38,38,45)] bg-[rgb(16,16,17)] focus-visible:outline-hidden md:rounded-xl">
        <div className="h-[370px]">
          <div className="flex max-h-[calc(100vh-64px)] flex-col">
            {/* Video block */}
            <div className="flex flex-col overflow-y-auto px-6 pt-12 pb-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">
              <div className="mb-6 flex flex-col items-center justify-center">
                <div className="flex size-[100px] flex-col items-center justify-center overflow-hidden rounded-full drop-shadow-sm">
                  <div className="size-[calc(100%+1px)]">
                    <video
                      autoPlay
                      playsInline
                      loop
                      preload="auto"
                      disableRemotePlayback
                    >
                      <source src="" type="video/mp4" />
                    </video>
                  </div>
                </div>
              </div>

              <h4 className="mb-8 text-center text-2xl leading-tight font-medium">
                Welcome to TradeLock
              </h4>

              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 rounded-xl border-0">
                  <div className="flex w-full items-center gap-3 p-0">
                    <div className="order-2 flex flex-auto flex-col items-start justify-center self-stretch overflow-hidden">
                      <label
                        htmlFor="agreed-to-terms"
                        className="text-md leading-normal font-medium"
                      >
                        <span className="text-left text-sm leading-normal text-gray-500">
                          I agree to TradeLock&apos;s{' '}
                          <a
                            className="text-blue-500 underline hover:text-blue-400 focus:text-blue-400 active:text-blue-600"
                            href=""
                            target="_blank"
                            rel="nofollow noopener"
                          >
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a
                            className="text-blue-500 underline hover:text-blue-400 focus:text-blue-400 active:text-blue-600"
                            href=""
                            target="_blank"
                            rel="nofollow noopener"
                          >
                            Privacy Policy
                          </a>
                        </span>
                      </label>
                    </div>
                    <div className="order-1 flex shrink-0 flex-col items-center justify-center">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={agreed}
                        onClick={() => setAgreed(!agreed)}
                        className={`size-5 min-h-4 min-w-4 rounded border border-[rgb(52,53,60)] bg-[rgb(20,20,21)] transition-colors duration-150 hover:cursor-pointer focus:border-gray-400 ${
                          agreed && 'border-blue-500 bg-blue-500'
                        }`}
                        id="agreed-to-terms"
                      >
                        {agreed && (
                          <span className="flex items-center justify-center">
                            <svg
                              aria-label="Check"
                              fill="currentColor"
                              height="14"
                              role="img"
                              viewBox="0 -960 960 960"
                              width="14"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"></path>
                            </svg>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={onConfirm}
                    type="button"
                    disabled={!agreed}
                    className={`text-md inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-500 px-6 font-medium text-white transition duration-200 hover:bg-blue-400 focus:bg-blue-400 ${agreed && 'cursor-pointer'} disabled:pointer-events-none disabled:opacity-40`}
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <button
          className="z-modal absolute top-6 right-6 cursor-pointer text-[#fff] hover:text-[rgb(172,173,174)]"
          onClick={onClose}
        >
          <CloseIcon width={24} height={24}></CloseIcon>
        </button>
      </div>
    </div>
  );
};
