'use client';

import { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const useMutableSearchParams = () => {
  const searchParams = useSearchParams()!;
  const router = useRouter();
  // const pathname = usePathname();

  const customizeSearchParams = useMemo(() => {
    return new URLSearchParams(searchParams);
  }, [searchParams]);

  const setSearchParams = (searchParams: URLSearchParams) => {
    // router.push(`${pathname}?${searchParams.toString()}`);
    router.replace(`?${searchParams.toString()}`, { scroll: false });
  };

  return { customizeSearchParams, setSearchParams };
};

export default useMutableSearchParams;
