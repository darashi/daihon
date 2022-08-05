import { MdMenu, MdOutlineMoreHoriz } from "react-icons/md";

export const Header = () => {
  return (
    <header className="navbar bg-primary text-primary-content">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <MdMenu size="2em" />
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daihon</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <MdOutlineMoreHoriz size="2em" />
        </button>
      </div>
    </header>
  );
};
