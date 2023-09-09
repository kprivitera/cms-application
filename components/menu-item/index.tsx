const menuItem = ({ active, children, ...restOfProps }) => {
  return (
    <a {...restOfProps}>
      {active && '> '}
      {children}
    </a>
  );
};

export default menuItem;
