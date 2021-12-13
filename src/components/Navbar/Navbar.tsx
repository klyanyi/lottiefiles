import * as React from "react";

import Icon from "../Icon";

const NavLink = (props: { name: string; to: string; icon?: string; isActive?: boolean; onClick: any }) => {
	const { name, to, icon, isActive, onClick } = props;

	const [classnames, setClassnames] = React.useState("font-normal flex");

	React.useEffect(() => {
		if (isActive) {
			setClassnames("font-bold lt-tabs-active");
		} else {
			setClassnames("font-normal");
		}
	}, [isActive]);

	return (
		<li key={name} className={`px-2 flex items-center ${classnames}`} onClick={onClick}>
			{icon ? <Icon icon={icon} fillColor="rgb(24, 200, 202)" /> : null}
			<a href={to}>{name}</a>
		</li>
	);
};

const Navbar = (props: {
	brand: { name: string; to: string };
	links: Array<{ name: string; to: string; icon?: string }>;
	onSelect: Function;
}) => {
	const { brand, links, onSelect } = props;

	const [activeIndex, setActiveIndex] = React.useState(links.length - 1);

	const onClick = (index: number, to: string) => {
		setActiveIndex(index);
		onSelect(to);
	};

	const NavLinks: any = () =>
		links.map((link: { name: string; to: string; icon?: string }, idx) => (
			<NavLink
				key={idx}
				name={link.name}
				to={link.to}
				icon={link.icon}
				onClick={onClick.bind(this, idx, link.to)}
				isActive={activeIndex === idx}
			/>
		));

	return (
		<div className="flex justify-between border-b-2 border-b-gray-200 p-2">
			<ul className="flex flex-row">
				<NavLinks />
			</ul>
			<a href={brand.to}>{brand.name}</a>
		</div>
	);
};

export default Navbar;
