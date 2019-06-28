import { useRef, useState, useEffect } from 'react';

import { Page } from '../Page';

export type FetchPagesFn = (
  currentPages: ReadonlyArray<Page>
) => Promise<ReadonlyArray<Page>>;

export type SetCurrentIndexFn = (index: number) => void;

const LOW_PAGE_THRESHOLD = 3;

export const useInfinitePages = (
  fetchPages: FetchPagesFn,
  dependencies: ReadonlyArray<any>
): [ReadonlyArray<Page>, number, SetCurrentIndexFn] => {
  const [pages, setPages] = useState<ReadonlyArray<Page>>([]);

  const isFetching = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isFetching.current === false) {
      const isWithoutPages = pages.length === 0;
      const isRunningLowOnPages =
        pages.length - (currentIndex + 1) < LOW_PAGE_THRESHOLD;
      if (isWithoutPages || isRunningLowOnPages) {
        isFetching.current = true;

        fetchPages(pages)
          .then(newPages => setPages(newPages))
          .finally(() => (isFetching.current = false));
      }
    }
  }, [isFetching.current, currentIndex, pages.length, ...dependencies]);

  return [pages, currentIndex, setCurrentIndex];
};
