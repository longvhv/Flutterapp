import React, { useState, useEffect } from 'react';

export type VHVConnectionState = 'none' | 'waiting' | 'active' | 'done';

export interface VHVAsyncSnapshot<T> {
  connectionState: VHVConnectionState;
  data?: T;
  error?: any;
  hasData: boolean;
  hasError: boolean;
}

interface VHVStreamBuilderProps<T> {
  stream: {
    subscribe: (callback: (data: T) => void, errorCallback?: (error: any) => void) => () => void;
  } | AsyncIterable<T>;
  initialData?: T;
  builder: (snapshot: VHVAsyncSnapshot<T>) => React.ReactNode;
}

export function VHVStreamBuilder<T>({
  stream,
  initialData,
  builder,
}: VHVStreamBuilderProps<T>) {
  const [snapshot, setSnapshot] = useState<VHVAsyncSnapshot<T>>({
    connectionState: 'none',
    data: initialData,
    hasData: initialData !== undefined,
    hasError: false,
  });

  useEffect(() => {
    setSnapshot({
      connectionState: 'waiting',
      data: initialData,
      hasData: initialData !== undefined,
      hasError: false,
    });

    let unsubscribe: (() => void) | undefined;

    // Check if it's a subscribable stream
    if ('subscribe' in stream) {
      unsubscribe = stream.subscribe(
        (data) => {
          setSnapshot({
            connectionState: 'active',
            data,
            hasData: true,
            hasError: false,
          });
        },
        (error) => {
          setSnapshot({
            connectionState: 'active',
            error,
            hasData: false,
            hasError: true,
          });
        }
      );
    } else {
      // AsyncIterable
      (async () => {
        try {
          for await (const data of stream) {
            setSnapshot({
              connectionState: 'active',
              data,
              hasData: true,
              hasError: false,
            });
          }
          setSnapshot((prev) => ({
            ...prev,
            connectionState: 'done',
          }));
        } catch (error) {
          setSnapshot({
            connectionState: 'done',
            error,
            hasData: false,
            hasError: true,
          });
        }
      })();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      setSnapshot((prev) => ({
        ...prev,
        connectionState: 'done',
      }));
    };
  }, [stream, initialData]);

  return <>{builder(snapshot)}</>;
}
