import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavbar(breakpoint) {
  const [visible, setVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setVisible(false);
  }, [location]);

  useEffect(() => {
    window.onresize = () => {
      const expanded = matchMedia(`(min-width: ${breakpoint ?? '992px'})`).matches;
      if (expanded && visible) {
        setVisible(false);
      }
    };

    return () => { window.onresize = () => {}; };
  });

  return [visible, setVisible];
}
