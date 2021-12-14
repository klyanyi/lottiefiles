import * as React from 'react';

import Icon from '../Icon';

const NavLink = function (props: {
  name: string;
  to: string;
  icon?: string;
  isActive?: boolean;
  onClick: any;
}) {
  const { name, to, icon, isActive, onClick } = props;

  return (
    <li key={name} className={isActive ? 'active' : ''} onClick={onClick}>
      {icon ? <Icon icon={icon} fillColor="rgb(24, 200, 202)" /> : null}
      <a href={to}>{name}</a>
    </li>
  );
};

const Navbar = function (props: {
  brand: { name: string; to: string };
  links: Array<{ name: string; to: string; icon?: string }>;
}) {
  const { brand, links } = props;

  const [activeIndex, setActiveIndex] = React.useState(links.length - 1);

  const onClick = (index: number, to: string) => {
    setActiveIndex(index);
    window.postMessage('nativeLog', 'Called from tssw');
  };

  const NavLinks: any = () =>
    links.map((link: { name: string; to: string; icon?: string }, idx) => (
      <NavLink
        key={idx}
        name={link.name}
        to={link.to}
        icon={link.icon}
        onClick={() => onClick(idx, link.to)}
        isActive={activeIndex === idx}
      />
    ));

  return (
    <div className="flex justify-between border-b-2 border-b-gray-200 p-2">
      <ul className="lf-tabs">
        <NavLinks />
      </ul>
      <a href={brand.to}>{brand.name}</a>
    </div>
  );
};

export default Navbar;
