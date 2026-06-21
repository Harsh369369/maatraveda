import React from 'react';
import { 
  Link as RouterLink, 
  useNavigate as useReactRouterNavigate, 
  useParams as useReactRouterParams, 
  useSearchParams as useReactRouterSearchParams, 
  useLocation as useReactRouterLocation 
} from 'react-router-dom';

// Custom Link that accepts both `to` and `href`
export const Link = React.forwardRef(({ to, href, ...props }, ref) => {
  const destination = to || href || '#';
  return <RouterLink to={destination} ref={ref} {...props} />;
});

Link.displayName = 'Link';

// Custom useNavigate that maps navigate('/path') to router.push('/path')
export const useNavigate = () => {
  const navigate = useReactRouterNavigate();
  return (path, options) => {
    navigate(path, options);
  };
};

// Custom useRouter to mimic Next.js router
export const useRouter = () => {
  const navigate = useNavigate();
  return {
    push: (path, options) => navigate(path, options),
    replace: (path, options) => navigate(path, { ...options, replace: true }),
    back: () => navigate(-1),
  };
};

// Custom useParams
export const useParams = () => {
  const params = useReactRouterParams();
  return params;
};

// Custom useSearchParams
export const useSearchParams = () => {
  const [searchParams, setSearchParams] = useReactRouterSearchParams();
  
  const setParams = (newParams) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === undefined || newParams[key] === null) {
        params.delete(key);
      } else {
        params.set(key, newParams[key]);
      }
    });
    setSearchParams(params);
  };

  return [searchParams, setParams];
};

// Custom useLocation
export const useLocation = () => {
  const location = useReactRouterLocation();
  return location;
};

// Custom usePathname
export const usePathname = () => {
  const { pathname } = useReactRouterLocation();
  return pathname;
};
