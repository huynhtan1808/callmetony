import Link from 'next/link';
import { useState } from "react";

const NavListItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const onMouseEnter = () =>{
    if (window.innerWidth < 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const onMouseLeave = () =>{
    if (window.innerWidth < 768){
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const nestedItems = (item.children || []).map((item) => {
    return <NavListItem key={item.id} item={item} />;
  });

  return (
    <li
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="relative cursor-pointer hover:text-emerald-500" 
    key={item.id}
    >
      {!item.path.includes('http') && !item.target && (
        <Link href={item.path}>
          <a title={item.title}>{item.label}</a>
        </Link>
      )}
      {item.path.includes('http') && (
        <a href={item.path} title={item.title} target={item.target}>
          {item.label}
        </a>
      )}
      {open && nestedItems.length > 0 && (
          <div className="sub-menu absolute -ml-4">
            <ul className="mt-2 text-black dark:text-gray-200 bg-white dark:bg-gray-800 w-full md:w-64 shadow-lg p-4 rounded-lg">
              {nestedItems}
            </ul>
          </div>
          
      )}
    </li>
  );
};

export default NavListItem;
