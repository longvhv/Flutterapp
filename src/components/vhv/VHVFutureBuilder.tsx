import React, { useState, useEffect } from 'react';

export type VHVConnectionState = 'none' | 'waiting' | 'active' | 'done';

export interface VHVAsyncSnapshot<T> {
  connectionState: VHVConnectionState;
  data?: T;
  error?: any;
  hasData: boolean;
  hasError: boolean;
}

interface VHVFutureBuilderProps<T> {
  future: Promise<T>;
  initialData?: T;
  builder: (snapshot: VHVAsyncSnapshot<T>) => React.ReactNode;
}

export function VHVFutureBuilder<T>({
  future,
  initialData,
  builder,
}: VHVFutureBuilderProps<T>) {
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

    future
      .then((data) => {
        setSnapshot({
          connectionState: 'done',
          data,
          hasData: true,
          hasError: false,
        });
      })
      .catch((error) => {
        setSnapshot({
          connectionState: 'done',
          error,
          hasData: false,
          hasError: true,
        });
      });
  }, [future, initialData]);

  return <>{builder(snapshot)}</>;
}
