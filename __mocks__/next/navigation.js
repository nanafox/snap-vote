// Mock for Next.js navigation module
export const useRouter = jest.fn().mockImplementation(() => ({
  push: jest.fn(),
  back: jest.fn(),
  pathname: "/",
  query: {},
  asPath: "/",
  replace: jest.fn(),
  prefetch: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}));

export const usePathname = jest.fn().mockReturnValue("/");
export const useSearchParams = jest.fn().mockReturnValue(new URLSearchParams());
export const useParams = jest.fn().mockReturnValue({});
